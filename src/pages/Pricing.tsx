import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMakePaymentMutation } from "@/redux/features/payment/payment.api";
import type { IPaymet } from "@/types";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Pricing = () => {
  const [makePayment, { isLoading }] = useMakePaymentMutation();

  const handelPayment = async (
    payload: Pick<IPaymet, "amount" | "subscriptionType">
  ) => {
    const toastId = toast.loading("Please wait...");

    try {
      const result = await makePayment(payload).unwrap();
      toast.success(result.message, { id: toastId });
      window.location.href = result.data.paymentUrl;
    } catch (error) {
      console.log(error as any);
      toast.error(
        ((error as Record<string, string | number>).data as any)?.message,
        { id: toastId }
      );
    }
  };
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Choose Your Plan</h1>
        <p className="text-muted-foreground mt-2">
          Start reading and publishing today. Pick the plan that works for you.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
        {/* Monthly Plan */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="shadow-lg hover:shadow-xl transition">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold">Monthly</CardTitle>
              <p className="text-4xl font-bold mt-2">$120</p>
              <p className="text-muted-foreground">per month</p>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ Unlimited reading</li>
                <li>✅ Access to all genres</li>
              </ul>
              <Button
                onClick={() =>
                  handelPayment({ amount: 120, subscriptionType: "MONTHLY" })
                }
                className="w-full mt-4"
                disabled={isLoading}
              >
                Get Monthly Plan
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Yearly Plan */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="shadow-lg border-primary border-2 hover:shadow-xl transition relative">
            <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 text-xs font-semibold rounded-full">
              Best Value
            </span>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold">Yearly</CardTitle>
              <p className="text-4xl font-bold mt-2">$1000</p>
              <p className="text-muted-foreground">per year</p>
              <p className="text-primary font-medium mt-2">🎉 Save $240</p>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ Unlimited reading</li>
                <li>✅ Access to all genres</li>
                <li>✅ Priority support</li>
              </ul>
              <Button
                onClick={() =>
                  handelPayment({ amount: 1000, subscriptionType: "YEARLY" })
                }
                className="w-full mt-4"
                disabled={isLoading}
              >
                Get Yearly Plan
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
