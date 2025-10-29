import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div className="min-h-screen">
      <main>
        <Outlet /> {/* εδώ μπαίνουν οι public σελίδες */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
