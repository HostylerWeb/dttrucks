import { getAllSettings } from "@/lib/db/settings";
import { QuickContactWidget } from "@/components/public/QuickContactWidget";

export async function QuickContactWidgetLoader() {
  const settings = await getAllSettings();
  const companyPhone = settings.company_phone?.trim() || "020 8595 4400";
  const salesPhone = settings.sales_phone?.trim() || companyPhone;
  const salesEmail =
    settings.sales_email?.trim() ||
    settings.company_email?.trim() ||
    "enquiries@dttrucks.com";

  return (
    <QuickContactWidget
      phone={salesPhone}
      email={salesEmail}
      whatsAppPhone={salesPhone}
    />
  );
}
