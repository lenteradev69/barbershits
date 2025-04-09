import React, { createContext, useContext, useState, useEffect } from "react";

export interface Service {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface CatalogContextType {
  services: Service[];
  products: Product[];
  addService: (service: Service) => void;
  updateService: (id: string, service: Service) => void;
  deleteService: (id: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Product) => void;
  deleteProduct: (id: string) => void;
  getServiceById: (id: string) => Service | undefined;
  getProductById: (id: string) => Product | undefined;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (context === undefined) {
    throw new Error("useCatalog must be used within a CatalogProvider");
  }
  return context;
};

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Load services and products from localStorage on initial render
  useEffect(() => {
    const storedServices = localStorage.getItem("barbershop_services");
    if (storedServices) {
      try {
        setServices(JSON.parse(storedServices));
      } catch (error) {
        console.error("Failed to parse stored services:", error);
      }
    } else {
      // Default services if none exist
      const defaultServices = [
        {
          id: "s1",
          name: "Regular Haircut",
          price: 50000,
          category: "Haircut",
        },
        { id: "s2", name: "Beard Trim", price: 30000, category: "Grooming" },
        { id: "s3", name: "Hair Coloring", price: 150000, category: "Color" },
        { id: "s4", name: "Shave", price: 40000, category: "Grooming" },
        { id: "s5", name: "Kids Haircut", price: 35000, category: "Haircut" },
      ];
      setServices(defaultServices);
      localStorage.setItem(
        "barbershop_services",
        JSON.stringify(defaultServices),
      );
    }

    const storedProducts = localStorage.getItem("barbershop_products");
    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch (error) {
        console.error("Failed to parse stored products:", error);
      }
    } else {
      // Default products if none exist
      const defaultProducts = [
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
      ];
      setProducts(defaultProducts);
      localStorage.setItem(
        "barbershop_products",
        JSON.stringify(defaultProducts),
      );
    }
  }, []);

  // Save services and products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("barbershop_services", JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem("barbershop_products", JSON.stringify(products));
  }, [products]);

  const addService = (service: Service) => {
    setServices((prev) => [service, ...prev]);
  };

  const updateService = (id: string, updatedService: Service) => {
    setServices((prev) =>
      prev.map((service) => (service.id === id ? updatedService : service)),
    );
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (id: string, updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((product) => (product.id === id ? updatedProduct : product)),
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const getServiceById = (id: string) => {
    return services.find((service) => service.id === id);
  };

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id);
  };

  const value = {
    services,
    products,
    addService,
    updateService,
    deleteService,
    addProduct,
    updateProduct,
    deleteProduct,
    getServiceById,
    getProductById,
  };

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
};
