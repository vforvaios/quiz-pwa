import LogoContainer from "@/components/common/LogoContainer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export default function PublicLayout({ user }: any) {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blackcolor to-redcolor bg-fixed">
      {user ? <Header /> : <LogoContainer />}
      <main className={`${user ? "py-16" : "py-[90px]"}`}>
        <Outlet /> {/* εδώ μπαίνουν οι public σελίδες */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
