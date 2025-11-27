const nodemailer = require("nodemailer");
const { acceptedEmail, deniedEmail } = require("./emailTemplates");

const FROM_EMAIL = "noreply@shoreroleplay.xyz";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false, // true if you use port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

/**
 * status: "accepted" | "denied"
 * data: { email, username }
 */
async function sendApplicationEmail(status, data) {
  const { email, username } = data;

  const isAccepted = status === "accepted";

  const html = isAccepted
    ? acceptedEmail({ username })
    : deniedEmail({ username });

  const subject = isAccepted
    ? "Shore Roleplay Application Approved"
    : "Shore Roleplay Application Result";

  await transporter.sendMail({
    from: `${"Shore Roleplay"} <${FROM_EMAIL}>`,
    to: email,
    subject,
    html
  });
}

module.exports = { sendApplicationEmail };
