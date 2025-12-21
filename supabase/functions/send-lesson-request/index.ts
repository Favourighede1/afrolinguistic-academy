import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60000;

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }
  
  if (record.count >= RATE_LIMIT) {
    return true;
  }
  
  record.count++;
  return false;
}

function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

interface LessonRequest {
  name: string;
  email: string;
  language: string;
  topic: string;
  details?: string;
  honeypot?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: LessonRequest = await req.json();
    const { name, email, language, topic, details, honeypot } = body;

    // Honeypot check
    if (honeypot) {
      console.log("Honeypot triggered, rejecting submission");
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate required fields
    if (!name || !email || !topic) {
      return new Response(
        JSON.stringify({ error: "Name, email, and topic are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email
    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Rate limiting
    if (isRateLimited(email)) {
      console.log(`Rate limit exceeded for: ${email}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize inputs
    const safeName = sanitizeInput(name).substring(0, 100);
    const safeEmail = sanitizeInput(email).substring(0, 255);
    const safeLanguage = sanitizeInput(language || "Not specified").substring(0, 50);
    const safeTopic = sanitizeInput(topic).substring(0, 200);
    const safeDetails = sanitizeInput(details || "").substring(0, 2000);

    console.log(`Sending lesson request email from: ${safeEmail}`);

    const { error } = await resend.emails.send({
      from: "Afrolinguistic Academy <onboarding@resend.dev>",
      to: ["afrolinguisticacademy@gmail.com"],
      reply_to: safeEmail,
      subject: `[Afrolinguistic Lesson Request] ${safeTopic}`,
      html: `
        <h2>New Lesson Topic Request</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Language:</strong> ${safeLanguage}</p>
        <p><strong>Topic:</strong> ${safeTopic}</p>
        ${safeDetails ? `<h3>Additional Details:</h3><p>${safeDetails.replace(/\n/g, "<br>")}</p>` : ""}
        <hr>
        <p><em>Sent from Afrolinguistic Academy lesson request form</em></p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Lesson request email sent successfully");
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-lesson-request function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
