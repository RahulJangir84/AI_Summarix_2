import { getPriceId } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import pricingPlans from "@/utils/constants";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function PlanBadge() {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }
    const email = user?.emailAddresses?.[0]?.emailAddress;
    let priceId: string | null = null;
    if (email) {
      priceId = await getPriceId(email);
    }
    let planName = "Buy a plan";
    const planDetail = pricingPlans().plans.find(
      (plan) => plan.priceId === priceId,
    );
    if (planDetail) {
      planName = planDetail.title;
    }
    return (
      <Badge
        variant="outline"
        className={cn(
          "ml-2! hidden lg:flex flex-row items-center",
          priceId
            ? " bg-gradient-to-r from-amber-100 to-amber-200 border-amber-400 border-1"
            : "bg-gradient-to-r from-indigo-100 to-indigo-200 border-indigo-400 border-1",
        )}
      >
        <Crown
          className={cn(
            "mr-2! h-4 w-4",
            priceId ? "text-amber-600" : "text-red-600",
          )}
        />
        <div className="text-sm font-medium text-slate-900 cursor-pointer">
          {planName}
        </div>
      </Badge>
    );
  } catch {
    // currentUser() throws outside a request context (e.g. at build time).
    // Return null safely — the badge simply won't render during SSG.
    return null;
  }
}
