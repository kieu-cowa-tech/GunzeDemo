import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

export default function AuthLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default", width: "100vw" }}>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" , overflowX:"hidden"}}>
        <TopBar />
        <Container maxWidth={false} disableGutters sx={{ px: 2, py: 2, width: "100%"}}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}