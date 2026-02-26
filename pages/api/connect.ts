import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function buildEmailHtml(
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  comments?: string
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Connection Request</title>
</head>
<body style="margin:0;padding:0;background-color:#edf2f4;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#edf2f4;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Header -->
          <tr>
            <td style="background-color:#2b2b2b;padding:32px 40px;border-radius:8px 8px 0 0;">
              <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#d90429;">
                Real Impact Church
              </p>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">
                New Connection Request
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#f7fcff;padding:32px 40px;">
              <p style="margin:0 0 24px 0;font-size:15px;color:#4a4a4a;line-height:1.6;">
                Someone submitted the connect form on the website. Their contact info is below — hit <strong>Reply</strong> to reach them directly.
              </p>

              <!-- Contact details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #dde6ea;border-radius:6px;overflow:hidden;">
                <tr>
                  <td style="padding:14px 20px;background-color:#edf2f4;border-bottom:1px solid #dde6ea;">
                    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#888;">Name</p>
                    <p style="margin:4px 0 0 0;font-size:16px;color:#2b2b2b;font-weight:600;">${firstName} ${lastName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;background-color:#f7fcff;border-bottom:1px solid #dde6ea;">
                    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#888;">Email</p>
                    <p style="margin:4px 0 0 0;font-size:16px;">
                      <a href="mailto:${email}" style="color:#d90429;text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;background-color:#edf2f4;${comments ? 'border-bottom:1px solid #dde6ea;' : ''}">
                    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#888;">Phone</p>
                    <p style="margin:4px 0 0 0;font-size:16px;">
                      <a href="tel:${phoneNumber}" style="color:#d90429;text-decoration:none;">${phoneNumber}</a>
                    </p>
                  </td>
                </tr>
                ${comments ? `
                <tr>
                  <td style="padding:14px 20px;background-color:#f7fcff;">
                    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#888;">Comments</p>
                    <p style="margin:4px 0 0 0;font-size:15px;color:#2b2b2b;line-height:1.6;white-space:pre-wrap;">${comments}</p>
                  </td>
                </tr>` : ''}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#2b2b2b;padding:20px 40px;border-radius:0 0 8px 8px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#888;">
                Sent from the Real Impact Church website &mdash; realimpactchurch.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { firstName, lastName, email, phoneNumber, comments } = req.body ?? {};

  if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !phoneNumber?.trim()) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required: firstName, lastName, email, phoneNumber',
    });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(500).json({ success: false, error: 'Email service is not configured' });
  }

  const name = `${firstName.trim()} ${lastName.trim()}`;

  try {
    const { error } = await resend.emails.send({
      from: 'Connect Form <noreply@contact.realimpactchurch.com>',
      to: 'RealImpactChurch@gmail.com',
      replyTo: `${name} <${email.trim()}>`,
      subject: `New Connection Request from ${name}`,
      html: buildEmailHtml(firstName.trim(), lastName.trim(), email.trim(), phoneNumber.trim(), comments?.trim()),
      text: `New connection request from the Real Impact Church website.\n\nName: ${name}\nEmail: ${email.trim()}\nPhone: ${phoneNumber.trim()}${comments?.trim() ? `\n\nComments:\n${comments.trim()}` : ''}`,
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(500).json({ success: false, error: 'Failed to send email' });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
}
