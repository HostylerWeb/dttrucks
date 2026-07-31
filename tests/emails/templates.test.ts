import { describe, expect, it } from "vitest";
import { render } from "@react-email/render";
import { EnquiryConfirmationEmail } from "@/emails/EnquiryConfirmation";
import { JobApplicationConfirmationEmail } from "@/emails/JobApplicationConfirmation";

describe("email templates", () => {
  it("renders enquiry confirmation HTML", async () => {
    const html = await render(
      EnquiryConfirmationEmail({ name: "John Smith", type: "sales" })
    );
    expect(html).toContain("John Smith");
    expect(html).toContain("sales");
    expect(html).toContain("Thank you");
  });

  it("renders job application confirmation HTML", async () => {
    const html = await render(
      JobApplicationConfirmationEmail({
        name: "Jane Doe",
        jobTitle: "Workshop Technician",
      })
    );
    expect(html).toContain("Jane Doe");
    expect(html).toContain("Workshop Technician");
  });
});
