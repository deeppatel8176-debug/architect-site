import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONTENT_FILE = path.join(process.cwd(), "data", "site-content.json");

function getStoredContent() {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const data = fs.readFileSync(CONTENT_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading site content:", err);
  }
  return null;
}

function saveStoredContent(content: any) {
  const dir = path.dirname(CONTENT_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), "utf-8");
}

export async function GET() {
  const content = getStoredContent();
  if (!content) {
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
  return NextResponse.json(content);
}

export async function POST(req: Request) {
  try {
    const updated = await req.json();
    if (!updated || typeof updated !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    saveStoredContent(updated);
    return NextResponse.json({ success: true, message: "Site content updated successfully", content: updated });
  } catch (err: any) {
    console.error("Error saving site content:", err);
    return NextResponse.json({ error: err?.message || "Failed to save content" }, { status: 500 });
  }
}
