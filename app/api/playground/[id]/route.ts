import { NextResponse } from "next/server";
import {
  readSandboxState,
  resetSandbox,
  SandboxError,
} from "@/lib/sandbox";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    return NextResponse.json({ state: await readSandboxState(id) });
  } catch (error) {
    if (error instanceof SandboxError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Could not read the Arbor playground state.", error);
    return NextResponse.json({ error: "Could not read playground state." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    return NextResponse.json({ state: await resetSandbox(id) });
  } catch (error) {
    if (error instanceof SandboxError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Could not reset the Arbor playground.", error);
    return NextResponse.json({ error: "Could not reset the playground." }, { status: 500 });
  }
}
