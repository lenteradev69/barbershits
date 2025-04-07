export interface Customer {
  id: string | number;
  name: string;
  phone: string;
  avatar?: string;
  visits: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: "service" | "product";
}

export interface Transaction {
  id: string;
  date: string;
  customer: Customer | null;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: "cash" | "qris";
  cashReceived?: number;
  change?: number;
}

export interface TransactionSummary {
  totalRevenue: number;
  transactionCount: number;
  averageValue: number;
  serviceCount: number;
  productCount: number;
  paymentMethods: {
    cash: number;
    qris: number;
  };
}
