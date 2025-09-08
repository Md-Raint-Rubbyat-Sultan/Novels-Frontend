import { useGetMyPaymentsQuery } from "@/redux/features/payment/payment.api";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Banknote, CheckCircle2, XCircle } from "lucide-react";
import { SkeletonCard } from "@/components/Layouts/Shared/skeletonCard";

type Props = {};

const MyPayments: React.FC<Props> = () => {
  const { data: myPayments, isLoading } = useGetMyPaymentsQuery(undefined);

  if (isLoading) return <SkeletonCard />;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold">My Payments</h2>

      {myPayments?.data?.length === 0 && (
        <p className="text-muted-foreground">No payments found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {myPayments?.data?.map((pay: any) => (
          <Card key={pay._id} className="relative shadow-sm">
            <CardHeader>
              <div>
                <CardTitle>{pay.subscriptionType} Subscription</CardTitle>
                <CardDescription>
                  Transaction ID: {pay.transactionId}
                </CardDescription>
              </div>
              <Badge
                variant={pay.status === "PAID" ? "default" : "destructive"}
                className="absolute right-0 top-0"
              >
                {pay.status}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Banknote className="w-4 h-4" />
                Amount: ${pay.amount}
              </div>

              <div className="flex items-center gap-2 text-sm">
                {pay.status === "PAID" ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                {new Date(pay.createdAt).toLocaleString()}
              </div>

              {pay.paymentGatewayData && (
                <p className="text-xs text-muted-foreground">
                  Gateway: {pay.paymentGatewayData.card_issuer}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
};

export default MyPayments;
