import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { triageSubmissions } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { petName, petSpecies, symptomsSelected, urgencyScore, ownerPhone, recommendation } = body;

    if (!petName || !petSpecies || !symptomsSelected || !urgencyScore) {
      return NextResponse.json(
        { error: "Dados incompletos da triagem." },
        { status: 400 }
      );
    }

    let saved = null;
    try {
      const [inserted] = await db
        .insert(triageSubmissions)
        .values({
          petName: petName.trim(),
          petSpecies: petSpecies.trim(),
          symptomsSelected: Array.isArray(symptomsSelected)
            ? symptomsSelected.join(", ")
            : String(symptomsSelected),
          urgencyScore: urgencyScore.trim(),
          ownerPhone: ownerPhone ? ownerPhone.trim() : null,
          recommendation: recommendation || "Consulte um médico veterinário.",
        })
        .returning();
      saved = inserted;
    } catch (dbErr) {
      console.warn("DB write warning:", dbErr);
    }

    return NextResponse.json({ success: true, triage: saved });
  } catch (error) {
    console.error("Error saving triage:", error);
    return NextResponse.json(
      { error: "Erro ao registrar triagem." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const results = await db
      .select()
      .from(triageSubmissions)
      .orderBy(desc(triageSubmissions.createdAt))
      .limit(50);
    return NextResponse.json({ triages: results });
  } catch (error) {
    console.error("Error fetching triages:", error);
    return NextResponse.json({ error: "Erro ao buscar triagens" }, { status: 500 });
  }
}
