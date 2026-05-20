import { NextResponse } from "next/server";

const telegramChatId = "8179519607";

type TelegramLeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  business?: string;
  company?: string;
  website?: string;
  monthlyRevenue?: string;
  message?: string;
  pageUrl?: string;
  submittedAt?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatLine(label: string, value?: string) {
  const cleanValue = value?.trim();
  return cleanValue ? `<b>${label}:</b> ${escapeHtml(cleanValue)}` : null;
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "Telegram bot token is not configured." }, { status: 500 });
  }

  let payload: TelegramLeadPayload;

  try {
    payload = (await request.json()) as TelegramLeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messageLines = [
    "<b>New SMOTREAM lead</b>",
    "",
    formatLine("Name", payload.name),
    formatLine("Phone", payload.phone),
    formatLine("Email", payload.email),
    formatLine("Business / Company", payload.business || payload.company),
    formatLine("Website", payload.website),
    formatLine("Monthly Ad Budget", payload.monthlyRevenue),
    formatLine("Message", payload.message),
    formatLine("Page URL", payload.pageUrl),
    formatLine("Date / Time", payload.submittedAt || new Date().toISOString())
  ].filter(Boolean);

  const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: telegramChatId,
      text: messageLines.join("\n"),
      parse_mode: "HTML",
      disable_web_page_preview: true
    })
  });

  if (!telegramResponse.ok) {
    return NextResponse.json({ error: "Failed to send Telegram message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
