import { AppBar, Toolbar, IconButton, Box, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
//import { useStoreMenu } from "../../stores/menu";
import type { SvgIconProps } from "@mui/material/SvgIcon";
export type NavItem = {
  to?: string;
  icon: React.ComponentType<SvgIconProps>;
  labelKey: string;
  children?: NavItem[];
};

export const DRAWER_WIDTH = 240;
export const COLLAPSED = 72;
export default function TopBar() {
//const { sidebarOpen, toggleSidebar } = useStoreMenu();
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={(theme) => ({
        backdropFilter: "blur(6px)",
        background:
          theme.palette.mode === "dark"
            ? "rgba(10, 14, 23, 0.7)"
            : "#0a66c2",
        color:"#FFFFFF",
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Toolbar sx={{ minHeight: COLLAPSED, justifyContent: "space-between", }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton 
            edge="start"
            color={"inherit"}
            aria-pressed={false}
            //onClick={toggleSidebar}
            sx={{ mr: 1 }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>

          <Box sx={{ display: "flex", flexDirection:"column", alignItems: "center" }}>
            <Box
              component="img"
              src={`${import.meta.env.BASE_URL}icons/logo.svg`}
              alt="Logo"
              sx={{ width: 32, height: 32 }}
            />
            <Box
              component="img"
              src={`${import.meta.env.BASE_URL}icons/cowatech-text.svg`}
              alt="Logo"
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar></Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
