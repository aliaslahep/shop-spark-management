
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: ReactNode;
  trend?: "up" | "down" | "neutral";
}

export function StatCard({ title, value, change, icon, trend = "neutral" }: StatCardProps) {
  return (
    <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="p-2 rounded-lg bg-muted">{icon}</div>
      </div>
      <div className="mt-3">
        <h3 className="text-2xl font-semibold">{value}</h3>
        {change && (
          <div className="mt-1 flex items-center">
            <span 
              className={`text-xs font-medium ${
                trend === "up" 
                  ? "text-green-600 dark:text-green-400" 
                  : trend === "down" 
                  ? "text-red-600 dark:text-red-400" 
                  : "text-muted-foreground"
              }`}
            >
              {change}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
