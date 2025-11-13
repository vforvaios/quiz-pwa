import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import withToggle from "./withToggle";
import { Link } from "react-router-dom";

const Header = ({ toggleValue, setToggleValue }: any) => {
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
        <ul>
          <Link to="/" className="block hover:underline">
            Πίσω στο παιχνίδι
          </Link>
          <Link to="/dashboard" className="block hover:underline">
            Αρχική
          </Link>
          <Link to="/dashboard/questions" className="block hover:underline">
            Ερωτήσεις
          </Link>
          <button onClick={() => {}} className="block hover:underline">
            Εξοδος
          </button>
        </ul>
      </Drawer>
    </>
  );
};

export default withToggle(Header);
