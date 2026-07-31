import { prisma } from "@/lib/prisma";
import { requireRead } from "@/lib/admin/session";
import { updateSettings } from "@/app/admin/(dashboard)/settings/actions";
import { PageHeader, AdminButton } from "@/components/admin/page-header";
import { FormField, inputClassName, textareaClassName } from "@/components/admin/form-field";
import { OpeningHoursField } from "@/components/admin/opening-hours-field";

export default async function SettingsAdminPage() {
  await requireRead();
  const settings = await prisma.site_settings.findMany();
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  return (
    <div>
      <PageHeader title="Site settings" description="Global configuration" />
      <form action={updateSettings} className="max-w-2xl space-y-8">
        <section className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial space-y-4">
          <h2 className="font-headline font-semibold">Company</h2>
          <FormField label="Company name" name="company_name">
            <input name="company_name" defaultValue={map.company_name ?? ""} className={inputClassName} />
          </FormField>
          <FormField label="Phone" name="company_phone">
            <input name="company_phone" defaultValue={map.company_phone ?? ""} className={inputClassName} />
          </FormField>
          <FormField label="Email" name="company_email">
            <input name="company_email" defaultValue={map.company_email ?? ""} className={inputClassName} />
          </FormField>
          <FormField label="Address" name="company_address">
            <textarea name="company_address" defaultValue={map.company_address ?? ""} className={textareaClassName} rows={2} />
          </FormField>
          <FormField label="What3Words" name="what3words">
            <input name="what3words" defaultValue={map.what3words ?? ""} className={inputClassName} placeholder="word.word.word" />
          </FormField>
          <FormField label="Registration number" name="company_registration">
            <input name="company_registration" defaultValue={map.company_registration ?? ""} className={inputClassName} />
          </FormField>
        </section>

        <section className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial space-y-4">
          <h2 className="font-headline font-semibold">Sales contact</h2>
          <FormField label="Name" name="sales_contact_name">
            <input name="sales_contact_name" defaultValue={map.sales_contact_name ?? ""} className={inputClassName} />
          </FormField>
          <FormField label="Phone" name="sales_phone">
            <input name="sales_phone" defaultValue={map.sales_phone ?? ""} className={inputClassName} />
          </FormField>
          <FormField label="Email" name="sales_email">
            <input name="sales_email" defaultValue={map.sales_email ?? ""} className={inputClassName} />
          </FormField>
        </section>

        <section className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial space-y-4">
          <h2 className="font-headline font-semibold">Opening hours</h2>
          <OpeningHoursField defaultValue={map.opening_hours} />
        </section>

        <section className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial space-y-4">
          <h2 className="font-headline font-semibold">Social media</h2>
          <FormField label="Facebook URL" name="social_facebook">
            <input name="social_facebook" defaultValue={map.social_facebook ?? ""} className={inputClassName} />
          </FormField>
          <FormField label="LinkedIn URL" name="social_linkedin">
            <input name="social_linkedin" defaultValue={map.social_linkedin ?? ""} className={inputClassName} />
          </FormField>
          <FormField label="Instagram URL" name="social_instagram">
            <input name="social_instagram" defaultValue={map.social_instagram ?? ""} className={inputClassName} />
          </FormField>
        </section>

        <section className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial space-y-4">
          <h2 className="font-headline font-semibold">SEO defaults</h2>
          <FormField label="Default meta title" name="default_meta_title">
            <input name="default_meta_title" defaultValue={map.default_meta_title ?? ""} className={inputClassName} />
          </FormField>
          <FormField label="Default meta description" name="default_meta_description">
            <textarea name="default_meta_description" defaultValue={map.default_meta_description ?? ""} className={textareaClassName} rows={3} />
          </FormField>
        </section>

        <section className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial space-y-4">
          <h2 className="font-headline font-semibold">Integrations</h2>
          <FormField label="Google Maps embed URL" name="google_maps_embed_url">
            <input name="google_maps_embed_url" defaultValue={map.google_maps_embed_url ?? ""} className={inputClassName} />
          </FormField>
          <FormField label="eBay seller username" name="ebay_seller_username">
            <input
              name="ebay_seller_username"
              defaultValue={map.ebay_seller_username ?? "dt-trucks-isuzu"}
              className={inputClassName}
              placeholder="dt-trucks-isuzu"
            />
            <p className="mt-1 text-xs text-secondary">
              eBay username used to sync listings (same as the live site Auction Nudge feed).
            </p>
          </FormField>
          <FormField label="eBay store URL" name="ebay_store_url">
            <input
              name="ebay_store_url"
              defaultValue={map.ebay_store_url ?? ""}
              className={inputClassName}
              placeholder="https://www.ebay.co.uk/usr/dt-trucks-isuzu"
            />
          </FormField>
          <FormField label="Internal portal URL" name="internal_portal_url">
            <input name="internal_portal_url" defaultValue={map.internal_portal_url ?? ""} className={inputClassName} />
          </FormField>
          <FormField label="Live chat enabled" name="live_chat_enabled">
            <select name="live_chat_enabled" defaultValue={map.live_chat_enabled ?? "false"} className={inputClassName}>
              <option value="false">Disabled</option>
              <option value="true">Enabled</option>
            </select>
          </FormField>
          <FormField label="Live chat ID" name="live_chat_id">
            <input name="live_chat_id" defaultValue={map.live_chat_id ?? ""} className={inputClassName} />
          </FormField>
        </section>

        <AdminButton type="submit">Save settings</AdminButton>
      </form>
    </div>
  );
}
