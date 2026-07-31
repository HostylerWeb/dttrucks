import { NextResponse } from "next/server";
import {
  formDataToEnquiryBody,
  processEnquirySubmission,
} from "@/lib/enquiries/process-enquiry";
import { getClientIp } from "@/lib/request";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const contentType = request.headers.get("content-type") ?? "";

    let body: Record<string, unknown>;

    if (contentType.includes("application/json")) {
      body = (await request.json()) as Record<string, unknown>;
    } else {
      const formData = await request.formData();
      body = formDataToEnquiryBody(formData);
    }

    const result = await processEnquirySubmission(body, ip);

    if ("error" in result) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status ?? 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/enquiries]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
