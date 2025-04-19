
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ThankYouEmailRequest {
  customerName: string;
  customerEmail: string;
  productName: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerName, customerEmail, productName }: ThankYouEmailRequest = await req.json();

    const firstName = customerName.split(' ')[0];

    const emailResponse = await resend.emails.send({
      from: "Thys Wood Design <onboarding@resend.dev>",
      to: [customerEmail],
      subject: "Thank you for your feedback!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <img src="https://res.cloudinary.com/dlsjdyti8/image/upload/v1745065446/2023-10-16_TWD_Logo_Brown_j64mn0.png" 
               alt="Thys Wood Design Logo" 
               style="max-height: 100px; margin: 20px auto; display: block;"
          />
          <h1 style="color: #4a3828; text-align: center;">Thank You, ${firstName}!</h1>
          <p style="color: #666; line-height: 1.6;">
            We greatly appreciate you taking the time to share your feedback about our ${productName}. Your input helps us create better wooden jewelry pieces that bring joy to our customers.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Your thoughts and suggestions are valuable to us, and we'll use them to continue improving our products.
          </p>
          <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f9f5f2;">
            <p style="color: #4a3828; margin: 0;">
              With gratitude,<br>
              Denzel Thys
            </p>
          </div>
        </div>
      `,
    });

    console.log("Thank you email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending thank you email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
