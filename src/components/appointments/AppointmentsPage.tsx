import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AppointmentsPage = () => {
  // Mock data for appointments
  const upcomingAppointments = [
    {
      id: 1,
      customer: "Deni Setiawan",
      service: "Haircut + Beard Trim",
      date: "Today",
      time: "2:30 PM",
      status: "confirmed",
    },
    {
      id: 2,
      customer: "Eko Prasetyo",
      service: "Hair Coloring",
      date: "Today",
      time: "3:15 PM",
      status: "confirmed",
    },
    {
      id: 3,
      customer: "Fajar Nugraha",
      service: "Premium Haircut",
      date: "Today",
      time: "4:00 PM",
      status: "confirmed",
    },
    {
      id: 4,
      customer: "Gita Purnama",
      service: "Regular Haircut",
      date: "Tomorrow",
      time: "10:00 AM",
      status: "pending",
    },
    {
      id: 5,
      customer: "Hadi Santoso",
      service: "Beard Trim",
      date: "Tomorrow",
      time: "11:30 AM",
      status: "confirmed",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 pb-20 md:pb-4 md:pl-72">
      {/* Main Content */}
      <div className="space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Appointments</h1>
            <p className="text-gray-400">Manage your barbershop appointments</p>
          </div>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
            <Plus className="mr-2 h-4 w-4" /> New Appointment
          </Button>
        </header>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search appointments..."
              className="pl-10 bg-gray-900 border-gray-800 text-white"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-700 text-gray-300">
              <Calendar className="mr-2 h-4 w-4" /> Date
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300">
              <Clock className="mr-2 h-4 w-4" /> Time
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="canceled">Canceled</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your scheduled appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${appointment.customer}`}
                          />
                          <AvatarFallback>
                            {appointment.customer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{appointment.customer}</p>
                          <p className="text-sm text-gray-400">
                            {appointment.service}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-yellow-400">
                          <Calendar className="mr-1" size={14} />
                          <span>{appointment.date}</span>
                          <Clock className="ml-2 mr-1" size={14} />
                          <span>{appointment.time}</span>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${appointment.status === "confirmed" ? "bg-green-900 text-green-400" : "bg-yellow-900 text-yellow-400"}`}
                        >
                          {appointment.status === "confirmed"
                            ? "Confirmed"
                            : "Pending"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  View All Appointments
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="past">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Past Appointments</CardTitle>
                <CardDescription className="text-gray-400">
                  View your completed appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 text-center text-gray-400">
                  No past appointments to display
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="canceled">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Canceled Appointments</CardTitle>
                <CardDescription className="text-gray-400">
                  View your canceled appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 text-center text-gray-400">
                  No canceled appointments to display
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AppointmentsPage;
