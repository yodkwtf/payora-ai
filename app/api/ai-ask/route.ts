import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";

interface IncomingSub {
  name: string;
  category: string;
  amount: number;
  currency: string;
  billingCycle: string;
  status: string;
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "ANTHROPIC_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  let question = "";
  let subscriptions: IncomingSub[] = [];
  try {
    const body = await req.json();
    question = typeof body.question === "string" ? body.question.trim() : "";
    subscriptions = Array.isArray(body.subscriptions) ? body.subscriptions : [];
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!question) return Response.json({ error: "Ask a question first." }, { status: 400 });

  const client = new Anthropic();

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      system:
        "You are PayoraAI, a concise personal-finance assistant for a subscription tracker. " +
        "Answer only from the provided subscription data. Be specific and practical, use the " +
        "currencies as given, and keep answers under 120 words. Plain text, no markdown headings.",
      messages: [
        {
          role: "user",
          content: `My subscriptions: ${JSON.stringify(subscriptions)}\n\nQuestion: ${question}`,
        },
      ],
    });

    const answer = message.content[0]?.type === "text" ? message.content[0].text.trim() : "";
    return Response.json({ answer });
  } catch (err) {
    const messageText = err instanceof Error ? err.message : "Failed to answer.";
    return Response.json({ error: messageText }, { status: 502 });
  }
}
