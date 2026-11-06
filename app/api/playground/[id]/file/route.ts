import { NextResponse } from "next/server";
import {
  readSandboxFile,
  SandboxError,
  writeSandboxFile,
} from "@/lib/sandbox";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const file = new URL(request.url).searchParams.get("path");
    return NextResponse.json({ content: await readSandboxFile(id, file) });
  } catch (error) {
    if (error instanceof SandboxError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "The file request must be valid JSON." }, { status: 400 });
    }
    console.error("Could not read a playground file.", error);
    return NextResponse.json({ error: "Could not read that file." }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body: unknown = await request.json();
    if (typeof body !== "object" || body === null || !("path" in body) || !("content" in body)) {
      return NextResponse.json({ error: "A file path and contents are required." }, { status: 400 });
    }
    const { path, content } = body as { path: unknown; content: unknown };
    return NextResponse.json({ state: await writeSandboxFile(id, path, content) });
  } catch (error) {
    if (error instanceof SandboxError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Could not save a playground file.", error);
    return NextResponse.json({ error: "Could not save that file." }, { status: 500 });
  }
}
