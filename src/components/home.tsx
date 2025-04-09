import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3,
  Calendar,
  Clock,
  DollarSign,
  Home,
  Scissors,
  ShoppingBag,
  Users,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";
import { useTransactions } from "@/contexts/TransactionContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { transactions, getRecentTransactions, getTransactionSummary } =
    useTransactions();
  const [todayStats, setTodayStats] = useState({
    revenue: 0,
    customers: 0,
    appointments: 8, // Default value for appointments
    lowStockProducts: 3, // Default value for low stock products
  });
  const [popularServices, setPopularServices] = useState([
    { id: 1, name: "Regular Haircut", count: 0, percentage: 0 },
    { id: 2, name: "Beard Trim", count: 0, percentage: 0 },
    { id: 3, name: "Hair Coloring", count: 0, percentage: 0 },
    { id: 4, name: "Premium Haircut", count: 0, percentage: 0 },
  ]);

  // Get recent transactions from context
  const recentTransactions = getRecentTransactions(3).map((transaction) => ({
    id: transaction.id,
    customer: transaction.customer?.name || "Walk-in Customer",
    service: transaction.items.map((item) => item.name).join(", "),
    amount: formatIDR(transaction.total),
    time: new Date(transaction.date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    paymentMethod: transaction.paymentMethod === "cash" ? "Cash" : "QRIS",
  }));

  // Format currency in IDR
  const formatIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate today's stats
  useEffect(() => {
    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Filter transactions for today
    const todayTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= today && transactionDate < tomorrow;
    });

    // Calculate today's revenue
    const todayRevenue = todayTransactions.reduce(
      (sum, transaction) => sum + transaction.total,
      0,
    );

    // Count unique customers today
    const uniqueCustomers = new Set();
    todayTransactions.forEach((transaction) => {
      if (transaction.customer?.id) {
        uniqueCustomers.add(transaction.customer.id);
      } else {
        uniqueCustomers.add("walk-in-" + transaction.id);
      }
    });

    setTodayStats({
      ...todayStats,
      revenue: todayRevenue,
      customers: uniqueCustomers.size,
    });

    // Calculate popular services
    const serviceCount = {};
    let totalServices = 0;

    transactions.forEach((transaction) => {
      transaction.items.forEach((item) => {
        if (item.type === "service") {
          if (!serviceCount[item.name]) {
            serviceCount[item.name] = 0;
          }
          serviceCount[item.name] += item.quantity;
          totalServices += item.quantity;
        }
      });
    });

    // Convert to array and sort by count
    const sortedServices = Object.entries(serviceCount)
      .map(([name, count]) => ({
        name,
        count,
        percentage:
          totalServices > 0 ? Math.round((count / totalServices) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    // If we have actual service data, update the state
    if (sortedServices.length > 0) {
      setPopularServices(
        sortedServices.map((service, index) => ({
          id: index + 1,
          ...service,
        })),
      );
    }
  }, [transactions]);

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      {/* Mobile Bottom Navigation - This is now handled by AppLayout component */}

      {/* Desktop Sidebar - Now handled by AppLayout component */}

      {/* Main Content */}
      <div className="space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-400">
              Welcome back to your barbershop dashboard
            </p>
          </div>
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
            onClick={() => navigate("/pos")}
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> New Transaction
          </Button>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm font-normal">
                Today's Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatIDR(todayStats.revenue)}
              </div>
              <p className="text-green-400 text-sm flex items-center mt-1">
                {todayStats.revenue > 0
                  ? "Active sales today"
                  : "No sales yet today"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm font-normal">
                Customers Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.customers}</div>
              <p className="text-green-400 text-sm flex items-center mt-1">
                {todayStats.customers > 0
                  ? `${todayStats.customers} customer(s) served`
                  : "No customers yet"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm font-normal">
                Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {todayStats.appointments}
              </div>
              <p className="text-gray-400 text-sm flex items-center mt-1">
                Next: 2:30 PM
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm font-normal">
                Products Low in Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {todayStats.lowStockProducts}
              </div>
              <p className="text-yellow-400 text-sm flex items-center mt-1">
                Needs attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription className="text-gray-400">
                Latest customer transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${transaction.customer}`}
                        />
                        <AvatarFallback>
                          {transaction.customer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{transaction.customer}</p>
                        <p className="text-sm text-gray-400">
                          {transaction.service}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-yellow-400">
                        {transaction.amount}
                      </p>
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="mr-1" size={12} />
                        <span>{transaction.time}</span>
                        <span className="ml-2 px-1.5 py-0.5 bg-gray-700 rounded">
                          {transaction.paymentMethod}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => navigate("/analytics")}
              >
                View All Transactions
              </Button>
            </CardContent>
          </Card>

          {/* Popular Services & Today's Schedule */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Popular Services</CardTitle>
                <CardDescription className="text-gray-400">
                  Most requested services this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularServices.map((service) => (
                    <div key={service.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">{service.name}</span>
                        <span className="text-sm text-gray-400">
                          {service.count} customers
                        </span>
                      </div>
                      <Progress
                        value={service.percentage}
                        className="h-2 bg-gray-800"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription className="text-gray-400">
                  Upcoming appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex p-2 bg-gray-800 rounded-lg">
                    <div className="flex-shrink-0 flex flex-col items-center mr-3 text-yellow-400">
                      <Calendar size={16} />
                      <div className="h-full w-px bg-gray-700 my-1"></div>
                      <span className="text-xs">2:30</span>
                    </div>
                    <div>
                      <p className="font-medium">Deni Setiawan</p>
                      <p className="text-sm text-gray-400">
                        Haircut + Beard Trim
                      </p>
                    </div>
                  </div>

                  <div className="flex p-2 bg-gray-800 rounded-lg">
                    <div className="flex-shrink-0 flex flex-col items-center mr-3 text-yellow-400">
                      <Calendar size={16} />
                      <div className="h-full w-px bg-gray-700 my-1"></div>
                      <span className="text-xs">3:15</span>
                    </div>
                    <div>
                      <p className="font-medium">Eko Prasetyo</p>
                      <p className="text-sm text-gray-400">Hair Coloring</p>
                    </div>
                  </div>

                  <div className="flex p-2 bg-gray-800 rounded-lg">
                    <div className="flex-shrink-0 flex flex-col items-center mr-3 text-yellow-400">
                      <Calendar size={16} />
                      <div className="h-full w-px bg-gray-700 my-1"></div>
                      <span className="text-xs">4:00</span>
                    </div>
                    <div>
                      <p className="font-medium">Fajar Nugraha</p>
                      <p className="text-sm text-gray-400">Premium Haircut</p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                  onClick={() => navigate("/appointments")}
                >
                  View Full Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
