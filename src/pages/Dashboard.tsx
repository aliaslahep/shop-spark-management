
import * as React from "react";
import { ShoppingCart, Package, Users, TrendingUp, Plus, UserPlus } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentSales } from "@/components/dashboard/RecentSales";
import { LowStockItems } from "@/components/dashboard/LowStockItems";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to ShopSpark Management</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => navigate('/inventory/add')} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
          <Button onClick={() => navigate('/customers/add')} variant="outline" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Sales" 
          value="₹42,580" 
          change="+12.5% from last month" 
          trend="up"
          icon={<ShoppingCart className="h-5 w-5 text-primary" />} 
        />
        <StatCard 
          title="Products" 
          value="1,258" 
          change="+3 new today" 
          trend="up"
          icon={<Package className="h-5 w-5 text-primary" />} 
        />
        <StatCard 
          title="Customers" 
          value="642" 
          change="+8% from last month" 
          trend="up"
          icon={<Users className="h-5 w-5 text-primary" />} 
        />
        <StatCard 
          title="Avg. Order Value" 
          value="₹368" 
          change="-4% from last month" 
          trend="down"
          icon={<TrendingUp className="h-5 w-5 text-primary" />} 
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <RecentSales />
        <LowStockItems />
      </div>
    </div>
  );
}
