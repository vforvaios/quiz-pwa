import { logoutUser } from "@/models/actions/loginActions";
import { userLoggedIn } from "@/models/selectors/loginSelectors";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const loggedUser = useSelector(userLoggedIn);
  const navigate = useNavigate();

  // ✅ Close when pressing ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // ✅ Close when clicking outside menu
  useEffect(() => {
    const handleClickAway = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickAway);
    return () => document.removeEventListener("mousedown", handleClickAway);
  }, [open]);
  return (
    <div className="fixed backdrop-blur-sm z-10 p-1 justify-between items-center h-[50px] top-[0px] w-full flex">
      <div>
        <img
          onClick={() => navigate("/")}
          src="/logo.png"
          className="max-w-[40px]"
          style={{ cursor: "pointer" }}
        />
      </div>
      <div>
        <i
          className="icon-menu text-2xl text-whitecolor"
          onClick={() => setOpen(!open)}
          style={{ cursor: "pointer" }}
        />
      </div>
      {/* ✅ Overlay (click closes menu) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-10 h-[100vh]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed top-0 right-0 bottom-0 h-[100vh] w-[250px] bg-whitecolor shadow-2xl p-6 flex flex-col gap-4 z-40"
          >
            <button
              className="self-end text-2xl"
              onClick={() => setOpen(!open)}
            >
              ✖
            </button>
            {loggedUser?.isAdmin && (
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="text-lg font-bold hover:text-redcolor"
              >
                Διαχείριση
              </Link>
            )}
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="text-lg font-bold hover:text-redcolor"
            >
              🏠 Αρχική
            </Link>
            <Link
              onClick={() => setOpen(false)}
              to="/leaderboard"
              className="text-lg font-bold hover:text-redcolor"
            >
              🏆 Βαθμολογία
            </Link>
            <Link
              onClick={() => setOpen(false)}
              to="/profile"
              className="text-lg font-bold hover:text-redcolor"
            >
              👤 Προφίλ
            </Link>

            <Link
              onClick={() => {
                setOpen(false);
                dispatch(logoutUser());
              }}
              to="/"
              className="text-lg font-bold text-redcolor"
            >
              🚪 Αποσύνδεση
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
