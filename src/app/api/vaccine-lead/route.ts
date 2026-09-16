import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { vaccineCalculatorLeads } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ownerName, ownerPhone, petName, petSpecies, petAgeMonths, scheduledVaccines } = body;

    if (!ownerPhone || !petName || !petSpecies) {
      return NextResponse.json(
        { error: "Telefone, nome do pet e espécie são obrigatórios." },
        { status: 400 }
      );
    }

    let lead = null;
    try {
      const [inserted] = await db
        .insert(vaccineCalculatorLeads)
        .values({
          ownerName: ownerName ? ownerName.trim() : null,
          ownerPhone: ownerPhone.trim(),
          petName: petName.trim(),
          petSpecies: petSpecies.trim(),
          petAgeMonths: petAgeMonths ? Number(petAgeMonths) : null,
          scheduledVaccines: scheduledVaccines ? String(scheduledVaccines) : null,
        })
        .returning();
      lead = inserted;
    } catch (dbErr) {
      console.warn("DB write warning:", dbErr);
    }

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("Error saving vaccine lead:", error);
    return NextResponse.json({ error: "Erro ao registrar lembrete." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const leads = await db
      .select()
      .from(vaccineCalculatorLeads)
      .orderBy(desc(vaccineCalculatorLeads.createdAt))
      .limit(50);
    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Error fetching vaccine leads:", error);
    return NextResponse.json({ error: "Erro ao buscar lembretes vacinais" }, { status: 500 });
  }
}
