"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SubscriptionForm } from "@/components/subscriptions/SubscriptionForm";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/toast";

export default function AddPage() {
  const router = useRouter();
  const { addSubscription } = useSubscriptions();
  const defaultCurrency = useStore((s) => s.settings.currency);
  const { toast } = useToast();

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <p className="text-sm text-muted-foreground">
        Add a recurring payment to start tracking it.
      </p>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="glass p-6">
          <SubscriptionForm
            defaultCurrency={defaultCurrency}
            onCancel={() => router.push("/subscriptions")}
            onSubmit={(draft) => {
              const id = addSubscription(draft);
              if (!id) {
                toast({
                  title: "Already tracking this",
                  description: `${draft.name} is already in your list.`,
                  variant: "error",
                });
                return;
              }
              toast({ title: "Subscription added", description: draft.name });
              router.push("/subscriptions");
            }}
          />
        </Card>
      </motion.div>
    </div>
  );
}
