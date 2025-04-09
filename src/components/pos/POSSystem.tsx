import React, { useState, useEffect } from "react";
import { useTransactions } from "@/contexts/TransactionContext";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Plus,
  Scissors,
  ShoppingCart,
  User,
  ChevronRight,
  Trash2,
  CreditCard,
  Banknote,
  Share,
  Printer,
  Download,
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  visits: number;
}

interface Service {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: "service" | "product";
}

const POSSystem = () => {
  // Get addTransaction function from context
  const { addTransaction } = useTransactions();

  // Step state to track the current step in the transaction flow
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selected customer state
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "qris">("cash");

  // Cash amount received (for calculating change)
  const [cashReceived, setCashReceived] = useState<string>("");

  // Discount state
  const [discount, setDiscount] = useState<string>("");

  // Dialog states
  const [customerDialogOpen, setCustomerDialogOpen] = useState<boolean>(true);
  const [receiptDialogOpen, setReceiptDialogOpen] = useState<boolean>(false);

  // State for customers, services, and products
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "John Doe",
      phone: "081234567890",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      visits: 12,
    },
    {
      id: "2",
      name: "Jane Smith",
      phone: "082345678901",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      visits: 5,
    },
    {
      id: "3",
      name: "Mike Johnson",
      phone: "083456789012",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      visits: 8,
    },
  ]);

  const [services, setServices] = useState<Service[]>([
    { id: "s1", name: "Regular Haircut", price: 50000, category: "Haircut" },
    { id: "s2", name: "Beard Trim", price: 30000, category: "Grooming" },
    { id: "s3", name: "Hair Coloring", price: 150000, category: "Color" },
    { id: "s4", name: "Shave", price: 40000, category: "Grooming" },
    { id: "s5", name: "Kids Haircut", price: 35000, category: "Haircut" },
  ]);

  const [products, setProducts] = useState<Product[]>([
    {
      id: "p1",
      name: "Pomade",
      price: 85000,
      stock: 15,
      category: "Hair Products",
    },
    {
      id: "p2",
      name: "Beard Oil",
      price: 70000,
      stock: 8,
      category: "Grooming",
    },
    {
      id: "p3",
      name: "Shampoo",
      price: 60000,
      stock: 12,
      category: "Hair Products",
    },
  ]);

  // Load data from localStorage on component mount
  useEffect(() => {
    // Load customers
    const storedCustomers = localStorage.getItem("barbershop_customers");
    if (storedCustomers) {
      try {
        setCustomers(JSON.parse(storedCustomers));
      } catch (error) {
        console.error("Failed to parse stored customers:", error);
      }
    } else {
      // If no customers in localStorage, save the default ones
      localStorage.setItem("barbershop_customers", JSON.stringify(customers));
    }

    // Load services
    const storedServices = localStorage.getItem("barbershop_services");
    if (storedServices) {
      try {
        setServices(JSON.parse(storedServices));
      } catch (error) {
        console.error("Failed to parse stored services:", error);
      }
    } else {
      // If no services in localStorage, save the default ones
      localStorage.setItem("barbershop_services", JSON.stringify(services));
    }

    // Load products
    const storedProducts = localStorage.getItem("barbershop_products");
    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch (error) {
        console.error("Failed to parse stored products:", error);
      }
    } else {
      // If no products in localStorage, save the default ones
      localStorage.setItem("barbershop_products", JSON.stringify(products));
    }
  }, []);

  // Calculate cart total
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate discount amount
  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    const discountValue = parseFloat(discount) || 0;
    return Math.min(subtotal, subtotal * (discountValue / 100));
  };

  // Calculate final total
  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  // Calculate change
  const calculateChange = () => {
    const total = calculateTotal();
    const received = parseFloat(cashReceived.replace(/,/g, "")) || 0;
    return Math.max(0, received - total);
  };

  // Add item to cart
  const addToCart = (item: Service | Product, type: "service" | "product") => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id,
    );

    if (existingItemIndex >= 0) {
      // Item already in cart, increase quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Add new item to cart
      setCart([
        ...cart,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          type,
        },
      ]);
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  // Update item quantity in cart
  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(
      cart.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
    );
  };

  // Format currency to IDR
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Handle next step
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Handle previous step
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Handle customer selection
  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCustomerDialogOpen(false);
    handleNextStep();
  };

  // Handle payment completion
  const handleCompletePayment = () => {
    // Create a new transaction object
    const newTransaction = {
      id: uuidv4(),
      date: new Date().toISOString(),
      customer: selectedCustomer,
      items: cart,
      subtotal: calculateSubtotal(),
      discount: parseFloat(discount) || 0,
      total: calculateTotal(),
      paymentMethod: paymentMethod,
      cashReceived:
        paymentMethod === "cash" ? parseFloat(cashReceived) || 0 : undefined,
      change: paymentMethod === "cash" ? calculateChange() : undefined,
    };

    // Add the transaction to the context
    addTransaction(newTransaction);

    // Show receipt
    setReceiptDialogOpen(true);
  };

  // Handle transaction completion
  const handleCompleteTransaction = () => {
    // Reset all state for a new transaction
    setCurrentStep(1);
    setSelectedCustomer(null);
    setCart([]);
    setPaymentMethod("cash");
    setCashReceived("");
    setDiscount("");
    setReceiptDialogOpen(false);

    // Show success message
    alert("Transaction completed successfully!");
  };

  // Render step indicator
  const renderStepIndicator = () => {
    return (
      <div className="w-full mb-6">
        <div className="flex justify-between mb-2">
          <div className="text-xs">Customer</div>
          <div className="text-xs">Items</div>
          <div className="text-xs">Payment</div>
          <div className="text-xs">Receipt</div>
        </div>
        <Progress value={(currentStep / 4) * 100} className="h-2" />
      </div>
    );
  };

  // Render customer selection step
  const renderCustomerStep = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search customers..."
            className="flex-1"
            startIcon={<Search className="h-4 w-4" />}
          />
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="space-y-2">
            {customers.map((customer) => (
              <Card
                key={customer.id}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => handleSelectCustomer(customer)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={customer.avatar} />
                      <AvatarFallback>
                        {customer.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {customer.phone}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{customer.visits} visits</Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            // In a real app, this would open a form to create a new customer
            handleNextStep();
          }}
        >
          Continue as Guest
        </Button>
      </div>
    );
  };

  // Render product/service selection step
  const renderItemsStep = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {selectedCustomer ? (
              <>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedCustomer.avatar} />
                  <AvatarFallback>
                    {selectedCustomer.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm font-medium">
                  {selectedCustomer.name}
                </div>
              </>
            ) : (
              <div className="text-sm font-medium">Guest Customer</div>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={handlePreviousStep}>
            Change
          </Button>
        </div>

        <Tabs defaultValue="services">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="mt-4">
            <ScrollArea className="h-[250px]">
              <div className="space-y-2">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => addToCart(service, "service")}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {service.category}
                        </div>
                      </div>
                      <div className="font-medium">
                        {formatCurrency(service.price)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="products" className="mt-4">
            <ScrollArea className="h-[250px]">
              <div className="space-y-2">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => addToCart(product, "product")}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {product.category} • Stock: {product.stock}
                        </div>
                      </div>
                      <div className="font-medium">
                        {formatCurrency(product.price)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="bg-card border rounded-lg p-4 space-y-3">
          <div className="font-medium">Cart</div>
          {cart.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <ShoppingCart className="h-10 w-10 mx-auto mb-2 opacity-20" />
              <div>Your cart is empty</div>
              <div className="text-sm">
                Add services or products to continue
              </div>
            </div>
          ) : (
            <>
              <ScrollArea className="h-[150px]">
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        {item.type === "service" ? (
                          <Scissors className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        )}
                        <div>
                          <div className="text-sm font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatCurrency(item.price)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              updateCartItemQuantity(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </Button>
                          <div className="w-6 text-center">{item.quantity}</div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              updateCartItemQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div>Subtotal</div>
                  <div>{formatCurrency(calculateSubtotal())}</div>
                </div>

                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    placeholder="Discount %"
                    className="w-24"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                  <div className="text-sm text-muted-foreground">Discount</div>
                  <div className="flex-1 text-right text-sm">
                    {formatCurrency(calculateDiscount())}
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-medium">
                  <div>Total</div>
                  <div>{formatCurrency(calculateTotal())}</div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handlePreviousStep}
          >
            Back
          </Button>
          <Button
            className="flex-1"
            disabled={cart.length === 0}
            onClick={handleNextStep}
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    );
  };

  // Render payment step
  const renderPaymentStep = () => {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div className="text-sm">
                    {item.name} x {item.quantity}
                  </div>
                  <div className="text-sm font-medium">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <div>Subtotal</div>
                <div>{formatCurrency(calculateSubtotal())}</div>
              </div>

              {parseFloat(discount) > 0 && (
                <div className="flex justify-between text-sm">
                  <div>Discount ({discount}%)</div>
                  <div>-{formatCurrency(calculateDiscount())}</div>
                </div>
              )}

              <div className="flex justify-between font-medium">
                <div>Total</div>
                <div>{formatCurrency(calculateTotal())}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <div className="font-medium">Payment Method</div>

          <RadioGroup
            value={paymentMethod}
            onValueChange={(value) =>
              setPaymentMethod(value as "cash" | "qris")
            }
            className="space-y-2"
          >
            <div className="flex items-center space-x-2 border rounded-md p-3">
              <RadioGroupItem value="cash" id="cash" />
              <Label
                htmlFor="cash"
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Banknote className="h-4 w-4" />
                <span>Cash</span>
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-md p-3">
              <RadioGroupItem value="qris" id="qris" />
              <Label
                htmlFor="qris"
                className="flex items-center space-x-2 cursor-pointer"
              >
                <CreditCard className="h-4 w-4" />
                <span>QRIS</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {paymentMethod === "cash" && (
          <div className="space-y-2">
            <div className="font-medium">Cash Received</div>
            <Input
              type="text"
              placeholder="Enter amount"
              value={cashReceived}
              onChange={(e) => setCashReceived(e.target.value)}
            />

            {parseFloat(cashReceived) > 0 && (
              <div className="flex justify-between p-2 bg-muted rounded-md">
                <div>Change</div>
                <div className="font-medium">
                  {formatCurrency(calculateChange())}
                </div>
              </div>
            )}
          </div>
        )}

        {paymentMethod === "qris" && (
          <div className="p-4 border rounded-md flex flex-col items-center justify-center space-y-2">
            <div className="text-center text-sm text-muted-foreground mb-2">
              Please ask customer to scan QRIS code or show their payment app
            </div>
            <div className="w-48 h-48 bg-muted flex items-center justify-center">
              <div className="text-xs text-muted-foreground">
                [QRIS Placeholder]
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handlePreviousStep}
          >
            Back
          </Button>
          <Button
            className="flex-1"
            disabled={
              paymentMethod === "cash" &&
              (parseFloat(cashReceived) < calculateTotal() || !cashReceived)
            }
            onClick={handleCompletePayment}
          >
            Complete Payment
          </Button>
        </div>
      </div>
    );
  };

  // Render receipt dialog
  const renderReceiptDialog = () => {
    return (
      <Dialog open={receiptDialogOpen} onOpenChange={setReceiptDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Transaction Complete</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="border rounded-md p-4 space-y-4">
              <div className="text-center">
                <div className="font-bold text-lg">BARBERSHOP</div>
                <div className="text-sm text-muted-foreground">
                  Jl. Barber Street No. 123
                </div>
                <div className="text-sm text-muted-foreground">
                  Phone: 021-1234567
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-sm">
                <div>Date:</div>
                <div>{new Date().toLocaleDateString()}</div>
              </div>

              <div className="flex justify-between text-sm">
                <div>Customer:</div>
                <div>{selectedCustomer ? selectedCustomer.name : "Guest"}</div>
              </div>

              <Separator />

              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      {item.name} x {item.quantity}
                    </div>
                    <div>{formatCurrency(item.price * item.quantity)}</div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <div>Subtotal</div>
                  <div>{formatCurrency(calculateSubtotal())}</div>
                </div>

                {parseFloat(discount) > 0 && (
                  <div className="flex justify-between text-sm">
                    <div>Discount ({discount}%)</div>
                    <div>-{formatCurrency(calculateDiscount())}</div>
                  </div>
                )}

                <div className="flex justify-between font-medium">
                  <div>Total</div>
                  <div>{formatCurrency(calculateTotal())}</div>
                </div>

                <div className="flex justify-between text-sm">
                  <div>Payment Method</div>
                  <div>{paymentMethod === "cash" ? "Cash" : "QRIS"}</div>
                </div>

                {paymentMethod === "cash" && (
                  <>
                    <div className="flex justify-between text-sm">
                      <div>Cash Received</div>
                      <div>{formatCurrency(parseFloat(cashReceived))}</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>Change</div>
                      <div>{formatCurrency(calculateChange())}</div>
                    </div>
                  </>
                )}
              </div>

              <Separator />

              <div className="text-center text-sm">
                <div>Thank you for your visit!</div>
                <div className="text-muted-foreground">See you again soon</div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleCompleteTransaction}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleCompleteTransaction}
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleCompleteTransaction}
              >
                <Download className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>

            <Button className="w-full" onClick={handleCompleteTransaction}>
              New Transaction
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="bg-background min-h-screen p-4 md:p-6 lg:p-8">
      <Card className="max-w-md mx-auto bg-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div>New Transaction</div>
            <div className="text-sm font-normal text-muted-foreground">
              Step {currentStep} of 4
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderStepIndicator()}

          {currentStep === 1 && renderCustomerStep()}
          {currentStep === 2 && renderItemsStep()}
          {currentStep === 3 && renderPaymentStep()}

          {renderReceiptDialog()}
        </CardContent>
      </Card>
    </div>
  );
};

export default POSSystem;
