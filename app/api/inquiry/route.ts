import { NextResponse } from "next/server";

interface InquiryPayload {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  location: string;
  approxArea?: string;
  budgetRange?: string;
  timeline?: string;
  brief: string;
  honeypot?: string; // Spam protection
}

// In-memory rate limiting / duplicate protection for recent submissions
const recentSubmissions = new Map<string, number>();

export async function POST(req: Request) {
  try {
    const body: InquiryPayload = await req.json();

    // 1. Spam detection via hidden honeypot
    if (body.honeypot && body.honeypot.trim().length > 0) {
      // Quietly reject bot submissions
      return NextResponse.json({ success: true, message: "Inquiry processed." });
    }

    // 2. Server-side validation
    const { name, email, projectType, location, brief } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide a valid full name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!projectType || projectType.trim().length === 0) {
      return NextResponse.json(
        { error: "Please select a project type." },
        { status: 400 }
      );
    }

    if (!location || location.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide the project location or city." },
        { status: 400 }
      );
    }

    if (!brief || brief.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a brief description of your project (min 10 characters)." },
        { status: 400 }
      );
    }

    // 3. Duplicate submission prevention (within 60 seconds)
    const normalizedKey = `${email.trim().toLowerCase()}_${projectType}_${brief.slice(0, 30)}`;
    const now = Date.now();
    const lastSubTime = recentSubmissions.get(normalizedKey);
    if (lastSubTime && now - lastSubTime < 60000) {
      return NextResponse.json(
        { error: "A similar project inquiry was just submitted. Our atelier team will contact you shortly." },
        { status: 429 }
      );
    }
    recentSubmissions.set(normalizedKey, now);

    // Clean up older keys
    if (recentSubmissions.size > 200) {
      for (const [key, timestamp] of recentSubmissions.entries()) {
        if (now - timestamp > 3600000) recentSubmissions.delete(key);
      }
    }

    // 4. Generate unique inquiry ID
    const inquiryId = `SD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // 5. In production, connect to studio email dispatcher or database
    // (Checked against process.env.STUDIO_INQUIRY_EMAIL if configured)
    console.log(`[Siddhatva Inquiry Received] ID: ${inquiryId}`, {
      name,
      email,
      phone: body.phone,
      projectType,
      location,
      budgetRange: body.budgetRange,
      timeline: body.timeline,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      inquiryId,
      message: "Your project inquiry has been received. Our architectural directors will review and reach out within 2 business days.",
    });
  } catch (err: any) {
    console.error("[Inquiry API Error]", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your inquiry. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
