
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for recent sales
const recentSales = [
  { id: "INV-001", customer: "John Doe", date: "Apr 23, 2025", amount: "$120.00", status: "Completed" },
  { id: "INV-002", customer: "Jane Smith", date: "Apr 22, 2025", amount: "$85.50", status: "Completed" },
  { id: "INV-003", customer: "Robert Johnson", date: "Apr 22, 2025", amount: "$35.25", status: "Pending" },
  { id: "INV-004", customer: "Emily Davis", date: "Apr 21, 2025", amount: "$210.75", status: "Completed" },
  { id: "INV-005", customer: "Michael Wilson", date: "Apr 20, 2025", amount: "$55.00", status: "Failed" },
];

export function RecentSales() {
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold">Recent Sales</h3>
        <p className="text-muted-foreground text-sm">Latest transactions across your store</p>
      </div>
      <ScrollArea className="h-[300px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">{sale.id}</TableCell>
                <TableCell>{sale.customer}</TableCell>
                <TableCell>{sale.date}</TableCell>
                <TableCell>{sale.amount}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      sale.status === "Completed"
                        ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                        : sale.status === "Pending"
                        ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                        : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                    }`}
                  >
                    {sale.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
