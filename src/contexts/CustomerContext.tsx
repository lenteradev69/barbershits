import React, { createContext, useContext, useState, useEffect } from "react";
import { Customer } from "@/models/Transaction";

interface CustomerContextType {
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string | number, customer: Customer) => void;
  deleteCustomer: (id: string | number) => void;
  getCustomerById: (id: string | number) => Customer | undefined;
}

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined,
);

export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error("useCustomers must be used within a CustomerProvider");
  }
  return context;
};

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Load customers from localStorage on initial render
  useEffect(() => {
    const storedCustomers = localStorage.getItem("barbershop_customers");
    if (storedCustomers) {
      try {
        setCustomers(JSON.parse(storedCustomers));
      } catch (error) {
        console.error("Failed to parse stored customers:", error);
      }
    }
  }, []);

  // Save customers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("barbershop_customers", JSON.stringify(customers));
  }, [customers]);

  const addCustomer = (customer: Customer) => {
    setCustomers((prev) => [customer, ...prev]);
  };

  const updateCustomer = (id: string | number, updatedCustomer: Customer) => {
    setCustomers((prev) =>
      prev.map((customer) => (customer.id === id ? updatedCustomer : customer)),
    );
  };

  const deleteCustomer = (id: string | number) => {
    setCustomers((prev) => prev.filter((customer) => customer.id !== id));
  };

  const getCustomerById = (id: string | number) => {
    return customers.find((customer) => customer.id === id);
  };

  const value = {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerById,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};
