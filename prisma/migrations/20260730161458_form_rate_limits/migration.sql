-- CreateTable
CREATE TABLE "form_rate_limits" (
    "id" TEXT NOT NULL,
    "ip_hash" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "form_rate_limits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "form_rate_limits_ip_hash_action_created_at_idx" ON "form_rate_limits"("ip_hash", "action", "created_at");
