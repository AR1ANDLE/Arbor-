import { NextResponse } from "next/server";
import { createSandbox, SandboxError } from "@/lib/sandbox";

export const runtime = "nodejs";

export async function POST() {
  try {
    return NextResponse.json(await createSandbox(), { status: 201 });
  } catch (error) {
    if (error instanceof SandboxError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Could not create an Arbor playground.", error);
    return NextResponse.json(
      { error: "Could not create a temporary playground." },
      { status: 500 },
    );
  }
}
