
import * as React from "react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Bell, Search, User, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function Header({ children }: { children?: React.ReactNode }) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Searching...",
        description: `You searched for "${searchQuery}"`,
      });
    }
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
  
    // Optionally, clear the user context if you're using it
    setUser(null); // Reset user state in context
    
    // Show a toast notification for logout
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  
    // Redirect to the login page
    navigate("/login");
  };
  

  return (
    <header className="bg-background border-b border-border py-3 px-4 flex items-center justify-between">
      <form onSubmit={handleSearch} className="relative hidden md:block md:w-96">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search everything..."
          className="w-full pl-9 bg-muted/40 border-border"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      
      <div className="flex items-center space-x-4">
        {children}
        
        <button 
          className="p-2 rounded-md hover:bg-accent"
          onClick={() => toast({ title: "Notifications", description: "You have no new notifications" })}
        >
          <Bell className="h-5 w-5" />
        </button>
        
         <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center focus:outline-none">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <User className="h-4 w-4" />
            </div>
            <span className="ml-2 font-medium hidden md:block">{user ? user.name : "Loading..."}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5 text-sm font-semibold">
              {user ? user.name : "Loading..."}
            </div>
            <div className="px-2 py-1 text-xs text-muted-foreground">
              {user ? user.email : "Loading..."}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  );
}
