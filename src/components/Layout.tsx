
import * as React from "react";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { DarkModeToggle } from "./DarkModeToggle";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground transition-colors duration-100">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col">
        <Header>
          <div className="ml-auto flex items-center gap-4">
            <DarkModeToggle />
          </div>
        </Header>
        <main className={`flex-1 p-4 md:p-6 overflow-auto transition-all duration-200 ${
          sidebarOpen ? 'md:ml-0' : 'md:ml-0'
        }`}>
          {children}
        </main>
      </div>
    </div>
  );
}
