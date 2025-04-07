import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Download,
  TrendingUp,
  Users,
  Scissors,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AnalyticsData {
  revenue: {
    daily: number[];
    weekly: number[];
    monthly: number[];
  };
  customers: {
    total: number;
    new: number;
    returning: number;
    growth: number;
  };
  services: {
    popular: Array<{ name: string; count: number }>;
    categories: Array<{ name: string; revenue: number }>;
  };
}

const AnalyticsDashboard = () => {
  // Mock data for the analytics dashboard
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    revenue: {
      daily: [120000, 150000, 180000, 130000, 200000, 250000, 190000],
      weekly: [850000, 920000, 880000, 950000],
      monthly: [3500000, 4200000, 3800000, 4500000, 4100000, 4800000],
    },
    customers: {
      total: 248,
      new: 42,
      returning: 206,
      growth: 12.5,
    },
    services: {
      popular: [
        { name: "Haircut", count: 156 },
        { name: "Beard Trim", count: 98 },
        { name: "Hair Coloring", count: 67 },
        { name: "Shave", count: 54 },
        { name: "Hair Treatment", count: 32 },
      ],
      categories: [
        { name: "Haircuts", revenue: 3120000 },
        { name: "Beard Services", revenue: 1960000 },
        { name: "Hair Treatments", revenue: 1340000 },
        { name: "Shaving", revenue: 1080000 },
        { name: "Products", revenue: 640000 },
      ],
    },
  });

  // State for date range selection
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to?: Date;
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  // State for payment method filter
  const [paymentFilter, setPaymentFilter] = useState<string>("all");

  // State for time period selection
  const [timePeriod, setTimePeriod] = useState<string>("weekly");

  // Function to format currency in IDR
  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Function to handle export reports
  const handleExport = (format: "pdf" | "csv") => {
    // In a real implementation, this would generate and download the report
    console.log(`Exporting ${format} report for period: ${timePeriod}`);
    alert(`Exporting ${format.toUpperCase()} report (simulation)`);
  };

  return (
    <div className="bg-background min-h-screen p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track your barbershop performance and insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Date Range Selector */}
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Date Range</CardTitle>
          </CardHeader>
          <CardContent>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "PPP")} -{" "}
                        {format(dateRange.to, "PPP")}
                      </>
                    ) : (
                      format(dateRange.from, "PPP")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={(range) => range && setDateRange(range)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>

        {/* Payment Method Filter */}
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Payment Methods" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payment Methods</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="qris">QRIS</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Time Period Selector */}
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Time Period</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Select Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Overview */}
      <Card className="mb-6 bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Track your earnings over time</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("pdf")}
              >
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("csv")}
              >
                <Download className="h-4 w-4 mr-2" />
                CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-end justify-between gap-2 pt-4 pb-2 px-2 border-b">
            {/* Simplified chart visualization - in a real app, use a chart library */}
            {analyticsData.revenue[
              timePeriod as keyof typeof analyticsData.revenue
            ].map((value, index) => {
              const maxValue = Math.max(
                ...analyticsData.revenue[
                  timePeriod as keyof typeof analyticsData.revenue
                ],
              );
              const height = (value / maxValue) * 100;
              return (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="w-12 bg-primary rounded-t-md relative group"
                    style={{ height: `${height * 2}px` }}
                  >
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-primary-foreground text-primary px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {formatIDR(value)}
                    </div>
                  </div>
                  <span className="text-xs mt-1 text-muted-foreground">
                    {timePeriod === "daily"
                      ? `Day ${index + 1}`
                      : timePeriod === "weekly"
                        ? `Week ${index + 1}`
                        : `Month ${index + 1}`}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-muted/20 rounded-lg">
              <div className="text-muted-foreground text-sm">Total Revenue</div>
              <div className="text-xl font-bold mt-1">
                {formatIDR(
                  analyticsData.revenue[
                    timePeriod as keyof typeof analyticsData.revenue
                  ].reduce((a, b) => a + b, 0),
                )}
              </div>
            </div>
            <div className="p-3 bg-muted/20 rounded-lg">
              <div className="text-muted-foreground text-sm">Average</div>
              <div className="text-xl font-bold mt-1">
                {formatIDR(
                  analyticsData.revenue[
                    timePeriod as keyof typeof analyticsData.revenue
                  ].reduce((a, b) => a + b, 0) /
                    analyticsData.revenue[
                      timePeriod as keyof typeof analyticsData.revenue
                    ].length,
                )}
              </div>
            </div>
            <div className="p-3 bg-muted/20 rounded-lg">
              <div className="text-muted-foreground text-sm">Highest</div>
              <div className="text-xl font-bold mt-1">
                {formatIDR(
                  Math.max(
                    ...analyticsData.revenue[
                      timePeriod as keyof typeof analyticsData.revenue
                    ],
                  ),
                )}
              </div>
            </div>
            <div className="p-3 bg-muted/20 rounded-lg">
              <div className="text-muted-foreground text-sm">Lowest</div>
              <div className="text-xl font-bold mt-1">
                {formatIDR(
                  Math.min(
                    ...analyticsData.revenue[
                      timePeriod as keyof typeof analyticsData.revenue
                    ],
                  ),
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Customer Metrics */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Customer Metrics</CardTitle>
            <CardDescription>New vs returning customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-primary/20 mr-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Total Customers
                  </div>
                  <div className="text-2xl font-bold">
                    {analyticsData.customers.total}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-500/20 mr-4">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Growth Rate
                  </div>
                  <div className="text-2xl font-bold">
                    {analyticsData.customers.growth}%
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    New Customers
                  </div>
                  <Badge variant="secondary">
                    {Math.round(
                      (analyticsData.customers.new /
                        analyticsData.customers.total) *
                        100,
                    )}
                    %
                  </Badge>
                </div>
                <div className="text-xl font-bold mt-2">
                  {analyticsData.customers.new}
                </div>
                <div className="flex items-center mt-2 text-green-500 text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>+8.2% from last period</span>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Returning Customers
                  </div>
                  <Badge variant="secondary">
                    {Math.round(
                      (analyticsData.customers.returning /
                        analyticsData.customers.total) *
                        100,
                    )}
                    %
                  </Badge>
                </div>
                <div className="text-xl font-bold mt-2">
                  {analyticsData.customers.returning}
                </div>
                <div className="flex items-center mt-2 text-green-500 text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>+3.1% from last period</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Popularity */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Service Popularity</CardTitle>
            <CardDescription>Most requested services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-full bg-primary/20 mr-4">
                <Scissors className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  Total Services
                </div>
                <div className="text-2xl font-bold">
                  {analyticsData.services.popular.reduce(
                    (sum, service) => sum + service.count,
                    0,
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {analyticsData.services.popular.map((service, index) => {
                const totalServices = analyticsData.services.popular.reduce(
                  (sum, s) => sum + s.count,
                  0,
                );
                const percentage = (service.count / totalServices) * 100;
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{service.name}</span>
                      <span className="text-muted-foreground">
                        {service.count} ({Math.round(percentage)}%)
                      </span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Category */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Revenue by Category</CardTitle>
          <CardDescription>
            Distribution of revenue across service categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {analyticsData.services.categories.map((category, index) => {
              const totalRevenue = analyticsData.services.categories.reduce(
                (sum, cat) => sum + cat.revenue,
                0,
              );
              const percentage = (category.revenue / totalRevenue) * 100;
              return (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">
                    {category.name}
                  </div>
                  <div className="text-xl font-bold mt-1">
                    {formatIDR(category.revenue)}
                  </div>
                  <div className="mt-2 flex items-center">
                    <div className="w-full bg-muted h-2 rounded-full mr-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
