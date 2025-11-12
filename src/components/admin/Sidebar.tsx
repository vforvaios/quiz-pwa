import { logoutUser } from "@/models/actions/loginActions";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

interface SideBarProps {
  sidebarOpen: boolean;
  isMobile: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const SideBar = ({ sidebarOpen, isMobile, setSidebarOpen }: SideBarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-indigo-700 text-white transform
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          lg:static lg:inset-auto lg:translate-x-0
        `}
    >
      <div className="p-6 flex items-center justify-between lg:justify-center">
        <h2 className="text-xl font-bold">Dashboard</h2>

        {/* Κουμπί κλεισίματος ΜΟΝΟ για mobile */}
        {isMobile && (
          <button
            className="text-white hover:text-gray-300"
            onClick={() => setSidebarOpen(false)}
          >
            x
          </button>
        )}
      </div>

      <nav className="space-y-2 p-4">
        <Link to="/dashboard" className="block hover:underline">
          Αρχική
        </Link>
        <Link to="/dashboard/questions" className="block hover:underline">
          Ερωτήσεις
        </Link>
        <button onClick={handleLogout} className="block hover:underline">
          Εξοδος
        </button>
      </nav>
    </aside>
  );
};

export default SideBar;
