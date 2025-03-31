import type { APIRoute } from 'astro';

interface FormData {
  name: string;
  email: string;
  phone: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse the form data from the request body
    const data = await request.json() as FormData;
    const { name, email, phone } = data;

    if (!name || !email || !phone) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Toate câmpurile sunt obligatorii',
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
    console.log('Form data received:', { name, email, phone });

    // 1. Send email using Resend
    const resendSuccess = await sendResendEmail(name, email, phone);

    // 2. Send Slack notification
    const slackSuccess = await sendSlackNotification(name, email, phone);
    
    // Return appropriate response
    if (resendSuccess && slackSuccess) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Voucher trimis cu succes! Verifică-ți email-ul.'
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
    console.error('Error processing request:', error);
    
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
 * Send email using Resend
 */
async function sendResendEmail(name: string, email: string, phone: string): Promise<boolean> {
  try {
    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not found in environment variables');
      return false;
    }

    // Generate a random voucher code
    const voucherCode = `SIA-${phone.substring(phone.length-4)}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Create plain text version of the email
    const textContent = `
VOUCHERUL TAU DE 50% REDUCERE - SIA SKIN CENTER
------------------------------------------------

Buna, ${name}!

Iti multumim pentru interesul aratat fata de serviciile noastre de epilare definitiva.

------------------------------------------------
VOUCHER 50% REDUCERE
------------------------------------------------

Pentru prima sedinta de epilare definitiva Full Body

COD VOUCHER: ${voucherCode}

IMPORTANT: Voucherul nu este inca activat!
Suna la numarul de telefon 0770 889 907 pentru activare si programare.

Acest voucher este valabil pentru 30 de zile si poate fi utilizat pentru o sedinta 
de epilare definitiva Full Body.

------------------------------------------------
CONTACT
------------------------------------------------

Pentru programari sau intrebari:
Telefon: 0770 889 907
Adresa: Strada Antiaeriana 67C, Bucuresti

------------------------------------------------

© 2025 SIA Skin Center. Toate drepturile rezervate.

Acest email a fost trimis catre ${email} deoarece ai solicitat un voucher de reducere.
`;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'SIA Skin Center <noreply@transactional.siaskincenter.ro>',
        to: [email],
        bcc: 'siaskincenter@gmail.com',
        subject: 'Voucherul tau de 50% reducere - SIA Skin Center',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Voucherul tau de 50% reducere - SIA Skin Center</title>
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
                }
                .footer { 
                  text-align: center; 
                  margin-top: 20px; 
                  font-size: 12px; 
                  color: #666; 
                  padding: 10px;
                }
                .voucher { 
                  background-color: #fff; 
                  border: 3px dashed #ac1ea0; 
                  padding: 20px; 
                  margin: 20px 0; 
                  text-align: center;
                  border-radius: 8px;
                }
                .voucher-code {
                  font-size: 28px;
                  font-weight: bold;
                  color: #2e7d32;
                  margin: 10px 0;
                  padding: 10px;
                  background-color: #f0fff0;
                  border-radius: 4px;
                  border: 1px solid #2e7d32;
                  letter-spacing: 1px;
                }
                .activation-warning {
                  color: #d32f2f;
                  font-weight: bold;
                  font-size: 16px;
                  margin: 15px 0;
                  padding: 10px;
                  border: 1px solid #d32f2f;
                  border-radius: 4px;
                  background-color: #fff8f8;
                }
                .phone-number {
                  font-size: 24px;
                  font-weight: bold;
                  color: #0078D4;
                  margin: 15px 0;
                  padding: 10px;
                  text-align: center;
                }
                .phone-button {
                  display: inline-block;
                  background-color: #32a852;
                  color: white;
                  font-size: 18px;
                  font-weight: bold;
                  padding: 12px 25px;
                  text-decoration: none;
                  border-radius: 8px;
                  margin: 10px 0;
                }
                .contact {
                  margin-top: 30px;
                  padding-top: 20px;
                  border-top: 1px solid #ddd;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Voucherul tau de 50% reducere</h1>
                </div>
                <div class="content">
                  <p>Buna, ${name}!</p>
                  <p>Iti multumim pentru interesul aratat fata de serviciile noastre de epilare definitiva.</p>
                  
                  <div class="voucher">
                    <h2>VOUCHER 50% REDUCERE</h2>
                    <p>Pentru prima sedinta de epilare definitiva Full Body</p>
                    <div class="voucher-code">${voucherCode}</div>
                    
                    <div class="activation-warning">
                      IMPORTANT: Voucherul nu este inca activat! <br>
                      Suna la numarul de mai jos pentru activare si programare.
                    </div>
                    
                    <a href="tel:0770889907" class="phone-button">📞 0770 889 907</a>
                    <p>Suna acum pentru a-ti rezerva locul!</p>
                  </div>
                  
                  <p>Acest voucher este valabil pentru 30 de zile si poate fi utilizat pentru o sedinta de epilare definitiva Full Body.</p>
                  
                  <div class="contact">
                    <p><strong>Pentru programari sau intrebari:</strong></p>
                    <p>📞 0770 889 907</p>
                    <p>📍 Strada Antiaeriana 67C, Bucuresti</p>
                  </div>
                </div>
                <div class="footer">
                  <p>© 2025 SIA Skin Center. Toate drepturile rezervate.</p>
                  <p>Acest email a fost trimis catre ${email} deoarece ai solicitat un voucher de reducere.</p>
                </div>
              </div>
            </body>
          </html>
        `,
        text: textContent
      })
    });

    const result = await response.json();
    console.log('Resend email result:', result);
    
    return response.status >= 200 && response.status < 300;
  } catch (error) {
    console.error('Error sending email via Resend:', error);
    return false;
  }
}

/**
 * Send Slack notification
 */
async function sendSlackNotification(name: string, email: string, phone: string): Promise<boolean> {
  try {
    const SLACK_WEBHOOK_URL = import.meta.env.SLACK_WEBHOOK_URL;
    
    if (!SLACK_WEBHOOK_URL) {
      console.error('SLACK_WEBHOOK_URL not found in environment variables');
      // Return true to avoid failing the entire process if Slack integration isn't set up
      return true;
    }

    try {
      const response = await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: `🎫 SIA Skin Center - *Nou voucher solicitat!* \n*Nume:* ${name} \n*Email:* ${email} \n*Telefon:* ${phone} \n*Data:* ${new Date().toLocaleString('ro-RO')}`,
        })
      });
  
      return response.status >= 200 && response.status < 300;
    } catch (slackError) {
      console.error('Error sending Slack notification:', slackError);
      // Return true to avoid failing the entire process due to Slack issues
      return true;
    }
  } catch (error) {
    console.error('Error in Slack notification function:', error);
    // Return true to allow the process to continue even if Slack fails
    return true;
  }
} 