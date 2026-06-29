import Anthropic from "@anthropic-ai/sdk";
import { CATEGORIES, BILLING_CYCLES } from "@/lib/constants";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "ANTHROPIC_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  let name = "";
  try {
    const body = await req.json();
    name = typeof body.name === "string" ? body.name.trim() : "";
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!name) return Response.json({ error: "A name is required." }, { status: 400 });

  const client = new Anthropic();

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 256,
      system:
        "You classify subscription/service names for a subscription tracker. " +
        "Pick the single best category and the most common billing cycle for that service. " +
        "Respond with valid JSON only, no prose.",
      messages: [
        {
          role: "user",
          content:
            `Service name: "${name}".\n` +
            `Choose category from: ${CATEGORIES.join(", ")}.\n` +
            `Choose billingCycle from: ${BILLING_CYCLES.join(", ")}.\n` +
            `Return ONLY JSON: { "category": "", "billingCycle": "" }`,
        },
      ],
    });

    const text = message.content[0]?.type === "text" ? message.content[0].text : "";
    const parsed = JSON.parse(extractJson(text));

    const category = CATEGORIES.includes(parsed?.category) ? parsed.category : "Other";
    const billingCycle = BILLING_CYCLES.includes(parsed?.billingCycle)
      ? parsed.billingCycle
      : "Monthly";

    return Response.json({ category, billingCycle });
  } catch (err) {
    const messageText =
      err instanceof Error ? err.message : "Failed to classify the subscription.";
    return Response.json({ error: messageText }, { status: 502 });
  }
}

function extractJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) return fenced[1].trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) return text.slice(start, end + 1);
  return text.trim();
}
