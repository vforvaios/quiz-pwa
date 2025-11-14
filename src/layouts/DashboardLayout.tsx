import { useState } from "react";
import Header from "@/components/admin/Header";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      <Header open={open} toggleDrawer={toggleDrawer} />
      {/* 🔹 Κύριο περιεχόμενο */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          transition: "margin 0.3s",
          marginLeft: "0px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
