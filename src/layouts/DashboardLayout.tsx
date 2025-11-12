import Header from "@/components/admin/Header";
import SideBar from "@/components/admin/Sidebar";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 🔹 Ελέγχουμε το μέγεθος της οθόνης
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024; // Tailwind breakpoint lg = 1024px
      setIsMobile(mobile);
      setSidebarOpen(!mobile); // αν είναι desktop → ανοιχτό, αν mobile → κλειστό
    };

    handleResize(); // έλεγχος στο mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 🔹 Sidebar */}
      <SideBar
        sidebarOpen={sidebarOpen}
        isMobile={isMobile}
        setSidebarOpen={setSidebarOpen}
      />

      {/* 🔹 Overlay για mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col">
        <Header isMobile={isMobile} setSidebarOpen={setSidebarOpen} />

        {/* 🔹 Κύριο περιεχόμενο */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
