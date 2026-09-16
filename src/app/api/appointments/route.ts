import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { appointments } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { CLINIC_INFO } from "@/lib/clinic-data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      ownerName,
      ownerPhone,
      ownerEmail,
      petName,
      petSpecies,
      petBreed,
      petAge,
      serviceRequested,
      urgencyLevel,
      preferredUnit,
      preferredDate,
      preferredTimeSlot,
      notes,
    } = body;

    if (!ownerName || !ownerPhone || !petName || !serviceRequested) {
      return NextResponse.json(
        { error: "Por favor, preencha os campos obrigatórios: seu nome, telefone/whatsapp, nome do pet e serviço." },
        { status: 400 }
      );
    }

    // Prepare custom WhatsApp message for instant confirmation
    const waText = encodeURIComponent(
      `🐾 *NOVO PRÉ-AGENDAMENTO - Inuvet*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Tutor(a):* ${ownerName}\n` +
      `📱 *Telefone/WhatsApp:* ${ownerPhone}\n` +
      `🐶 *Pet:* ${petName} (${petSpecies || "Cão"}${petBreed ? ` - ${petBreed}` : ""})\n` +
      `🏥 *Serviço:* ${serviceRequested}\n` +
      `📍 *Unidade:* ${preferredUnit || "Maringá (24h)"}\n` +
      `⚡ *Nível de Urgência:* ${urgencyLevel || "Rotina"}\n` +
      (preferredDate ? `📅 *Data Preferencial:* ${preferredDate}\n` : "") +
      (preferredTimeSlot ? `⏰ *Horário/Período:* ${preferredTimeSlot}\n` : "") +
      (notes ? `📝 *Observações/Sintomas:* ${notes}\n` : "") +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `_Enviado pelo site oficial da Inuvet - Veterinário 24h em Maringá e Sarandi_`
    );

    const whatsappRedirectUrl = `https://wa.me/${CLINIC_INFO.whatsappRaw}?text=${waText}`;

    let newAppointment = null;
    try {
      const [inserted] = await db
        .insert(appointments)
        .values({
          ownerName: ownerName.trim(),
          ownerPhone: ownerPhone.trim(),
          ownerEmail: ownerEmail ? ownerEmail.trim() : null,
          petName: petName.trim(),
          petSpecies: petSpecies || "Cão",
          petBreed: petBreed ? petBreed.trim() : "Sem raça definida (SRD)",
          petAge: petAge ? petAge.trim() : "",
          serviceRequested: serviceRequested.trim(),
          urgencyLevel: urgencyLevel || "Rotina",
          preferredDate: preferredDate || "",
          preferredTimeSlot: preferredTimeSlot || "",
          notes: `[Unidade: ${preferredUnit || "Maringá (24h)"}] ${notes ? notes.trim() : ""}`.trim(),
          status: "Pendente",
        })
        .returning();
      newAppointment = inserted;
    } catch (dbErr) {
      console.warn("DB operation warning in serverless environment:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: "Pré-agendamento registrado com sucesso!",
      appointment: newAppointment,
      whatsappUrl: whatsappRedirectUrl,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Erro ao registrar agendamento. Tente novamente ou nos chame no WhatsApp." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let query = db.select().from(appointments).orderBy(desc(appointments.createdAt));

    if (status) {
      const results = await db
        .select()
        .from(appointments)
        .where(eq(appointments.status, status))
        .orderBy(desc(appointments.createdAt));
      return NextResponse.json({ appointments: results });
    }

    const results = await query;
    return NextResponse.json({ appointments: results });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ error: "Erro ao buscar agendamentos" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "ID e novo status são obrigatórios" }, { status: 400 });
    }

    const [updated] = await db
      .update(appointments)
      .set({ status, updatedAt: new Date() })
      .where(eq(appointments.id, Number(id)))
      .returning();

    return NextResponse.json({ success: true, appointment: updated });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return NextResponse.json({ error: "Erro ao atualizar status" }, { status: 500 });
  }
}
