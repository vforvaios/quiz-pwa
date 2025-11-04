import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blackcolor to-redcolor bg-fixed">
      <Header />
      <main className="py-16">
        <Outlet /> {/* εδώ μπαίνουν οι public σελίδες */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
