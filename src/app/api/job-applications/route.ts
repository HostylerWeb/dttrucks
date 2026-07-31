import { NextResponse } from "next/server";
import { processJobApplicationSubmission } from "@/lib/jobs/process-application";
import { getClientIp } from "@/lib/request";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const formData = await request.formData();
    const result = await processJobApplicationSubmission(formData, ip);

    if ("error" in result) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status ?? 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/job-applications]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
