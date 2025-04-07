import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, Mail, Phone, MessageSquare } from "lucide-react";

const HelpPage = () => {
  // Mock data for FAQs
  const faqs = [
    {
      id: 1,
      question: "How do I create a new appointment?",
      answer:
        "To create a new appointment, navigate to the Appointments page and click on the 'New Appointment' button. Fill in the customer details, select the service, date, and time, then click 'Save'.",
    },
    {
      id: 2,
      question: "How do I process a payment?",
      answer:
        "To process a payment, go to the POS System page, select the customer and services, then click 'Checkout'. Choose the payment method (Cash or QRIS), complete the transaction, and generate a receipt.",
    },
    {
      id: 3,
      question: "How do I add a new service or product?",
      answer:
        "To add a new service or product, navigate to the Products page and click on the 'Add New' button. Fill in the details such as name, price, description, and category, then click 'Save'.",
    },
    {
      id: 4,
      question: "How do I view my sales reports?",
      answer:
        "To view sales reports, go to the Analytics page. You can filter the data by date range and payment method to see revenue charts, customer metrics, and service popularity.",
    },
    {
      id: 5,
      question: "How do I manage customer information?",
      answer:
        "To manage customer information, navigate to the Customers page. Here you can view, add, edit, or delete customer profiles. You can also view their transaction history.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 pb-20 md:pb-4 md:pl-72">
      {/* Main Content */}
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold">Help & Support</h1>
          <p className="text-gray-400">
            Find answers to common questions or contact support
          </p>
        </header>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search for help..."
            className="pl-10 py-6 bg-gray-900 border-gray-800 text-white"
          />
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="guides">User Guides</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="mt-4 space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription className="text-gray-400">
                  Find answers to common questions about using the barbershop
                  system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq) => (
                    <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                      <AccordionTrigger className="text-left hover:text-yellow-400">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-400">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="mt-4 space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription className="text-gray-400">
                  Get in touch with our support team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                      <Mail className="h-8 w-8 text-yellow-400 mb-2" />
                      <h3 className="font-medium">Email Support</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        support@barbershop.com
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Response within 24 hours
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                      <Phone className="h-8 w-8 text-yellow-400 mb-2" />
                      <h3 className="font-medium">Phone Support</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        +62 812 3456 7890
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Available 9 AM - 5 PM WIB
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                      <MessageSquare className="h-8 w-8 text-yellow-400 mb-2" />
                      <h3 className="font-medium">Live Chat</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        Chat with our team
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Available during business hours
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="Your Name"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="Your Email"
                        type="email"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Input
                      placeholder="Subject"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <textarea
                      placeholder="Your Message"
                      className="w-full h-32 px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                      Send Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guides" className="mt-4 space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>User Guides</CardTitle>
                <CardDescription className="text-gray-400">
                  Step-by-step guides to help you use the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Getting Started</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-4">
                        Learn the basics of using the barbershop management
                        system
                      </p>
                      <Button
                        variant="outline"
                        className="w-full border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
                      >
                        View Guide
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        POS System Guide
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-4">
                        Learn how to process transactions and manage payments
                      </p>
                      <Button
                        variant="outline"
                        className="w-full border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
                      >
                        View Guide
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Appointment Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-4">
                        Learn how to schedule and manage customer appointments
                      </p>
                      <Button
                        variant="outline"
                        className="w-full border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
                      >
                        View Guide
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Analytics & Reporting
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-4">
                        Learn how to view and interpret business analytics
                      </p>
                      <Button
                        variant="outline"
                        className="w-full border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
                      >
                        View Guide
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HelpPage;
