import { NextResponse } from "next/server";
import {
  executeSandboxCommand,
  SandboxError,
} from "@/lib/sandbox";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body: unknown = await request.json();
    if (typeof body !== "object" || body === null || !("line" in body)) {
      return NextResponse.json({ error: "A Git command is required." }, { status: 400 });
    }
    const { line, confirmed } = body as { line: unknown; confirmed?: unknown };
    const result = await executeSandboxCommand(id, line, confirmed === true);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof SandboxError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "The action request must be valid JSON." }, { status: 400 });
    }
    console.error("Could not execute the playground action.", error);
    return NextResponse.json({ error: "Could not execute that Git action." }, { status: 500 });
  }
}
