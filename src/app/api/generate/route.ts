import { NextRequest, NextResponse } from "next/server";
import { generatePaper } from "@/lib/generator";
import { PaperRequirements } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const requirements: PaperRequirements = body;

    // Validate required fields
    if (!requirements.title || !requirements.field) {
      return NextResponse.json(
        { error: "Title and field of study are required." },
        { status: 400 }
      );
    }

    // Generate the paper (synchronous for now; streaming is handled client-side with progress simulation)
    const paper = generatePaper(requirements);

    return NextResponse.json({ paper }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred during paper generation." },
      { status: 500 }
    );
  }
}
