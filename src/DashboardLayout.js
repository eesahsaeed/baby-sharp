
import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Button, Box, Avatar } from "@mui/material";

import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import LogoutIcon from "@mui/icons-material/Logout";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

// ---------- Navigation ----------
const NAVIGATION = [
  { kind: "header", title: "Main" },
  { segment: "videos", title: "Videos", icon: <VideoLibraryIcon /> },
  { segment: "pictures", title: "Pictures", icon: <PhotoLibraryIcon /> }
];

// ---------- Custom Branding ----------
const BRANDING = {
  logo: (
    <Avatar
      src="/logo.png" // 🔹 Replace with your logo URL
      alt="Baby Sharp Logo"
      sx={{ width: 32, height: 32, mr: 1 }}
    />
  ),
  title: "Baby Sharp"
};


export default function DashboardLayoutBasic({ children, onLogout }) {
  return (
    <AppProvider navigation={NAVIGATION}>
      <DashboardLayout
        branding={BRANDING}
      >
        <PageContainer
          sx={{
            scrollBehavior: "smooth",
            overflowY: "auto",
            maxHeight: "calc(100vh - 64px)",
            px: { xs: 1, sm: 2, md: 3 },
            pb: 4,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={onLogout}
            >
              Logout
            </Button>
          </Box>

          {children}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
