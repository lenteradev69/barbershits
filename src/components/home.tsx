import React from "react";
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
import { Link } from "react-router-dom";

const HomePage = () => {
  // Mock data for dashboard
  const recentTransactions = [
    {
      id: 1,
      customer: "Ahmad Rizky",
      service: "Haircut + Beard Trim",
      amount: "Rp 150.000",
      time: "10:30 AM",
      paymentMethod: "Cash",
    },
    {
      id: 2,
      customer: "Budi Santoso",
      service: "Premium Haircut",
      amount: "Rp 100.000",
      time: "11:45 AM",
      paymentMethod: "QRIS",
    },
    {
      id: 3,
      customer: "Cahya Wijaya",
      service: "Hair Coloring",
      amount: "Rp 250.000",
      time: "1:15 PM",
      paymentMethod: "Cash",
    },
  ];

  const popularServices = [
    { id: 1, name: "Regular Haircut", count: 28, percentage: 70 },
    { id: 2, name: "Beard Trim", count: 23, percentage: 58 },
    { id: 3, name: "Hair Coloring", count: 17, percentage: 43 },
    { id: 4, name: "Premium Haircut", count: 15, percentage: 38 },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 pb-20 md:pb-4 md:pl-72">
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-around p-2 z-10">
        <Link to="/" className="flex flex-col items-center text-yellow-400">
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          to="/pos"
          className="flex flex-col items-center text-gray-400 hover:text-yellow-400"
        >
          <DollarSign size={20} />
          <span className="text-xs mt-1">POS</span>
        </Link>
        <Link
          to="/customers"
          className="flex flex-col items-center text-gray-400 hover:text-yellow-400"
        >
          <Users size={20} />
          <span className="text-xs mt-1">Customers</span>
        </Link>
        <Link
          to="/products"
          className="flex flex-col items-center text-gray-400 hover:text-yellow-400"
        >
          <Scissors size={20} />
          <span className="text-xs mt-1">Services</span>
        </Link>
        <Link
          to="/analytics"
          className="flex flex-col items-center text-gray-400 hover:text-yellow-400"
        >
          <BarChart3 size={20} />
          <span className="text-xs mt-1">Analytics</span>
        </Link>
      </div>

      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-gray-900 border-r border-gray-800 flex-col p-4 z-20">
        <div className="flex items-center mb-8">
          <div className="bg-yellow-400 text-black p-2 rounded-md mr-2">
            <Scissors size={24} />
          </div>
          <h1 className="text-xl font-bold">BarberShop</h1>
        </div>

        <nav className="flex-1">
          <Link
            to="/"
            className="flex items-center p-3 mb-2 rounded-md bg-gray-800 text-yellow-400"
          >
            <Home className="mr-3" size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/pos"
            className="flex items-center p-3 mb-2 rounded-md hover:bg-gray-800 text-gray-300 hover:text-yellow-400"
          >
            <DollarSign className="mr-3" size={20} />
            <span>POS System</span>
          </Link>
          <Link
            to="/customers"
            className="flex items-center p-3 mb-2 rounded-md hover:bg-gray-800 text-gray-300 hover:text-yellow-400"
          >
            <Users className="mr-3" size={20} />
            <span>Customers</span>
          </Link>
          <Link
            to="/products"
            className="flex items-center p-3 mb-2 rounded-md hover:bg-gray-800 text-gray-300 hover:text-yellow-400"
          >
            <Scissors className="mr-3" size={20} />
            <span>Services & Products</span>
          </Link>
          <Link
            to="/analytics"
            className="flex items-center p-3 mb-2 rounded-md hover:bg-gray-800 text-gray-300 hover:text-yellow-400"
          >
            <BarChart3 className="mr-3" size={20} />
            <span>Analytics</span>
          </Link>
        </nav>

        <div className="border-t border-gray-800 pt-4 mt-auto">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=barber" />
              <AvatarFallback>BA</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Barber Admin</p>
              <p className="text-xs text-gray-400">admin@barbershop.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-400">
              Welcome back to your barbershop dashboard
            </p>
          </div>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
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
              <div className="text-2xl font-bold">Rp 1,250,000</div>
              <p className="text-green-400 text-sm flex items-center mt-1">
                +15% from yesterday
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
              <div className="text-2xl font-bold">12</div>
              <p className="text-green-400 text-sm flex items-center mt-1">
                +2 from yesterday
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
              <div className="text-2xl font-bold">8</div>
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
              <div className="text-2xl font-bold">3</div>
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
