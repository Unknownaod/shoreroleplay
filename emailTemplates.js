const BRAND_NAME = "Shore Roleplay";
const BRAND_PRIMARY = "#1f75ff"; // your brand blue
const BRAND_MUTED = "#6c757d";

function baseTemplate({ title, subtitle, bodyHtml, badgeColor, badgeText }) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background:#f5f7fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f5f7fb;padding:40px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 25px rgba(15,23,42,0.12);">
            <tr>
              <td align="center" style="padding:28px 24px 8px 24px;background:#ffffff;">
                <!-- Logo -->
                <div style="width:72px;height:72px;border-radius:999px;background:${BRAND_PRIMARY};display:flex;align-items:center;justify-content:center;margin-bottom:14px;">
                  <span style="font-size:34px;font-weight:800;color:#ffffff;">SR</span>
                </div>

                <!-- Title -->
                <h1 style="margin:0;font-size:22px;letter-spacing:3px;text-transform:uppercase;color:${BRAND_PRIMARY};">
                  ${title}
                </h1>

                <!-- Badge -->
                ${
                  badgeText
                    ? `<div style="margin-top:10px;padding:4px 11px;border-radius:999px;background:${badgeColor};color:#fff;font-size:11px;display:inline-block;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">
                         ${badgeText}
                       </div>`
                    : ""
                }

                <!-- Subtitle -->
                <p style="margin:22px 0 0 0;font-size:14px;color:${BRAND_MUTED};max-width:480px;line-height:1.6;">
                  ${subtitle}
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:22px 32px 30px 32px;font-size:14px;color:#1f2933;line-height:1.6;">
                ${bodyHtml}
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:18px 24px 24px 24px;background:#f5f7fb;border-top:1px solid #e2e6f0;font-size:12px;color:${BRAND_MUTED};">
                <div style="margin-bottom:6px;">
                  Sent from <strong>${BRAND_NAME}</strong>
                </div>
                <div style="opacity:0.75;">
                  If you did not expect this email, you can safely ignore it.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}

// Accepted template
function acceptedEmail({ username }) {
  const title = "APPLICATION APPROVED";
  return baseTemplate({
    title,
    subtitle: `This is to notify you that your application to ${BRAND_NAME} has been reviewed and approved.`,
    badgeColor: "#22c55e",
    badgeText: "Approved",
    bodyHtml: `
      <p style="margin:0 0 12px 0;">
        Hi${username ? " " + username : ""},
      </p>
      <p style="margin:0 0 12px 0;">
        Congratulations – your application to <strong>${BRAND_NAME}</strong> has been <strong>accepted</strong>. 
        You are now eligible to join the server and begin onboarding.
      </p>
      <p style="margin:0 0 18px 0;">
        To get started, join our Discord and follow the directions in the onboarding channels.
      </p>

      <p style="margin:0 0 28px 0;" align="center">
        <a href="https://discord.gg/YOURINVITE" 
           style="display:inline-block;padding:11px 26px;border-radius:999px;background:${BRAND_PRIMARY};color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;">
          Join Shore Roleplay Discord
        </a>
      </p>

      <p style="margin:0 0 4px 0;">
        If you have any questions, simply reply to this email and a staff member will follow up.
      </p>
      <p style="margin:0;">
        Welcome aboard,<br/>
        <strong>Shore Roleplay Staff Team</strong>
      </p>
    `
  });
}

// Denied template
function deniedEmail({ username }) {
  const title = "APPLICATION REVIEWED";
  return baseTemplate({
    title,
    subtitle: `Your application to ${BRAND_NAME} has been reviewed.`,
    badgeColor: "#ef4444",
    badgeText: "Not Approved",
    bodyHtml: `
      <p style="margin:0 0 12px 0;">
        Hi${username ? " " + username : ""},
      </p>
      <p style="margin:0 0 12px 0;">
        Thank you for taking the time to apply to <strong>${BRAND_NAME}</strong>. 
        After careful review, we are unfortunately <strong>not able to approve</strong> your application at this time.
      </p>
      <p style="margin:0 0 12px 0;">
        This decision is not a reflection of you personally; rather, we are currently looking for applicants that better fit
        our immediate staffing needs.
      </p>
      <p style="margin:0 0 18px 0;">
        You are welcome to re-apply after <strong>30 days</strong> if you feel your experience or availability has changed.
      </p>

      <p style="margin:0 0 4px 0;">
        We appreciate your interest in ${BRAND_NAME}, and wish you the best of luck.
      </p>
      <p style="margin:0;">
        Respectfully,<br/>
        <strong>Shore Roleplay Staff Team</strong>
      </p>
    `
  });
}

module.exports = {
  acceptedEmail,
  deniedEmail
};
