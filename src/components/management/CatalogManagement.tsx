import React, { useState } from "react";
import { useCatalog, Service, Product } from "@/contexts/CatalogContext";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Scissors,
  ShoppingBag,
} from "lucide-react";

const CatalogManagement = () => {
  const {
    services,
    products,
    addService,
    updateService,
    deleteService,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useCatalog();

  const [activeTab, setActiveTab] = useState("services");
  const [searchQuery, setSearchQuery] = useState("");

  // Dialog states
  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false);
  const [isEditServiceDialogOpen, setIsEditServiceDialogOpen] = useState(false);
  const [isDeleteServiceDialogOpen, setIsDeleteServiceDialogOpen] =
    useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false);
  const [isDeleteProductDialogOpen, setIsDeleteProductDialogOpen] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form states
  const [serviceForm, setServiceForm] = useState({
    name: "",
    price: "",
    category: "",
  });

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });

  // Filter items based on search query
  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Handle service form input changes
  const handleServiceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServiceForm({
      ...serviceForm,
      [name]: value,
    });
  };

  // Handle product form input changes
  const handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductForm({
      ...productForm,
      [name]: value,
    });
  };

  // Handle add service
  const handleAddService = () => {
    if (!serviceForm.name || !serviceForm.price || !serviceForm.category)
      return;

    const newService: Service = {
      id: uuidv4(),
      name: serviceForm.name,
      price: parseFloat(serviceForm.price),
      category: serviceForm.category,
    };

    addService(newService);
    setServiceForm({ name: "", price: "", category: "" });
    setIsAddServiceDialogOpen(false);
  };

  // Handle edit service
  const handleEditService = () => {
    if (
      !selectedService ||
      !serviceForm.name ||
      !serviceForm.price ||
      !serviceForm.category
    )
      return;

    const updatedService: Service = {
      ...selectedService,
      name: serviceForm.name,
      price: parseFloat(serviceForm.price),
      category: serviceForm.category,
    };

    updateService(selectedService.id, updatedService);
    setServiceForm({ name: "", price: "", category: "" });
    setSelectedService(null);
    setIsEditServiceDialogOpen(false);
  };

  // Handle delete service
  const handleDeleteService = () => {
    if (!selectedService) return;

    deleteService(selectedService.id);
    setSelectedService(null);
    setIsDeleteServiceDialogOpen(false);
  };

  // Handle add product
  const handleAddProduct = () => {
    if (
      !productForm.name ||
      !productForm.price ||
      !productForm.stock ||
      !productForm.category
    )
      return;

    const newProduct: Product = {
      id: uuidv4(),
      name: productForm.name,
      price: parseFloat(productForm.price),
      stock: parseInt(productForm.stock),
      category: productForm.category,
    };

    addProduct(newProduct);
    setProductForm({ name: "", price: "", stock: "", category: "" });
    setIsAddProductDialogOpen(false);
  };

  // Handle edit product
  const handleEditProduct = () => {
    if (
      !selectedProduct ||
      !productForm.name ||
      !productForm.price ||
      !productForm.stock ||
      !productForm.category
    )
      return;

    const updatedProduct: Product = {
      ...selectedProduct,
      name: productForm.name,
      price: parseFloat(productForm.price),
      stock: parseInt(productForm.stock),
      category: productForm.category,
    };

    updateProduct(selectedProduct.id, updatedProduct);
    setProductForm({ name: "", price: "", stock: "", category: "" });
    setSelectedProduct(null);
    setIsEditProductDialogOpen(false);
  };

  // Handle delete product
  const handleDeleteProduct = () => {
    if (!selectedProduct) return;

    deleteProduct(selectedProduct.id);
    setSelectedProduct(null);
    setIsDeleteProductDialogOpen(false);
  };

  // Open edit service dialog
  const openEditServiceDialog = (service: Service) => {
    setSelectedService(service);
    setServiceForm({
      name: service.name,
      price: service.price.toString(),
      category: service.category,
    });
    setIsEditServiceDialogOpen(true);
  };

  // Open delete service dialog
  const openDeleteServiceDialog = (service: Service) => {
    setSelectedService(service);
    setIsDeleteServiceDialogOpen(true);
  };

  // Open edit product dialog
  const openEditProductDialog = (product: Product) => {
    setSelectedProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
    });
    setIsEditProductDialogOpen(true);
  };

  // Open delete product dialog
  const openDeleteProductDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteProductDialogOpen(true);
  };

  // Format currency to IDR
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Catalog Management</h2>
          <p className="text-muted-foreground">
            Manage your services and products
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search catalog..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs
        defaultValue="services"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          {activeTab === "services" ? (
            <Dialog
              open={isAddServiceDialogOpen}
              onOpenChange={setIsAddServiceDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Service
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Service</DialogTitle>
                  <DialogDescription>
                    Enter service details below
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="service-name">Name</Label>
                    <Input
                      id="service-name"
                      name="name"
                      placeholder="Service name"
                      value={serviceForm.name}
                      onChange={handleServiceInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="service-price">Price (IDR)</Label>
                    <Input
                      id="service-price"
                      name="price"
                      type="number"
                      placeholder="Price"
                      value={serviceForm.price}
                      onChange={handleServiceInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="service-category">Category</Label>
                    <Input
                      id="service-category"
                      name="category"
                      placeholder="Category"
                      value={serviceForm.category}
                      onChange={handleServiceInputChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddServiceDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddService}>Add Service</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog
              open={isAddProductDialogOpen}
              onOpenChange={setIsAddProductDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Enter product details below
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="product-name">Name</Label>
                    <Input
                      id="product-name"
                      name="name"
                      placeholder="Product name"
                      value={productForm.name}
                      onChange={handleProductInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product-price">Price (IDR)</Label>
                    <Input
                      id="product-price"
                      name="price"
                      type="number"
                      placeholder="Price"
                      value={productForm.price}
                      onChange={handleProductInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product-stock">Stock</Label>
                    <Input
                      id="product-stock"
                      name="stock"
                      type="number"
                      placeholder="Stock"
                      value={productForm.stock}
                      onChange={handleProductInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product-category">Category</Label>
                    <Input
                      id="product-category"
                      name="category"
                      placeholder="Category"
                      value={productForm.category}
                      onChange={handleProductInputChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddProductDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddProduct}>Add Product</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <TabsContent value="services" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
              <CardDescription>
                Total services: {services.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredServices.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8">
                          No services found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredServices.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="p-2 rounded-full bg-primary/10">
                                <Scissors className="h-4 w-4 text-primary" />
                              </div>
                              <div className="font-medium">{service.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>{service.category}</TableCell>
                          <TableCell>{formatCurrency(service.price)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditServiceDialog(service)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                onClick={() => openDeleteServiceDialog(service)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Total products: {products.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          No products found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="p-2 rounded-full bg-primary/10">
                                <ShoppingBag className="h-4 w-4 text-primary" />
                              </div>
                              <div className="font-medium">{product.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{formatCurrency(product.price)}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditProductDialog(product)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                onClick={() => openDeleteProductDialog(product)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Service Dialog */}
      <Dialog
        open={isEditServiceDialogOpen}
        onOpenChange={setIsEditServiceDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>Update service details below</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-service-name">Name</Label>
              <Input
                id="edit-service-name"
                name="name"
                placeholder="Service name"
                value={serviceForm.name}
                onChange={handleServiceInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-service-price">Price (IDR)</Label>
              <Input
                id="edit-service-price"
                name="price"
                type="number"
                placeholder="Price"
                value={serviceForm.price}
                onChange={handleServiceInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-service-category">Category</Label>
              <Input
                id="edit-service-category"
                name="category"
                placeholder="Category"
                value={serviceForm.category}
                onChange={handleServiceInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditServiceDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditService}>Update Service</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Service Dialog */}
      <Dialog
        open={isDeleteServiceDialogOpen}
        onOpenChange={setIsDeleteServiceDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this service? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteServiceDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteService}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog
        open={isEditProductDialogOpen}
        onOpenChange={setIsEditProductDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product details below</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-product-name">Name</Label>
              <Input
                id="edit-product-name"
                name="name"
                placeholder="Product name"
                value={productForm.name}
                onChange={handleProductInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-product-price">Price (IDR)</Label>
              <Input
                id="edit-product-price"
                name="price"
                type="number"
                placeholder="Price"
                value={productForm.price}
                onChange={handleProductInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-product-stock">Stock</Label>
              <Input
                id="edit-product-stock"
                name="stock"
                type="number"
                placeholder="Stock"
                value={productForm.stock}
                onChange={handleProductInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-product-category">Category</Label>
              <Input
                id="edit-product-category"
                name="category"
                placeholder="Category"
                value={productForm.category}
                onChange={handleProductInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditProductDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditProduct}>Update Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog
        open={isDeleteProductDialogOpen}
        onOpenChange={setIsDeleteProductDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteProductDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CatalogManagement;
