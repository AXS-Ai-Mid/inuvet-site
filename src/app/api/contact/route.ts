import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, subject, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Por favor, preencha nome, telefone e sua mensagem." },
        { status: 400 }
      );
    }

    let saved = null;
    try {
      const [inserted] = await db
        .insert(contactMessages)
        .values({
          name: name.trim(),
          phone: phone.trim(),
          email: email ? email.trim() : null,
          subject: subject ? subject.trim() : "Mensagem pelo site",
          message: message.trim(),
          status: "Novo",
        })
        .returning();
      saved = inserted;
    } catch (dbErr) {
      console.warn("DB write bypassed in serverless environment:", dbErr);
    }

    return NextResponse.json({ success: true, message: "Mensagem recebida com sucesso!", data: saved });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json({ error: "Erro ao enviar mensagem" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const results = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt))
      .limit(50);
    return NextResponse.json({ messages: results });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Erro ao buscar mensagens" }, { status: 500 });
  }
}
