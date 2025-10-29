import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mt-12">
        <Outlet /> {/* εδώ μπαίνουν οι public σελίδες */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
