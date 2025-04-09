import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
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
  // State for appointments
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      id: "1",
      customer: "Deni Setiawan",
      service: "Haircut + Beard Trim",
      date: "Today",
      time: "2:30 PM",
      status: "confirmed",
    },
    {
      id: "2",
      customer: "Eko Prasetyo",
      service: "Hair Coloring",
      date: "Today",
      time: "3:15 PM",
      status: "confirmed",
    },
    {
      id: "3",
      customer: "Fajar Nugraha",
      service: "Premium Haircut",
      date: "Today",
      time: "4:00 PM",
      status: "confirmed",
    },
    {
      id: "4",
      customer: "Gita Purnama",
      service: "Regular Haircut",
      date: "Tomorrow",
      time: "10:00 AM",
      status: "pending",
    },
    {
      id: "5",
      customer: "Hadi Santoso",
      service: "Beard Trim",
      date: "Tomorrow",
      time: "11:30 AM",
      status: "confirmed",
    },
  ]);

  const [pastAppointments, setPastAppointments] = useState([]);
  const [canceledAppointments, setCanceledAppointments] = useState([]);
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // New appointment form state
  const [newAppointment, setNewAppointment] = useState({
    customer: "",
    service: "",
    date: "",
    time: "",
  });

  // Load appointments from localStorage on component mount
  useEffect(() => {
    const storedAppointments = localStorage.getItem("barbershop_appointments");
    if (storedAppointments) {
      try {
        const parsedAppointments = JSON.parse(storedAppointments);
        setUpcomingAppointments(parsedAppointments.upcoming || []);
        setPastAppointments(parsedAppointments.past || []);
        setCanceledAppointments(parsedAppointments.canceled || []);
      } catch (error) {
        console.error("Failed to parse stored appointments:", error);
      }
    } else {
      // If no appointments in localStorage, save the default ones
      saveAppointmentsToLocalStorage();
    }
  }, []);

  // Save appointments to localStorage
  const saveAppointmentsToLocalStorage = () => {
    const appointments = {
      upcoming: upcomingAppointments,
      past: pastAppointments,
      canceled: canceledAppointments,
    };
    localStorage.setItem(
      "barbershop_appointments",
      JSON.stringify(appointments),
    );
  };

  // Save appointments to localStorage whenever they change
  useEffect(() => {
    saveAppointmentsToLocalStorage();
  }, [upcomingAppointments, pastAppointments, canceledAppointments]);

  // Handle adding a new appointment
  const handleAddAppointment = () => {
    const appointment = {
      id: uuidv4(),
      customer: newAppointment.customer,
      service: newAppointment.service,
      date: newAppointment.date,
      time: newAppointment.time,
      status: "pending",
    };

    setUpcomingAppointments([...upcomingAppointments, appointment]);
    setIsNewAppointmentModalOpen(false);
    setNewAppointment({
      customer: "",
      service: "",
      date: "",
      time: "",
    });

    alert("Appointment added successfully!");
  };

  // Handle canceling an appointment
  const handleCancelAppointment = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      const appointment = upcomingAppointments.find((app) => app.id === id);
      if (appointment) {
        // Remove from upcoming and add to canceled
        setUpcomingAppointments(
          upcomingAppointments.filter((app) => app.id !== id),
        );
        setCanceledAppointments([
          ...canceledAppointments,
          { ...appointment, status: "canceled" },
        ]);
        alert("Appointment canceled successfully!");
      }
    }
  };

  // Handle completing an appointment
  const handleCompleteAppointment = (id) => {
    if (window.confirm("Mark this appointment as completed?")) {
      const appointment = upcomingAppointments.find((app) => app.id === id);
      if (appointment) {
        // Remove from upcoming and add to past
        setUpcomingAppointments(
          upcomingAppointments.filter((app) => app.id !== id),
        );
        setPastAppointments([
          ...pastAppointments,
          { ...appointment, status: "completed" },
        ]);
        alert("Appointment marked as completed!");
      }
    }
  };

  // Filter appointments based on search query
  const filteredUpcomingAppointments = upcomingAppointments.filter(
    (app) =>
      app.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.service.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 pb-20 md:pb-4 md:pl-72">
      {/* Main Content */}
      <div className="space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Appointments</h1>
            <p className="text-gray-400">Manage your barbershop appointments</p>
          </div>
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
            onClick={() => setIsNewAppointmentModalOpen(true)}
          >
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                  {filteredUpcomingAppointments.map((appointment) => (
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
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${appointment.status === "confirmed" ? "bg-green-900 text-green-400" : "bg-yellow-900 text-yellow-400"}`}
                          >
                            {appointment.status === "confirmed"
                              ? "Confirmed"
                              : "Pending"}
                          </span>
                          <button
                            onClick={() =>
                              handleCompleteAppointment(appointment.id)
                            }
                            className="text-xs px-2 py-1 rounded-full bg-blue-900 text-blue-400"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() =>
                              handleCancelAppointment(appointment.id)
                            }
                            className="text-xs px-2 py-1 rounded-full bg-red-900 text-red-400"
                          >
                            Cancel
                          </button>
                        </div>
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
                {pastAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {pastAppointments.map((appointment) => (
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
                            <p className="font-medium">
                              {appointment.customer}
                            </p>
                            <p className="text-sm text-gray-400">
                              {appointment.service}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-gray-400">
                            <Calendar className="mr-1" size={14} />
                            <span>{appointment.date}</span>
                            <Clock className="ml-2 mr-1" size={14} />
                            <span>{appointment.time}</span>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-900 text-blue-400">
                            Completed
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-400">
                    No past appointments to display
                  </div>
                )}
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
                {canceledAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {canceledAppointments.map((appointment) => (
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
                            <p className="font-medium">
                              {appointment.customer}
                            </p>
                            <p className="text-sm text-gray-400">
                              {appointment.service}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-gray-400">
                            <Calendar className="mr-1" size={14} />
                            <span>{appointment.date}</span>
                            <Clock className="ml-2 mr-1" size={14} />
                            <span>{appointment.time}</span>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-red-900 text-red-400">
                            Canceled
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-400">
                    No canceled appointments to display
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* New Appointment Modal */}
      {isNewAppointmentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">New Appointment</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Customer Name
                </label>
                <Input
                  value={newAppointment.customer}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      customer: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter customer name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Service
                </label>
                <Input
                  value={newAppointment.service}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      service: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter service"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Date</label>
                <Input
                  value={newAppointment.date}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      date: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Today or Tomorrow"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Time</label>
                <Input
                  value={newAppointment.time}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      time: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="e.g. 2:30 PM"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsNewAppointmentModalOpen(false)}
                className="border-gray-700 text-gray-300"
              >
                Cancel
              </Button>
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
                onClick={handleAddAppointment}
              >
                Add Appointment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
