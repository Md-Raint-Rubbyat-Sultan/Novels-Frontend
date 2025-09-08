import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import {
  useGetPaymentStatsQuery,
  useGetUserStatsQuery,
} from "@/redux/features/stats/stats.api";
import { SkeletonCard } from "@/components/Layouts/Shared/skeletonCard";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const Stats = () => {
  const { data: userStats, isLoading: userStatsLoading } =
    useGetUserStatsQuery(undefined);
  const { data: paymentStats, isLoading: paymentStatsLoading } =
    useGetPaymentStatsQuery(undefined);

  if (userStatsLoading || paymentStatsLoading) return <SkeletonCard />;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 w-full mx-auto space-y-8"
    >
      <h1 className="text-3xl font-bold tracking-tight">📊 Dashboard Stats</h1>

      {/* User Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>All registered users</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {userStats?.data?.totalUser ?? 0}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
            <CardDescription>Currently active</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {userStats?.data?.totalActiveUser ?? 0}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New (7 days)</CardTitle>
            <CardDescription>Recent signups</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {userStats?.data?.newUserLast7Days ?? 0}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blocked Users</CardTitle>
            <CardDescription>Disabled accounts</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-red-500">
            {userStats?.data?.totalBlock ?? 0}
          </CardContent>
        </Card>
      </div>

      {/* User Roles Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>User by Role</CardTitle>
          <CardDescription>Distribution of roles</CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={userStats?.data?.userByRole || []}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {userStats?.data?.userByRole?.map((_: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payment Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Payments</CardTitle>
            <CardDescription>All payment attempts</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {paymentStats?.data?.totalPayment ?? 0}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription>Overall earned amount</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-green-600">
            ${paymentStats?.data?.totalRevenue?.[0]?.count ?? 0}
          </CardContent>
        </Card>
      </div>

      {/* Payment Status Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Payments by Status</CardTitle>
          <CardDescription>Comparison of PAID vs UNPAID</CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer>
            <BarChart data={paymentStats?.data?.totalPaymentByStatus || []}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payment Gateway Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Gateways</CardTitle>
          <CardDescription>Distribution by gateway status</CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={paymentStats?.data?.paymentGatewayData || []}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {paymentStats?.data?.paymentGatewayData?.map(
                  (_: any, index: number) => (
                    <Cell
                      key={`cell-gateway-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  )
                )}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default Stats;
