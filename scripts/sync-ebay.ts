import "dotenv/config";
import { syncEbayListingsFromProfile } from "../src/lib/ebay/sync";
import { prisma } from "../src/lib/prisma";

async function main() {
  const result = await syncEbayListingsFromProfile();
  console.log(result);

  const sample = await prisma.ebay_listings.findMany({ take: 3 });
  for (const listing of sample) {
    console.log(listing.ebay_item_id, listing.price_display, listing.title);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
