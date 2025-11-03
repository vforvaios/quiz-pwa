import LogoContainer from "@/components/common/LogoContainer";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div className="relative min-h-screen flex flex-col p-4 justify-center items-center bg-gradient-to-br from-blackcolor to-redcolor">
      <LogoContainer />
      <main className="mt-[80px]">
        <Outlet /> {/* εδώ μπαίνουν οι public σελίδες */}
      </main>
    </div>
  );
}
