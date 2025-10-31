import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  useTheme,
  useMediaQuery,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
//import { useStoreMenu } from "../../stores/menu";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import { useModal } from "../../stores/modalContext";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { openQCNhuomModal } = useModal();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={(theme) => ({
        backdropFilter: "blur(6px)",
        background: "#0a66c2",
        color: "#FFFFFF",
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 56, sm: 64, md: COLLAPSED },
          justifyContent: "space-between",
          px: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            color={"inherit"}
            aria-pressed={false}
            //onClick={toggleSidebar}
            sx={{ mr: { xs: 0.5, sm: 1 } }}
          >
            <MenuIcon fontSize={isMobile ? "medium" : "large"} />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              alignItems: "center",
              gap: isMobile ? 1 : 0,
            }}
          >
            <Box
              component="img"
              src={`${import.meta.env.BASE_URL}icons/logo.svg`}
              alt="Logo"
              sx={{
                width: { xs: 24, sm: 28, md: 32 },
                height: { xs: 24, sm: 28, md: 32 },
              }}
            />
            {!isMobile && (
              <Box
                component="img"
                src={`${import.meta.env.BASE_URL}icons/cowatech-text.svg`}
                alt="Logo"
                sx={{
                  height: { sm: 16, md: 20 },
                  width: "auto",
                }}
              />
            )}
            {isMobile && (
              <Typography
                variant="h6"
                sx={{ fontSize: "1rem", fontWeight: 600 }}
              >
                Gunze Demo
              </Typography>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1 },
          }}
        >
          <Button
            variant="contained"
            size={isMobile ? "small" : "medium"}
            onClick={openQCNhuomModal}
            sx={{
              backgroundColor: "white",
              color: "#0a66c2",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "#0a66c2",
              },
            }}
          >
            + Nhập
          </Button>

          <Avatar
            sx={{
              width: { xs: 28, sm: 32, md: 36 },
              height: { xs: 28, sm: 32, md: 36 },
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
