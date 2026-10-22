import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const INQUIRIES_FILE = path.join(process.cwd(), "data", "inquiries.json");

function getStoredInquiries(): any[] {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const data = fs.readFileSync(INQUIRIES_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading inquiries:", err);
  }
  return [];
}

function saveInquiries(inquiries: any[]) {
  const dir = path.dirname(INQUIRIES_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), "utf-8");
}

export async function GET() {
  const inquiries = getStoredInquiries();
  // Sort latest first
  inquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return NextResponse.json(inquiries);
}

export async function PATCH(req: Request) {
  try {
    const { id, status, notes } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing inquiry ID" }, { status: 400 });
    }

    const inquiries = getStoredInquiries();
    const index = inquiries.findIndex((item) => item.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    if (status !== undefined) inquiries[index].status = status;
    if (notes !== undefined) inquiries[index].notes = notes;
    inquiries[index].updatedAt = new Date().toISOString();

    saveInquiries(inquiries);
    return NextResponse.json({ success: true, inquiry: inquiries[index] });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to update inquiry" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing inquiry ID" }, { status: 400 });
    }

    const inquiries = getStoredInquiries();
    const filtered = inquiries.filter((item) => item.id !== id);
    saveInquiries(filtered);

    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to delete inquiry" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const inquiries = getStoredInquiries();
    const newInquiry = {
      id: body.id || `SD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      name: body.name || "Walk-in Consultation Client",
      email: body.email || "client@atelier.in",
      phone: body.phone || "+91 98000 00000",
      projectType: body.projectType || "Residential Architecture",
      location: body.location || "Mumbai, MH",
      approxArea: body.approxArea || "8,000 sq.ft",
      budgetRange: body.budgetRange || "₹3 Crore – ₹7 Crore",
      timeline: body.timeline || "Within 3–6 months",
      brief: body.brief || "Sample project inquiry generated from the admin panel.",
      status: body.status || "New",
      createdAt: new Date().toISOString(),
      notes: body.notes || "",
    };

    inquiries.unshift(newInquiry);
    saveInquiries(inquiries);
    return NextResponse.json({ success: true, inquiry: newInquiry });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to create inquiry" }, { status: 500 });
  }
}
