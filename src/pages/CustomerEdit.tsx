import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ArrowLeft,
  Users,
  Save
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import axios from 'axios';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }).nullable(),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  address: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  notes: z.string().optional(),
});

type CustomerFormValues = z.infer<typeof formSchema>;

const CustomerEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (!id) {
      toast({
        title: "Error",
        description: "Customer ID is required.",
        variant: "destructive"
      });
      navigate('/customers'); // Redirect to customer list
      return;
    }

    const fetchCustomerData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/customer/show/${id}`, { // Use your route here
          headers: {
            Authorization: `Bearer ${token}`, // Include token if needed
            'Content-Type': 'application/json'
          }
        });

        const customerData = response.data.customer;

        if (customerData) {
          form.reset({
            name: customerData.name,
            email: customerData.email,
            phone: customerData.phone,
            address: customerData.address,
            city: customerData.city,
            state: customerData.state,
            zipcode: customerData.zipcode,
            notes: customerData.notes || "",
          });
        } else {
          toast({
            title: "Error",
            description: "Customer not found.",
            variant: "destructive"
          });
          navigate('/customers');
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to fetch customer data.",
          variant: "destructive"
        });
        navigate('/customers');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [id, form, navigate, toast, token]);

  const onSubmit = async (data: CustomerFormValues) => {
    try {
      if (!id) {
        toast({
          title: "Error",
          description: "Customer ID is required for updating.",
          variant: "destructive"
        });
        navigate('/customers');
        return;
      }
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/customer/update/${id}`, data, { // Use your route here
        headers: {
          Authorization: `Bearer ${token}`, // Include token if needed
          'Content-Type': 'application/json'
        }
      });
      toast({
        title: "Success",
        description: response.data.message || "Customer updated successfully.",
      });
      navigate(`/customers/view/${id}`); // Go to view page
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update customer.",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    navigate(`/customers/view/${id}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
        <p className="text-gray-500 text-lg">Loading customer data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" onClick={handleCancel} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Customer
          </Button>
          <h1 className="text-2xl font-bold flex items-center">
            <Users className="mr-2 h-6 w-6" /> Edit Customer
          </h1>
          <p className="text-muted-foreground">Update customer information</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
          <CardDescription>Update the customer's personal and contact information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "name", label: "Full Name", placeholder: "John Doe" },
                  { name: "email", label: "Email", placeholder: "john@example.com", type: "email" },
                  { name: "phone", label: "Phone Number", placeholder: "9876543210" },
                  { name: "address", label: "Address", placeholder: "123 Main St" },
                  { name: "city", label: "City", placeholder: "Mumbai" },
                  { name: "state", label: "State", placeholder: "Maharashtra" },
                ].map(({ name, label, placeholder, type = "text" }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name as keyof CustomerFormValues}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          <Input type={type} placeholder={placeholder} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add any additional notes about this customer"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default CustomerEdit;

