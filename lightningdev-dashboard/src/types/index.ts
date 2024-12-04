export type Plan = {
    name: string;
    bandwidth: number; // in GB
    price: number; // in dollars
    duration: string; // e.g., "3 Months"
    threads: string; // e.g., "Unlimited"
  };
  