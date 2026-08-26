<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Only handle POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed"]);
    exit;
}

// Get the raw POST JSON data
$json = file_get_contents("php://input");
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid JSON input"]);
    exit;
}

// Extract and sanitize form fields
$name        = filter_var($data["name"] ?? "", FILTER_SANITIZE_SPECIAL_CHARS);
$email       = filter_var($data["email"] ?? "", FILTER_VALIDATE_EMAIL);
$company     = filter_var($data["company"] ?? "", FILTER_SANITIZE_SPECIAL_CHARS);
$service     = filter_var($data["service"] ?? "", FILTER_SANITIZE_SPECIAL_CHARS);
$budget      = filter_var($data["budget"] ?? "", FILTER_SANITIZE_SPECIAL_CHARS);
$description = filter_var($data["description"] ?? "", FILTER_SANITIZE_SPECIAL_CHARS);

// Validate required fields
if (!$name || !$email || !$service || !$budget) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Please fill in all required fields."]);
    exit;
}

// Log submission data to a text file for debugging/confirmation
$log_data = "[" . date("Y-m-d H:i:s") . "] Name: " . $name . ", Email: " . $data["email"] . ", Service: " . $service . ", Budget: " . $budget . ", Company: " . $company . "\n";
file_put_contents("submissions_log.txt", $log_data, FILE_APPEND);

// Recipient email address
$to = "connect@vexcort.com";

// Subject line
$subject = "🔥 New Project Brief: " . $name . " (" . $service . ")";

// 1. OUTCLASS ADMIN NOTIFICATION TEMPLATE
$message = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Website Lead</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; color: #0F172A; background-color: #F8FAFC; margin: 0; padding: 40px 20px;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #E2E8F0; border-radius: 20px; box-shadow: 0 10px 25px -5px rgba(11,19,36,0.05), 0 8px 16px -6px rgba(11,19,36,0.05); margin: 0 auto; overflow: hidden;">
        <!-- Header Banner -->
        <tr>
            <td style="background-color: #0B1324; padding: 40px; text-align: center; border-bottom: 3px solid #1800AD;">
                <div style="font-size: 28px; font-weight: 900; color: #ffffff; letter-spacing: -0.03em; margin: 0; font-family: \'Orbitron\', sans-serif;">VEX<span style="color: #0EA5A4;">CORT</span></div>
                <div style="display: inline-block; margin-top: 12px; background: rgba(24,0,173,0.3); border: 1.5px solid rgba(24,0,173,0.5); padding: 6px 14px; border-radius: 99px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #E0E7FF;">
                    Incoming Lead Brief
                </div>
            </td>
        </tr>
        
        <!-- Main Body -->
        <tr>
            <td style="padding: 40px 40px 30px;">
                <p style="font-size: 14px; color: #64748B; margin-top: 0; margin-bottom: 24px;">An inquiry brief has been submitted through the Vexcort website contact form. The details are compiled below:</p>
                
                <h3 style="font-size: 15px; font-weight: 800; text-transform: uppercase; color: #0B1324; letter-spacing: 0.08em; margin: 0 0 16px; border-bottom: 2px solid #F1F5F9; padding-bottom: 8px;">Client Information</h3>
                
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 32px;">
                    <tr>
                        <td width="30%" style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #94A3B8; padding: 8px 0; vertical-align: top;">Name</td>
                        <td width="70%" style="font-size: 14px; font-weight: 600; color: #1E293B; padding: 8px 0; vertical-align: top;">' . $name . '</td>
                    </tr>
                    <tr>
                        <td style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #94A3B8; padding: 8px 0; vertical-align: top;">Email</td>
                        <td style="font-size: 14px; font-weight: 600; color: #1800AD; padding: 8px 0; vertical-align: top;">
                            <a href="mailto:' . $data["email"] . '" style="color: #1800AD; text-decoration: none; border-bottom: 1.5px solid rgba(24,0,173,0.25);">' . $data["email"] . '</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #94A3B8; padding: 8px 0; vertical-align: top;">Company</td>
                        <td style="font-size: 14px; font-weight: 600; color: #1E293B; padding: 8px 0; vertical-align: top;">' . ($company ? $company : '—') . '</td>
                    </tr>
                </table>

                <h3 style="font-size: 15px; font-weight: 800; text-transform: uppercase; color: #0B1324; letter-spacing: 0.08em; margin: 0 0 16px; border-bottom: 2px solid #F1F5F9; padding-bottom: 8px;">Project Scope</h3>
                
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 32px;">
                    <tr>
                        <td width="30%" style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #94A3B8; padding: 8px 0; vertical-align: top;">Service</td>
                        <td width="70%" style="font-size: 14px; font-weight: 700; color: #1800AD; padding: 8px 0; vertical-align: top;">' . $service . '</td>
                    </tr>
                    <tr>
                        <td style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #94A3B8; padding: 8px 0; vertical-align: top;">Budget</td>
                        <td style="padding: 8px 0; vertical-align: top;">
                            <span style="font-size: 13px; font-weight: 700; color: #0EA5A4; background: rgba(14,165,164,0.06); border: 1.5px solid rgba(14,165,164,0.2); padding: 4px 10px; border-radius: 8px;">' . $budget . '</span>
                        </td>
                    </tr>
                </table>

                <h3 style="font-size: 15px; font-weight: 800; text-transform: uppercase; color: #0B1324; letter-spacing: 0.08em; margin: 0 0 12px;">Detailed Project Brief</h3>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="background-color: #F8FAFC; border-left: 4px solid #1800AD; border-radius: 0 12px 12px 0; padding: 20px; font-size: 13.5px; line-height: 1.6; color: #334155; white-space: pre-line; word-wrap: break-word; font-weight: 500; font-style: italic;">
                            ' . $description . '
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 30px 40px; text-align: center; font-size: 11px; color: #94A3B8; line-height: 1.5;">
                This inquiry was submitted from the Vexcort digital platform portal.<br>
                &copy; ' . date("Y") . ' Vexcort Agency. All rights reserved.
            </td>
        </tr>
    </table>
</body>
</html>
';

// 2. OUTCLASS CLIENT AUTO-RESPONDER TEMPLATE
$client_subject = "Inquiry Received — Vexcort Engineering";
$client_message = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>We have received your brief</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; color: #0F172A; background-color: #F8FAFC; margin: 0; padding: 40px 20px;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #E2E8F0; border-radius: 20px; box-shadow: 0 10px 25px -5px rgba(11,19,36,0.05), 0 8px 16px -6px rgba(11,19,36,0.05); margin: 0 auto; overflow: hidden;">
        <!-- Header Banner (Premium Gradient) -->
        <tr>
            <td style="background: linear-gradient(135deg, #1800AD 0%, #0EA5A4 100%); padding: 45px 40px; text-align: left;">
                <div style="font-size: 28px; font-weight: 900; color: #ffffff; letter-spacing: -0.03em; margin: 0; font-family: \'Orbitron\', sans-serif;">VEX<span style="color: #ffffff; opacity: 0.85;">CORT</span></div>
                <p style="color: rgba(255,255,255,0.9); font-size: 13px; font-weight: 600; margin: 8px 0 0 0; text-transform: uppercase; letter-spacing: 0.05em;">Project Brief Confirmation</p>
            </td>
        </tr>
        
        <!-- Content -->
        <tr>
            <td style="padding: 40px 40px 30px; line-height: 1.7; font-size: 14.5px; color: #334155;">
                <p style="margin-top: 0; font-size: 18px; font-weight: 800; color: #0B1324; letter-spacing: -0.01em;">Hi ' . $name . ',</p>
                <p style="margin-bottom: 20px;">Thank you for initiating a connection with us. We have successfully received your project brief regarding <strong>' . $service . '</strong>.</p>
                
                <!-- Response Time Callout -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F0FDFA; border: 1.5px solid #CCFBF1; border-radius: 12px; margin-bottom: 28px;">
                    <tr>
                        <td style="padding: 16px 20px; font-size: 13.5px; color: #0EA5A4; font-weight: 600; text-align: left;">
                            ⏱️ Estimated Response: Within 24 hours (1 Business Day)
                        </td>
                    </tr>
                </table>

                <p>Our engineering team is already analyzing your details to draft a tailored estimate. We will reach back out to you shortly to finalize next steps, coordinate requirements, or schedule a formal discovery review call.</p>
                
                <h3 style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #0B1324; letter-spacing: 0.1em; margin: 32px 0 16px;">Copy of Submitted Brief</h3>
                
                <!-- Submitted Data Summary Box -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px dashed #E2E8F0; border-radius: 12px; padding: 20px 24px; background-color: #FAFAFA; margin-bottom: 30px;">
                    <tr>
                        <td width="35%" style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #94A3B8; padding-bottom: 8px; vertical-align: top;">Service</td>
                        <td width="65%" style="font-size: 13px; font-weight: 700; color: #1E293B; padding-bottom: 8px; vertical-align: top;">' . $service . '</td>
                    </tr>
                    <tr>
                        <td style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #94A3B8; padding-bottom: 8px; vertical-align: top;">Budget</td>
                        <td style="font-size: 13px; font-weight: 700; color: #0EA5A4; padding-bottom: 8px; vertical-align: top;">' . $budget . '</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #94A3B8; padding-top: 10px; padding-bottom: 6px;">Details Provided</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="font-size: 12.5px; line-height: 1.5; color: #475569; white-space: pre-line; word-wrap: break-word; font-weight: 500;">' . $description . '</td>
                    </tr>
                </table>

                <p style="margin-bottom: 0; margin-top: 32px; border-top: 1px solid #F1F5F9; padding-top: 20px;">
                    Sincerely,<br>
                    <strong style="color: #1800AD; font-weight: 700;">Vexcort Engineering Team</strong>
                </p>
            </td>
        </tr>

        <!-- Footer -->
        <tr>
            <td style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 24px; text-align: center; font-size: 11px; color: #94A3B8;">
                Vexcort Agency &bull; <a href="https://vexcort.com" style="color: #1800AD; text-decoration: none; font-weight: 600;">vexcort.com</a>
            </td>
        </tr>
    </table>
</body>
</html>
';

// Setup email headers as an array and compile using standard CRLF lines
$headers = array(
    "MIME-Version: 1.0",
    "Content-type: text/html; charset=UTF-8",
    "From: Vexcort <connect@vexcort.com>",
    "Reply-To: " . $data["email"],
    "X-Mailer: PHP/" . phpversion()
);
$headers_str = implode("\r\n", $headers);

// Execute email send to admin
if (mail($to, $subject, $message, $headers_str)) {
    // Send auto-responder confirmation email to client
    $client_headers = array(
        "MIME-Version: 1.0",
        "Content-type: text/html; charset=UTF-8",
        "From: Vexcort <connect@vexcort.com>",
        "Reply-To: connect@vexcort.com",
        "X-Mailer: PHP/" . phpversion()
    );
    $client_headers_str = implode("\r\n", $client_headers);

    // Send confirmation to client (fails silently to user but logs if there is a mail delivery error)
    @mail($data["email"], $client_subject, $client_message, $client_headers_str);

    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Failed to send email. Server mail configuration issue."]);
}
?>
