import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import withToggle from "./withToggle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/models/actions/loginActions";

const Header = ({ toggleValue, setToggleValue }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static">
        <Toolbar className="header-toolbar">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className="burger-menu"
            onClick={setToggleValue("left", true)}
          >
            <i className="icon-menu" />
          </IconButton>
          <Typography variant="h6" className="header-user-name">
            Καλωσήρθες
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={toggleValue.left}
        onClose={setToggleValue("left", false)}
      >
        <ul className="admin-menu">
          <li>
            <Link to="/" className="block hover:underline back-to-game">
              Πίσω στο παιχνίδι
            </Link>
          </li>
          <li>
            <Link
              onClick={setToggleValue("left", false)}
              to="/dashboard"
              className="block hover:underline"
            >
              Αρχική
            </Link>
          </li>
          <li>
            <Link
              onClick={setToggleValue("left", false)}
              to="/dashboard/questions"
              className="block hover:underline"
            >
              Ερωτήσεις
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                dispatch(logoutUser());
                navigate("/");
              }}
              className="block hover:underline"
            >
              Εξοδος
            </button>
          </li>
        </ul>
      </Drawer>
    </>
  );
};

export default withToggle(Header);
