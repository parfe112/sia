import type { APIRoute } from 'astro';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse the form data from the request body
    const data = await request.json() as FormData;
    const { name, email, phone, message } = data;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Numele, email-ul și mesajul sunt obligatorii',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Log received data for debugging
    console.log('Contact form data received:', { name, email, phone, message });

    // 1. Send email notification
    const emailSuccess = await sendContactEmail(name, email, phone, message);

    // 2. Send Slack notification
    const slackSuccess = await sendSlackNotification(name, email, phone, message);
    
    // Return appropriate response
    if (emailSuccess && slackSuccess) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Mesajul tău a fost trimis cu succes! Te vom contacta în curând.'
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    } else {
      throw new Error('Failed to send notifications');
    }
  } catch (error) {
    console.error('Error processing contact form request:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'A apărut o eroare. Te rugăm să încerci din nou.'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};

/**
 * Send email notification about the contact form submission
 */
async function sendContactEmail(name: string, email: string, phone: string, message: string): Promise<boolean> {
  try {
    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not found in environment variables');
      return false;
    }

    // Plain text version
    const textContent = `
MESAJ NOU DE CONTACT - SIA SKIN CENTER
------------------------------------------------

INFORMATII CLIENT:
Nume: ${name}
Email: ${email}
Telefon: ${phone || 'Nu a fost furnizat'}

MESAJ:
${message}

------------------------------------------------
Acest mesaj a fost trimis prin formularul de contact de pe website-ul SIA Skin Center.
`;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Contact Form <noreply@transactional.siaskincenter.ro>',
        to: ['siaskincenter@gmail.com'],
        reply_to: email,
        subject: `Mesaj nou de contact de la ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Mesaj nou de contact - SIA Skin Center</title>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
                
                body { 
                  font-family: 'Roboto', Arial, sans-serif; 
                  line-height: 1.6; 
                  color: #333; 
                  margin: 0;
                  padding: 0;
                }
                .container { 
                  max-width: 600px; 
                  margin: 0 auto; 
                  padding: 20px; 
                }
                .header { 
                  background-color: #ac1ea0; 
                  color: white; 
                  padding: 20px; 
                  text-align: center; 
                  border-radius: 8px 8px 0 0;
                }
                .content { 
                  padding: 20px; 
                  background-color: #f9f9f9;
                  border-left: 1px solid #ddd;
                  border-right: 1px solid #ddd;
                }
                .info-box {
                  background-color: white;
                  border: 1px solid #ddd;
                  border-radius: 8px;
                  padding: 15px;
                  margin-bottom: 20px;
                }
                .message-box {
                  background-color: white;
                  border: 1px solid #ddd;
                  border-radius: 8px;
                  padding: 15px;
                  margin-top: 20px;
                }
                .footer { 
                  text-align: center; 
                  background-color: #f0f0f0;
                  padding: 10px 20px;
                  border-radius: 0 0 8px 8px;
                  border: 1px solid #ddd;
                  border-top: none;
                  font-size: 12px;
                  color: #666;
                }
                .label {
                  color: #666;
                  font-size: 14px;
                  margin-bottom: 5px;
                }
                .value {
                  font-weight: bold;
                  margin-bottom: 15px;
                }
                .action-button {
                  display: inline-block;
                  background-color: #ac1ea0;
                  color: white;
                  padding: 10px 20px;
                  text-decoration: none;
                  border-radius: 4px;
                  margin-top: 15px;
                  font-weight: bold;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Mesaj nou de contact</h1>
                </div>
                <div class="content">
                  <h2>Informatii client:</h2>
                  <div class="info-box">
                    <div class="label">Nume:</div>
                    <div class="value">${name}</div>
                    
                    <div class="label">Email:</div>
                    <div class="value">${email}</div>
                    
                    <div class="label">Telefon:</div>
                    <div class="value">${phone || 'Nu a fost furnizat'}</div>
                  </div>
                  
                  <h2>Mesaj:</h2>
                  <div class="message-box">
                    <p>${message.replace(/\n/g, '<br>')}</p>
                  </div>
                  
                  <div style="text-align: center; margin-top: 30px;">
                    <a href="mailto:${email}" class="action-button">Raspunde prin email</a>
                    ${phone ? `<a href="tel:${phone}" class="action-button" style="margin-left: 10px;">Suna client</a>` : ''}
                  </div>
                </div>
                <div class="footer">
                  <p>Acest mesaj a fost trimis prin formularul de contact de pe website-ul SIA Skin Center.</p>
                </div>
              </div>
            </body>
          </html>
        `,
        text: textContent
      })
    });

    const result = await response.json();
    console.log('Email notification result:', result);
    
    return response.status >= 200 && response.status < 300;
  } catch (error) {
    console.error('Error sending contact email notification:', error);
    return false;
  }
}

/**
 * Send Slack notification about contact form submission
 */
async function sendSlackNotification(name: string, email: string, phone: string, message: string): Promise<boolean> {
  try {
    const SLACK_WEBHOOK_URL = import.meta.env.SLACK_WEBHOOK_URL;
    
    if (!SLACK_WEBHOOK_URL) {
      console.error('SLACK_WEBHOOK_URL not found in environment variables');
      // Return true to avoid failing the entire process if Slack integration isn't set up
      return true;
    }

    try {
      // Format message for better readability in Slack
      const shortMessage = message.length > 100 
        ? message.substring(0, 100) + '...' 
        : message;

      const response = await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: `📬 *SIA Skin Center - Mesaj nou de contact*\n*Nume:* ${name}\n*Email:* ${email}\n*Telefon:* ${phone || 'Nu a fost furnizat'}\n*Mesaj:* ${shortMessage}\n*Data:* ${new Date().toLocaleString('ro-RO')}`,
        })
      });
  
      return response.status >= 200 && response.status < 300;
    } catch (slackError) {
      console.error('Error sending Slack notification for contact form:', slackError);
      // Return true to avoid failing the entire process due to Slack issues
      return true;
    }
  } catch (error) {
    console.error('Error in contact form Slack notification function:', error);
    // Return true to allow the process to continue even if Slack fails
    return true;
  }
} 