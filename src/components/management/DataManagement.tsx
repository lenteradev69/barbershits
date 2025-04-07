import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  History,
  Package,
  User,
  ShoppingCart,
} from "lucide-react";

const DataManagement = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const [searchQuery, setSearchQuery] = useState("");
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Mock data
  const customers = [
    {
      id: 1,
      name: "John Doe",
      phone: "081234567890",
      visits: 12,
      lastVisit: "2023-05-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "082345678901",
      visits: 8,
      lastVisit: "2023-05-10",
    },
    {
      id: 3,
      name: "Robert Johnson",
      phone: "083456789012",
      visits: 5,
      lastVisit: "2023-05-05",
    },
    {
      id: 4,
      name: "Emily Davis",
      phone: "084567890123",
      visits: 3,
      lastVisit: "2023-04-28",
    },
    {
      id: 5,
      name: "Michael Brown",
      phone: "085678901234",
      visits: 15,
      lastVisit: "2023-05-18",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Regular Haircut",
      price: 50000,
      category: "Service",
      stock: null,
    },
    {
      id: 2,
      name: "Premium Haircut",
      price: 75000,
      category: "Service",
      stock: null,
    },
    {
      id: 3,
      name: "Beard Trim",
      price: 35000,
      category: "Service",
      stock: null,
    },
    { id: 4, name: "Hair Gel", price: 45000, category: "Product", stock: 25 },
    { id: 5, name: "Pomade", price: 60000, category: "Product", stock: 18 },
  ];

  const transactions = [
    {
      id: 1,
      date: "2023-05-15",
      items: ["Regular Haircut", "Hair Gel"],
      total: 95000,
      paymentMethod: "Cash",
    },
    {
      id: 2,
      date: "2023-05-10",
      items: ["Premium Haircut"],
      total: 75000,
      paymentMethod: "QRIS",
    },
    {
      id: 3,
      date: "2023-05-05",
      items: ["Regular Haircut", "Beard Trim"],
      total: 85000,
      paymentMethod: "Cash",
    },
    {
      id: 4,
      date: "2023-04-28",
      items: ["Premium Haircut", "Pomade"],
      total: 135000,
      paymentMethod: "QRIS",
    },
    {
      id: 5,
      date: "2023-05-18",
      items: ["Regular Haircut"],
      total: 50000,
      paymentMethod: "Cash",
    },
  ];

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery),
  );

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleEditCustomer = (customer: any) => {
    setSelectedItem(customer);
    setCustomerDialogOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedItem(product);
    setProductDialogOpen(true);
  };

  const handleViewHistory = (customer: any) => {
    setSelectedItem(customer);
    setHistoryDialogOpen(true);
  };

  const handleDelete = (item: any) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div className="container mx-auto p-4 bg-background text-foreground">
      <Card className="mb-6 border-gold/20 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gold">
            Data Management
          </CardTitle>
          <CardDescription className="text-gray-400">
            Manage your customers and product/service catalog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="customers"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="customers"
                className="flex items-center gap-2"
              >
                <User size={16} />
                <span className="hidden sm:inline">Customers</span>
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package size={16} />
                <span className="hidden sm:inline">Products & Services</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder={`Search ${activeTab === "customers" ? "customers" : "products & services"}...`}
                  className="pl-8 bg-gray-800 border-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                onClick={() => {
                  setSelectedItem(null);
                  activeTab === "customers"
                    ? setCustomerDialogOpen(true)
                    : setProductDialogOpen(true);
                }}
                className="bg-gold hover:bg-gold/80 text-black"
              >
                <Plus size={16} className="mr-1" />
                <span className="hidden sm:inline">Add New</span>
              </Button>
            </div>

            <TabsContent value="customers" className="mt-0">
              <Card className="border-gray-800 bg-gray-900">
                <CardContent className="p-0">
                  <ScrollArea className="h-[60vh] w-full rounded-md">
                    {/* Desktop view */}
                    <div className="hidden md:block">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Total Visits</TableHead>
                            <TableHead>Last Visit</TableHead>
                            <TableHead className="text-right">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredCustomers.length > 0 ? (
                            filteredCustomers.map((customer) => (
                              <TableRow key={customer.id}>
                                <TableCell className="font-medium">
                                  {customer.name}
                                </TableCell>
                                <TableCell>{customer.phone}</TableCell>
                                <TableCell>{customer.visits}</TableCell>
                                <TableCell>{customer.lastVisit}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleViewHistory(customer)
                                      }
                                      className="h-8 border-gray-700 hover:bg-gray-800"
                                    >
                                      <History size={14} />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleEditCustomer(customer)
                                      }
                                      className="h-8 border-gray-700 hover:bg-gray-800"
                                    >
                                      <Edit size={14} />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleDelete(customer)}
                                      className="h-8 border-gray-700 hover:bg-gray-800 hover:text-red-500"
                                    >
                                      <Trash2 size={14} />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={5}
                                className="text-center py-4 text-gray-500"
                              >
                                No customers found
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Mobile view */}
                    <div className="md:hidden space-y-4 p-4">
                      {filteredCustomers.length > 0 ? (
                        filteredCustomers.map((customer) => (
                          <Card
                            key={customer.id}
                            className="bg-gray-800 border-gray-700"
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-medium text-white">
                                    {customer.name}
                                  </h3>
                                  <p className="text-sm text-gray-400">
                                    {customer.phone}
                                  </p>
                                </div>
                                <Badge
                                  variant="outline"
                                  className="bg-gray-700 text-gold border-gold/30"
                                >
                                  {customer.visits} visits
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-500 mb-3">
                                Last visit: {customer.lastVisit}
                              </p>
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewHistory(customer)}
                                  className="h-8 border-gray-700 hover:bg-gray-700"
                                >
                                  <History size={14} className="mr-1" />
                                  History
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditCustomer(customer)}
                                  className="h-8 border-gray-700 hover:bg-gray-700"
                                >
                                  <Edit size={14} className="mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDelete(customer)}
                                  className="h-8 border-gray-700 hover:bg-gray-700 hover:text-red-500"
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No customers found
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="mt-0">
              <Card className="border-gray-800 bg-gray-900">
                <CardContent className="p-0">
                  <ScrollArea className="h-[60vh] w-full rounded-md">
                    {/* Desktop view */}
                    <div className="hidden md:block">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead className="text-right">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                              <TableRow key={product.id}>
                                <TableCell className="font-medium">
                                  {product.name}
                                </TableCell>
                                <TableCell>
                                  {formatCurrency(product.price)}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant={
                                      product.category === "Service"
                                        ? "secondary"
                                        : "outline"
                                    }
                                    className={
                                      product.category === "Service"
                                        ? "bg-purple-900/50 text-purple-300 hover:bg-purple-900/50"
                                        : "bg-blue-900/50 text-blue-300 hover:bg-blue-900/50"
                                    }
                                  >
                                    {product.category}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  {product.stock !== null
                                    ? product.stock
                                    : "N/A"}
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleEditProduct(product)}
                                      className="h-8 border-gray-700 hover:bg-gray-800"
                                    >
                                      <Edit size={14} />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleDelete(product)}
                                      className="h-8 border-gray-700 hover:bg-gray-800 hover:text-red-500"
                                    >
                                      <Trash2 size={14} />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={5}
                                className="text-center py-4 text-gray-500"
                              >
                                No products or services found
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Mobile view */}
                    <div className="md:hidden space-y-4 p-4">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <Card
                            key={product.id}
                            className="bg-gray-800 border-gray-700"
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-medium text-white">
                                    {product.name}
                                  </h3>
                                  <p className="text-sm text-gold">
                                    {formatCurrency(product.price)}
                                  </p>
                                </div>
                                <Badge
                                  variant={
                                    product.category === "Service"
                                      ? "secondary"
                                      : "outline"
                                  }
                                  className={
                                    product.category === "Service"
                                      ? "bg-purple-900/50 text-purple-300 hover:bg-purple-900/50"
                                      : "bg-blue-900/50 text-blue-300 hover:bg-blue-900/50"
                                  }
                                >
                                  {product.category}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-500 mb-3">
                                Stock:{" "}
                                {product.stock !== null ? product.stock : "N/A"}
                              </p>
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditProduct(product)}
                                  className="h-8 border-gray-700 hover:bg-gray-700"
                                >
                                  <Edit size={14} className="mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDelete(product)}
                                  className="h-8 border-gray-700 hover:bg-gray-700 hover:text-red-500"
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No products or services found
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Customer Dialog */}
      <Dialog open={customerDialogOpen} onOpenChange={setCustomerDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>
              {selectedItem ? "Edit Customer" : "Add New Customer"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedItem
                ? "Update customer information"
                : "Enter customer details below"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                defaultValue={selectedItem?.name || ""}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                defaultValue={selectedItem?.phone || ""}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            {selectedItem && (
              <div className="grid gap-2">
                <Label htmlFor="visits">Total Visits</Label>
                <Input
                  id="visits"
                  type="number"
                  defaultValue={selectedItem?.visits || 0}
                  className="bg-gray-800 border-gray-700"
                  readOnly
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCustomerDialogOpen(false)}
              className="border-gray-700 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button className="bg-gold hover:bg-gold/80 text-black">
              {selectedItem ? "Save Changes" : "Add Customer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Product Dialog */}
      <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>
              {selectedItem
                ? "Edit Product/Service"
                : "Add New Product/Service"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedItem
                ? "Update product or service information"
                : "Enter product or service details below"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="product-name">Name</Label>
              <Input
                id="product-name"
                defaultValue={selectedItem?.name || ""}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price (IDR)</Label>
              <Input
                id="price"
                type="number"
                defaultValue={selectedItem?.price || ""}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue={selectedItem?.category || "Product"}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Service">Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">
                Stock
                <span className="text-xs text-gray-500 ml-2">
                  (Leave empty for services)
                </span>
              </Label>
              <Input
                id="stock"
                type="number"
                defaultValue={
                  selectedItem?.stock !== null ? selectedItem?.stock : ""
                }
                className="bg-gray-800 border-gray-700"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setProductDialogOpen(false)}
              className="border-gray-700 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button className="bg-gold hover:bg-gold/80 text-black">
              {selectedItem ? "Save Changes" : "Add Product/Service"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transaction History Dialog */}
      <Dialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle>Transaction History</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedItem &&
                `Viewing transaction history for ${selectedItem.name}`}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] w-full rounded-md">
            <div className="space-y-4 p-4">
              {transactions.map((transaction) => (
                <Card
                  key={transaction.id}
                  className="bg-gray-800 border-gray-700"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <ShoppingCart size={16} className="text-gold" />
                        <span className="text-sm text-gray-400">
                          Transaction #{transaction.id}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          transaction.paymentMethod === "Cash"
                            ? "bg-green-900/30 text-green-300 border-green-500/30"
                            : "bg-blue-900/30 text-blue-300 border-blue-500/30"
                        }
                      >
                        {transaction.paymentMethod}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                      Date: {transaction.date}
                    </p>
                    <div className="mb-3">
                      <h4 className="text-xs text-gray-400 mb-1">Items:</h4>
                      <ul className="text-sm pl-4">
                        {transaction.items.map((item, index) => (
                          <li key={index} className="list-disc list-inside">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-700 pt-2 mt-2">
                      <span className="text-sm text-gray-400">Total:</span>
                      <span className="text-gold font-medium">
                        {formatCurrency(transaction.total)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button
              onClick={() => setHistoryDialogOpen(false)}
              className="bg-gold hover:bg-gold/80 text-black"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete the
              selected item from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-700 hover:bg-gray-800 text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DataManagement;
