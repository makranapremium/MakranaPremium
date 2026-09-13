import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Check API key
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing");

      return Response.json(
        {
          success: false,
          error: "Email service is not configured.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const {
      name,
      phone,
      email,
      message,
    } = body;

    // -----------------------------
    // Validation
    // -----------------------------

    if (!name || !phone || !email || !message) {
      return Response.json(
        {
          success: false,
          error: "All fields are required.",
        },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || name.trim().length < 2) {
      return Response.json(
        {
          success: false,
          error: "Please enter a valid name.",
        },
        { status: 400 }
      );
    }

    if (typeof phone !== "string" || phone.trim().length < 7) {
      return Response.json(
        {
          success: false,
          error: "Please enter a valid phone number.",
        },
        { status: 400 }
      );
    }

    if (typeof email !== "string") {
      return Response.json(
        {
          success: false,
          error: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return Response.json(
        {
          success: false,
          error: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    if (typeof message !== "string" || message.trim().length < 10) {
      return Response.json(
        {
          success: false,
          error: "Please provide more details about your enquiry.",
        },
        { status: 400 }
      );
    }

    // Prevent unnecessarily large submissions
    if (name.length > 100) {
      return Response.json(
        {
          success: false,
          error: "Name is too long.",
        },
        { status: 400 }
      );
    }

    if (phone.length > 30) {
      return Response.json(
        {
          success: false,
          error: "Phone number is too long.",
        },
        { status: 400 }
      );
    }

    if (email.length > 150) {
      return Response.json(
        {
          success: false,
          error: "Email address is too long.",
        },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return Response.json(
        {
          success: false,
          error: "Message is too long.",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // Clean values
    // -----------------------------

    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanMessage = message.trim();

    // -----------------------------
    // Send email using Resend
    // -----------------------------

    const { data, error } = await resend.emails.send({
      /*
       * For testing:
       *
       * onboarding@resend.dev
       *
       * After verifying your domain in Resend,
       * change this to something like:
       *
       * enquiry@yourdomain.com
       */
      from: "Marble Website <enquiry@makranapremium.com>",

      // Your business email
      to: ["abdulriyaz1009+resend@gmail.com"],

      // When you click Reply in Gmail,
      // the reply will go to the customer's email.
      replyTo: cleanEmail,

      subject: `New Marble Enquiry from ${cleanName}`,

      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>New Marble Enquiry</title>
          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
              font-family: Arial, Helvetica, sans-serif;
              color: #1f2937;
            "
          >
            <div
              style="
                max-width: 650px;
                margin: 40px auto;
                background-color: #ffffff;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0,0,0,0.08);
              "
            >

              <!-- Header -->
              <div
                style="
                  background: linear-gradient(
                    135deg,
                    #111827,
                    #1f2937
                  );
                  padding: 32px;
                  text-align: center;
                "
              >
                <h1
                  style="
                    margin: 0;
                    color: #ffffff;
                    font-size: 28px;
                    font-weight: 700;
                  "
                >
                  New Marble Enquiry
                </h1>

                <p
                  style="
                    margin: 10px 0 0;
                    color: #fbbf24;
                    font-size: 14px;
                  "
                >
                  Website Contact Form
                </p>
              </div>

              <!-- Content -->
              <div style="padding: 32px;">

                <p
                  style="
                    margin: 0 0 24px;
                    font-size: 16px;
                    line-height: 1.6;
                    color: #4b5563;
                  "
                >
                  You have received a new enquiry from your marble
                  showroom website.
                </p>

                <!-- Customer Information -->
                <div
                  style="
                    border: 1px solid #e5e7eb;
                    border-radius: 12px;
                    overflow: hidden;
                    margin-bottom: 24px;
                  "
                >

                  <div
                    style="
                      padding: 14px 18px;
                      background-color: #fffbeb;
                      border-bottom: 1px solid #e5e7eb;
                    "
                  >
                    <strong
                      style="
                        color: #92400e;
                        font-size: 15px;
                      "
                    >
                      Customer Details
                    </strong>
                  </div>

                  <!-- Name -->
                  <div
                    style="
                      padding: 16px 18px;
                      border-bottom: 1px solid #f3f4f6;
                    "
                  >
                    <div
                      style="
                        font-size: 12px;
                        color: #9ca3af;
                        margin-bottom: 5px;
                      "
                    >
                      FULL NAME
                    </div>

                    <div
                      style="
                        font-size: 16px;
                        color: #111827;
                        font-weight: 600;
                      "
                    >
                      ${escapeHtml(cleanName)}
                    </div>
                  </div>

                  <!-- Phone -->
                  <div
                    style="
                      padding: 16px 18px;
                      border-bottom: 1px solid #f3f4f6;
                    "
                  >
                    <div
                      style="
                        font-size: 12px;
                        color: #9ca3af;
                        margin-bottom: 5px;
                      "
                    >
                      PHONE NUMBER
                    </div>

                    <div
                      style="
                        font-size: 16px;
                        color: #111827;
                        font-weight: 600;
                      "
                    >
                      ${escapeHtml(cleanPhone)}
                    </div>
                  </div>

                  <!-- Email -->
                  <div
                    style="
                      padding: 16px 18px;
                    "
                  >
                    <div
                      style="
                        font-size: 12px;
                        color: #9ca3af;
                        margin-bottom: 5px;
                      "
                    >
                      EMAIL ADDRESS
                    </div>

                    <div
                      style="
                        font-size: 16px;
                        color: #111827;
                        font-weight: 600;
                        word-break: break-word;
                      "
                    >
                      ${escapeHtml(cleanEmail)}
                    </div>
                  </div>

                </div>

                <!-- Enquiry -->
                <div
                  style="
                    border: 1px solid #e5e7eb;
                    border-radius: 12px;
                    overflow: hidden;
                  "
                >

                  <div
                    style="
                      padding: 14px 18px;
                      background-color: #fffbeb;
                      border-bottom: 1px solid #e5e7eb;
                    "
                  >
                    <strong
                      style="
                        color: #92400e;
                        font-size: 15px;
                      "
                    >
                      Customer Enquiry
                    </strong>
                  </div>

                  <div
                    style="
                      padding: 20px 18px;
                      font-size: 15px;
                      line-height: 1.7;
                      color: #374151;
                      white-space: pre-wrap;
                    "
                  >
                    ${escapeHtml(cleanMessage)}
                  </div>

                </div>

                <!-- Reply button -->
                <div
                  style="
                    margin-top: 28px;
                    text-align: center;
                  "
                >
                  <a
                    href="mailto:${escapeHtml(cleanEmail)}"
                    style="
                      display: inline-block;
                      padding: 13px 24px;
                      background-color: #d97706;
                      color: #ffffff;
                      text-decoration: none;
                      border-radius: 8px;
                      font-size: 14px;
                      font-weight: 600;
                    "
                  >
                    Reply to Customer
                  </a>
                </div>

              </div>

              <!-- Footer -->
              <div
                style="
                  padding: 20px 32px;
                  background-color: #f9fafb;
                  border-top: 1px solid #e5e7eb;
                  text-align: center;
                "
              >
                <p
                  style="
                    margin: 0;
                    color: #9ca3af;
                    font-size: 12px;
                    line-height: 1.5;
                  "
                >
                  This email was sent from your website contact form.
                </p>
              </div>

            </div>
          </body>
        </html>
      `,
    });

    // -----------------------------
    // Resend error
    // -----------------------------

    if (error) {
      console.error("Resend error:", error);

      return Response.json(
        {
          success: false,
          error: "Unable to send your enquiry. Please try again.",
        },
        { status: 500 }
      );
    }

    // -----------------------------
    // Success
    // -----------------------------

    return Response.json(
      {
        success: true,
        message: "Your enquiry has been sent successfully.",
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      {
        success: false,
        error: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}

/**
 * Escape user-provided values before inserting
 * them into HTML.
 */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
