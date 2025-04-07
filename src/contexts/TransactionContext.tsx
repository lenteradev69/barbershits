import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Transaction,
  TransactionSummary,
  CartItem,
} from "@/models/Transaction";

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  getTransactionById: (id: string) => Transaction | undefined;
  getRecentTransactions: (limit?: number) => Transaction[];
  getTransactionsByCustomerId: (customerId: string | number) => Transaction[];
  getTransactionSummary: (dateRange?: {
    from: Date;
    to: Date;
  }) => TransactionSummary;
  clearTransactions: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined,
);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider",
    );
  }
  return context;
};

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load transactions from localStorage on initial render
  useEffect(() => {
    const storedTransactions = localStorage.getItem("barbershop_transactions");
    if (storedTransactions) {
      try {
        setTransactions(JSON.parse(storedTransactions));
      } catch (error) {
        console.error("Failed to parse stored transactions:", error);
      }
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      "barbershop_transactions",
      JSON.stringify(transactions),
    );
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const updateTransaction = (id: string, updatedTransaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === id ? updatedTransaction : transaction,
      ),
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id),
    );
  };

  const getTransactionById = (id: string) => {
    return transactions.find((transaction) => transaction.id === id);
  };

  const getRecentTransactions = (limit = 5) => {
    return transactions.slice(0, limit);
  };

  const getTransactionsByCustomerId = (customerId: string | number) => {
    return transactions.filter(
      (transaction) => transaction.customer?.id === customerId,
    );
  };

  const getTransactionSummary = (dateRange?: {
    from: Date;
    to: Date;
  }): TransactionSummary => {
    let filteredTransactions = transactions;

    if (dateRange) {
      filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate >= dateRange.from &&
          transactionDate <= (dateRange.to || new Date())
        );
      });
    }

    const totalRevenue = filteredTransactions.reduce(
      (sum, transaction) => sum + transaction.total,
      0,
    );

    const serviceCount = filteredTransactions.reduce(
      (count, transaction) =>
        count +
        transaction.items
          .filter((item) => item.type === "service")
          .reduce((itemCount, item) => itemCount + item.quantity, 0),
      0,
    );

    const productCount = filteredTransactions.reduce(
      (count, transaction) =>
        count +
        transaction.items
          .filter((item) => item.type === "product")
          .reduce((itemCount, item) => itemCount + item.quantity, 0),
      0,
    );

    return {
      totalRevenue,
      transactionCount: filteredTransactions.length,
      averageValue:
        filteredTransactions.length > 0
          ? totalRevenue / filteredTransactions.length
          : 0,
      serviceCount,
      productCount,
      paymentMethods: {
        cash: filteredTransactions.filter(
          (transaction) => transaction.paymentMethod === "cash",
        ).length,
        qris: filteredTransactions.filter(
          (transaction) => transaction.paymentMethod === "qris",
        ).length,
      },
    };
  };

  const clearTransactions = () => {
    setTransactions([]);
  };

  const value = {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionById,
    getRecentTransactions,
    getTransactionsByCustomerId,
    getTransactionSummary,
    clearTransactions,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
