import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const execFileAsync = promisify(execFile);

export async function GET() {
  try {
    await execFileAsync("git", ["--version"], {
      windowsHide: true,
      timeout: 3_000,
      maxBuffer: 2_000,
    });
    return NextResponse.json({ status: "ok", checks: { git: "available" } });
  } catch {
    return NextResponse.json(
      { status: "degraded", checks: { git: "unavailable" } },
      { status: 503 },
    );
  }
}
