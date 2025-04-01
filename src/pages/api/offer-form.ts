import type { APIRoute } from 'astro';

interface FormData {
  name: string;
  email: string;
  phone: string;
  offerType: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: FormData = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Toate câmpurile sunt obligatorii. Te rugăm să completezi formularul corect.' 
        }),
        { status: 400 }
      );
    }

    console.log('Received offer form submission:', data);

    let emailSuccess = false;
    let slackSuccess = false;

    // Send email notification
    try {
      emailSuccess = await sendOfferEmail(data);
      console.log('Email notification status:', emailSuccess ? 'Success' : 'Failed');
    } catch (error) {
      console.error('Failed to send email notification:', error);
      // Continue execution even if email fails
    }

    // Send Slack notification
    try {
      slackSuccess = await sendSlackNotification(data);
      console.log('Slack notification status:', slackSuccess ? 'Success' : 'Failed');
    } catch (error) {
      console.error('Failed to send Slack notification:', error);
      // Continue execution even if Slack notification fails
    }

    // If both notifications failed, log a warning but still return success to the user
    if (!emailSuccess && !slackSuccess) {
      console.warn('Both email and Slack notifications failed for offer form submission');
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Cererea a fost trimisă cu succes!' 
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing offer form submission:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'A apărut o eroare la procesarea cererii. Te rugăm să încerci din nou.' 
      }),
      { status: 500 }
    );
  }
};

async function sendOfferEmail(data: FormData) {
  const offerTypeNames: Record<string, string> = {
    'fullbody': 'Full Body 4+1',
    'summer': 'Summer 4+1',
    // Add more offer types here as needed
  };

  const offerName = offerTypeNames[data.offerType] || data.offerType;
  
  // Create email content
  const textContent = `
Cerere nouă pentru oferta: ${offerName}

Informații client:
Nume: ${data.name}
Email: ${data.email}
Telefon: ${data.phone}

Data cererii: ${new Date().toLocaleString('ro-RO')}
`;

  // HTML version of the email
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Cerere nouă - Ofertă ${offerName}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(to right, #98226f, #3b9597); color: white; padding: 15px; border-radius: 5px 5px 0 0; }
    .content { padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
    .info-label { font-weight: bold; color: #666; }
    .info-value { margin-bottom: 15px; }
    .footer { margin-top: 20px; font-size: 12px; color: #999; text-align: center; }
    .button { display: inline-block; padding: 10px 15px; background-color: #98226f; color: white; text-decoration: none; border-radius: 5px; margin-right: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">Cerere nouă - Ofertă ${offerName}</h2>
    </div>
    <div class="content">
      <p>Ai primit o cerere nouă pentru oferta <strong>${offerName}</strong>:</p>
      
      <p class="info-label">Nume:</p>
      <p class="info-value">${data.name}</p>
      
      <p class="info-label">Email:</p>
      <p class="info-value">${data.email}</p>
      
      <p class="info-label">Telefon:</p>
      <p class="info-value">${data.phone}</p>
      
      <p class="info-label">Data cererii:</p>
      <p class="info-value">${new Date().toLocaleString('ro-RO')}</p>
      
      <div style="margin-top: 30px;">
        <a href="mailto:${data.email}" class="button">Răspunde pe Email</a>
        <a href="tel:${data.phone}" class="button">Sună Clientul</a>
      </div>
    </div>
    <div class="footer">
      <p>Acest email a fost generat automat de sistemul SIA Skin Center.</p>
    </div>
  </div>
</body>
</html>
`;

  try {
    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not found in environment variables');
      return false;
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Oferte SIA <noreply@transactional.siaskincenter.ro>',
        to: ['siaskincenter@gmail.com'],
        reply_to: data.email,
        subject: `Cerere nouă - Ofertă ${offerName}`,
        html: htmlContent,
        text: textContent
      })
    });

    const result = await response.json();
    console.log('Email notification result:', result);
    
    return response.status >= 200 && response.status < 300;
  } catch (error) {
    console.error('Error sending offer email notification:', error);
    return false;
  }
}

async function sendSlackNotification(data: FormData) {
  const offerTypeNames: Record<string, string> = {
    'fullbody': 'Full Body 4+1',
    'summer': 'Summer 4+1',
    // Add more offer types here as needed
  };

  const offerName = offerTypeNames[data.offerType] || data.offerType;
  
  try {
    const SLACK_WEBHOOK_URL = import.meta.env.SLACK_WEBHOOK_URL;
    
    if (!SLACK_WEBHOOK_URL) {
      console.error('SLACK_WEBHOOK_URL not found in environment variables');
      // Return true to avoid failing the entire process if Slack integration isn't set up
      return true;
    }

    try {
      // Format message for better readability in Slack
      const response = await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: `🎯 *SIA Skin Center - Cerere nouă ofertă ${offerName}*\n*Nume:* ${data.name}\n*Email:* ${data.email}\n*Telefon:* ${data.phone || 'Nu a fost furnizat'}\n*Data:* ${new Date().toLocaleString('ro-RO')}`,
        })
      });
  
      return response.status >= 200 && response.status < 300;
    } catch (slackError) {
      console.error('Error sending Slack notification for offer form:', slackError);
      // Return true to avoid failing the entire process due to Slack issues
      return true;
    }
  } catch (error) {
    console.error('Error in offer form Slack notification function:', error);
    // Return true to allow the process to continue even if Slack fails
    return true;
  }
} 