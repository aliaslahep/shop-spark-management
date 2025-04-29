
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  ShoppingCart, 
  Package, 
  Users, 
  UserCheck, 
  BarChart2, 
  Settings,
  Menu, 
  X 
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: "Dashboard", icon: Home, path: "/" },
    { label: "Billing", icon: ShoppingCart, path: "/billing" },
    { label: "Inventory", icon: Package, path: "/inventory" },
    { label: "Customers", icon: Users, path: "/customers" },
    { label: "Staff", icon: UserCheck, path: "/staff" },
    { label: "Reports", icon: BarChart2, path: "/reports" },
    { label: "Settings", icon: Settings, path: "/settings" },
  ];

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <button 
        className="fixed bottom-4 right-4 md:hidden z-50 bg-primary p-3 rounded-full shadow-lg text-primary-foreground"
        onClick={toggleMobile}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div 
        className={`bg-background text-foreground border-r border-border
          fixed inset-0 z-40 md:relative md:translate-x-0
          transition-all duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isOpen ? 'md:w-64' : 'md:w-20'}`}
      >
        <div className="p-4 flex items-center justify-between">
          {isOpen ? (
            <span className="text-xl font-bold">ShopSpark</span>
          ) : (
            <span className="text-xl font-bold mx-auto">SS</span>
          )}
          <button 
            className="hidden md:block"
            onClick={onToggle}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="mt-8 px-2">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center p-3 rounded-md transition-colors
                    ${location.pathname === link.path
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <link.icon className="h-5 w-5" />
                  {isOpen && <span className="ml-3">{link.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
