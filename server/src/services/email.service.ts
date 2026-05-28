import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export const sendResetEmail = async (
  email: string,
  resetLink: string
) => {

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset Your Password",
    html: `
      <h2>Password Reset</h2>

      <p>
        Click below to reset your password:
      </p>

      <a href="${resetLink}">
        Reset Password
      </a>
    `,
  });

};