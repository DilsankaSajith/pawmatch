// ─── Shared email layout helpers ─────────────────────────────────────────────
// Brand colors (from globals.css brand palette)
const BRAND = {
  50: '#f0f4fa',
  100: '#e1e9f6',
  200: '#c3d3ed',
  300: '#a5bde4',
  600: '#4b76c9',
  700: '#3659b1',
  800: '#284189',
  900: '#1b2a61',
  950: '#111a3e',
} as const;

const pawLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${BRAND[600]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/></svg>`;

function emailShell(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=EB+Garamond:wght@600;700&display=swap" rel="stylesheet" />
  <!--[if mso]><style>*{font-family:Arial,sans-serif!important}</style><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f4f6fb;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6fb;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(17,26,62,0.08);">

          <!-- Header with gradient -->
          <tr>
            <td style="background:linear-gradient(135deg, ${BRAND[700]} 0%, ${BRAND[800]} 50%, ${BRAND[950]} 100%);padding:36px 40px 32px;text-align:center;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:16px;">
                    <div style="display:inline-block;background-color:rgba(255,255,255,0.15);border-radius:14px;padding:10px 12px;line-height:0;">
                      ${pawLogoSvg.replace(BRAND[600], '#ffffff')}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <span style="font-family:'EB Garamond',Georgia,serif;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:0.3px;">Paw</span><span style="font-family:'EB Garamond',Georgia,serif;font-size:26px;font-weight:700;color:${BRAND[200]};letter-spacing:0.3px;">Match</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body content -->
          <tr>
            <td style="padding:40px 40px 36px;">
              ${content}
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background:linear-gradient(90deg, transparent 0%, ${BRAND[200]} 50%, transparent 100%);"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 40px 32px;text-align:center;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <span style="font-family:'EB Garamond',Georgia,serif;font-size:16px;font-weight:600;color:${BRAND[900]};">Paw</span><span style="font-family:'EB Garamond',Georgia,serif;font-size:16px;font-weight:600;color:${BRAND[600]};">Match</span>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:12px;color:#94a3b8;line-height:18px;">
                      AI-powered stray animal rescue &amp; adoption for Sri Lanka
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top:12px;">
                    <p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:11px;color:#cbd5e1;line-height:16px;">
                      Made with ❤️ for Sri Lanka's animals
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Email Templates ─────────────────────────────────────────────────────────

export function applicationAcceptedEmail(petName: string) {
  return {
    subject: `Great news! Your application for ${petName} was accepted 🎉`,
    html: emailShell(`
              <!-- Celebration icon -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <div style="display:inline-block;width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);text-align:center;line-height:72px;font-size:32px;">
                      🎉
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Heading -->
              <h1 style="margin:0 0 8px;font-family:'EB Garamond',Georgia,serif;font-size:28px;font-weight:700;color:${BRAND[950]};text-align:center;line-height:1.3;">
                Wonderful News!
              </h1>
              <p style="margin:0 0 28px;font-family:Inter,Arial,sans-serif;font-size:15px;color:#64748b;text-align:center;line-height:1.6;">
                Your adoption journey is about to begin.
              </p>

              <!-- Content card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg, ${BRAND[50]} 0%, #ffffff 100%);border-radius:12px;border:1px solid ${BRAND[100]};">
                <tr>
                  <td style="padding:28px 24px;">
                    <p style="margin:0 0 16px;font-family:Inter,Arial,sans-serif;font-size:15px;color:${BRAND[950]};line-height:1.7;">
                      Hi there 👋
                    </p>
                    <p style="margin:0 0 16px;font-family:Inter,Arial,sans-serif;font-size:15px;color:#334155;line-height:1.7;">
                      We're thrilled to let you know that your application to adopt
                      <strong style="color:${BRAND[700]};font-weight:600;">${petName}</strong>
                      has been <span style="display:inline-block;background-color:#dcfce7;color:#166534;font-weight:600;padding:2px 10px;border-radius:20px;font-size:13px;">Accepted ✓</span>
                    </p>
                    <p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:15px;color:#334155;line-height:1.7;">
                      The shelter team will be reaching out to you shortly with the next steps to welcome <strong style="color:${BRAND[700]};">${petName}</strong> into your family. Get ready for a lifetime of unconditional love! 🐾
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Warm closing -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-top:28px;">
                    <p style="margin:0 0 4px;font-family:Inter,Arial,sans-serif;font-size:14px;color:#64748b;line-height:1.6;">
                      With warmth and wagging tails,
                    </p>
                    <p style="margin:0;font-family:'EB Garamond',Georgia,serif;font-size:17px;font-weight:600;color:${BRAND[700]};">
                      The PawMatch Team
                    </p>
                  </td>
                </tr>
              </table>
    `),
  };
}

export function applicationRejectedEmail(petName: string) {
  return {
    subject: `Update on your application for ${petName}`,
    html: emailShell(`
              <!-- Empathy icon -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <div style="display:inline-block;width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg, ${BRAND[50]} 0%, ${BRAND[100]} 100%);text-align:center;line-height:72px;font-size:32px;">
                      💙
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Heading -->
              <h1 style="margin:0 0 8px;font-family:'EB Garamond',Georgia,serif;font-size:28px;font-weight:700;color:${BRAND[950]};text-align:center;line-height:1.3;">
                An Update for You
              </h1>
              <p style="margin:0 0 28px;font-family:Inter,Arial,sans-serif;font-size:15px;color:#64748b;text-align:center;line-height:1.6;">
                We appreciate your compassion for animals.
              </p>

              <!-- Content card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg, ${BRAND[50]} 0%, #ffffff 100%);border-radius:12px;border:1px solid ${BRAND[100]};">
                <tr>
                  <td style="padding:28px 24px;">
                    <p style="margin:0 0 16px;font-family:Inter,Arial,sans-serif;font-size:15px;color:${BRAND[950]};line-height:1.7;">
                      Hi there 👋
                    </p>
                    <p style="margin:0 0 16px;font-family:Inter,Arial,sans-serif;font-size:15px;color:#334155;line-height:1.7;">
                      We wanted to give you an update on your application to adopt
                      <strong style="color:${BRAND[700]};font-weight:600;">${petName}</strong>.
                      Unfortunately, your application was not accepted this time.
                    </p>
                    <p style="margin:0 0 16px;font-family:Inter,Arial,sans-serif;font-size:15px;color:#334155;line-height:1.7;">
                      Please know this doesn't reflect on you as a person — sometimes the match just isn't right, and that's okay. What matters is that you care. 💛
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Encouragement card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;background:linear-gradient(135deg, #fefce8 0%, #fef9c3 100%);border-radius:12px;border:1px solid #fde68a;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:14px;color:#92400e;line-height:1.7;">
                      🌟 <strong>Don't give up!</strong> There are many wonderful pets on PawMatch still waiting for their forever home — and one of them could be your perfect companion. Keep browsing, keep hoping.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Warm closing -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-top:28px;">
                    <p style="margin:0 0 4px;font-family:Inter,Arial,sans-serif;font-size:14px;color:#64748b;line-height:1.6;">
                      With hope and paw prints,
                    </p>
                    <p style="margin:0;font-family:'EB Garamond',Georgia,serif;font-size:17px;font-weight:600;color:${BRAND[700]};">
                      The PawMatch Team
                    </p>
                  </td>
                </tr>
              </table>
    `),
  };
}

export function newApplicationEmail(petName: string, applicantEmail: string) {
  return {
    subject: `New application received for ${petName}`,
    html: emailShell(`
              <!-- Notification icon -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <div style="display:inline-block;width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg, ${BRAND[50]} 0%, ${BRAND[200]} 100%);text-align:center;line-height:72px;font-size:32px;">
                      📋
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Heading -->
              <h1 style="margin:0 0 8px;font-family:'EB Garamond',Georgia,serif;font-size:28px;font-weight:700;color:${BRAND[950]};text-align:center;line-height:1.3;">
                New Adoption Application
              </h1>
              <p style="margin:0 0 28px;font-family:Inter,Arial,sans-serif;font-size:15px;color:#64748b;text-align:center;line-height:1.6;">
                Someone wants to give a pet their forever home!
              </p>

              <!-- Content card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg, ${BRAND[50]} 0%, #ffffff 100%);border-radius:12px;border:1px solid ${BRAND[100]};">
                <tr>
                  <td style="padding:28px 24px;">
                    <p style="margin:0 0 16px;font-family:Inter,Arial,sans-serif;font-size:15px;color:${BRAND[950]};line-height:1.7;">
                      Hi 👋
                    </p>
                    <p style="margin:0 0 20px;font-family:Inter,Arial,sans-serif;font-size:15px;color:#334155;line-height:1.7;">
                      You've received a new adoption application! Here are the details:
                    </p>

                    <!-- Details mini-table -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:10px;border:1px solid ${BRAND[100]};">
                      <tr>
                        <td style="padding:16px 20px;border-bottom:1px solid ${BRAND[100]};">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="font-family:Inter,Arial,sans-serif;font-size:12px;font-weight:500;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Pet Name</td>
                            </tr>
                            <tr>
                              <td style="padding-top:4px;font-family:Inter,Arial,sans-serif;font-size:16px;font-weight:600;color:${BRAND[700]};">🐾 ${petName}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:16px 20px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="font-family:Inter,Arial,sans-serif;font-size:12px;font-weight:500;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Applicant Email</td>
                            </tr>
                            <tr>
                              <td style="padding-top:4px;font-family:Inter,Arial,sans-serif;font-size:16px;font-weight:600;color:${BRAND[950]};">✉️ ${applicantEmail}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Action prompt -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;background:linear-gradient(135deg, ${BRAND[50]} 0%, ${BRAND[100]} 100%);border-radius:12px;border:1px solid ${BRAND[200]};">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:14px;color:${BRAND[800]};line-height:1.7;">
                      ⏰ <strong>Action needed:</strong> Log in to PawMatch to review this application and help connect this pet with a loving home.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Warm closing -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-top:28px;">
                    <p style="margin:0 0 4px;font-family:Inter,Arial,sans-serif;font-size:14px;color:#64748b;line-height:1.6;">
                      Every application is a chance to change a life,
                    </p>
                    <p style="margin:0;font-family:'EB Garamond',Georgia,serif;font-size:17px;font-weight:600;color:${BRAND[700]};">
                      The PawMatch Team
                    </p>
                  </td>
                </tr>
              </table>
    `),
  };
}
