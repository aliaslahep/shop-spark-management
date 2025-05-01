import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Users,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  ShoppingBag,
} from "lucide-react";

export default function CustomerView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token"); 

  useEffect(() => {
    const fetchCustomer = async () => {
      try {

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/customer/show/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCustomer(response.data.customer);

      } catch (error) {
        console.error("Error fetching customer:", error);
        setCustomer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleBack = () => navigate("/customers");
  const handleEdit = () => navigate(`/customers/edit/${customer.id}`);
  const handleDelete = () => {

    axios.delete(`${import.meta.env.VITE_API_URL}/customer/delete/${customer.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      toast({
        title: "Customer Deleted",
        description: `${customer.name} has been removed.`,
      });
      navigate("/customers");
    })
    .catch((error) => {
      console.error("Delete failed:", error);
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
        <p className="text-gray-500 text-lg">Loading customer data...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Customers
        </Button>
        <Card>
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold">Customer Not Found</h2>
            <p className="text-muted-foreground mt-2">
              The requested customer could not be found.
            </p>
            <Button onClick={handleBack} className="mt-4">
              Return to Customer List
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" onClick={handleBack} className="mr-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-2xl font-bold flex items-center">
            <Users className="mr-2 h-6 w-6" /> Customer Details
          </h1>
        </div>
        <div className="flex space-x-3 gap-3">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              confirm("Are you sure you want to delete this customer?") &&
              handleDelete()
            }
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Customer Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Users size={32} />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold">{customer.name}</h2>
              <p className="text-muted-foreground">ID: {customer.id}</p>
            </div>
          </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Mail className="mr-3 h-5 w-5 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{customer.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="mr-3 h-5 w-5 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p>{customer.phone}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p>
                      {customer.address},<br />
                      {customer.city}, {customer.state} 
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Purchases</p>
              <p className="text-3xl font-bold">{customer.totalPurchases ?? 0}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="text-3xl font-bold text-primary">₹{(customer.totalSpent ?? 0).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Joined</p>
              <p>{customer.joinDate ?? "-"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Purchase</p>
              <p>{customer.lastPurchase ?? "-"}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" /> Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {customer.recentOrders?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left">Order ID</th>
                      <th className="py-2 text-left">Date</th>
                      <th className="py-2 text-left">Amount</th>
                      <th className="py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.recentOrders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-2">{order.id}</td>
                        <td className="py-2">{order.date}</td>
                        <td className="py-2">₹{order.amount.toFixed(2)}</td>
                        <td className="py-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No recent orders.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{customer.notes ?? "No notes available."}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
