// "use client";

// import * as React from "react";
// import { extendTheme } from "@mui/material/styles";
// import { AppProvider } from "@toolpad/core/AppProvider";
// import { DashboardLayout } from "@toolpad/core/DashboardLayout";
// import { PageContainer } from "@toolpad/core/PageContainer";
// import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
// import VpnKeyIcon from "@mui/icons-material/VpnKey";
// import Typography from "@mui/material/Typography";
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";

// import GalleryPage from "./GalleryPage";
// import "./App.css";

// // ---------- NAVIGATION ----------
// const NAVIGATION = [
//   { kind: "header", title: "Main Items" },
//   { segment: "videos", title: "Videos", icon: <VideoLibraryIcon /> },
//   { segment: "credentials", title: "Credentials", icon: <VpnKeyIcon /> },
// ];

// // ---------- THEME ----------
// const demoTheme = extendTheme({
//   colorSchemes: { light: true, dark: true },
//   colorSchemeSelector: "class",
//   typography: { fontFamily: "Poppins, sans-serif" },
// });

// // ---------- Sample Data ----------
// const videos = [
//     { name: "madam 6 teeths", src: "/videos/VID-20250517-WA0005.mp4" },
//     { name: "Muhammed jumping up and down", src: "/videos/VID-20250517-WA0007.mp4" },
//     { name: "Zara {tata} & flipping finger finger", src: "/videos/VID-20250522-WA0013.mp4" },
//     { name: "Zara in hijab", src: "/videos/VID-20250522-WA0015.mp4" },
//     { name: "Zara birthday with balloon", src: "/videos/VID-20250522-WA0016.mp4" },
//     { name: "Zara {tata} with kitso", src: "/videos/VID-20250522-WA0022.mp4" },
//     { name: "Zara ana kitso", src: "/videos/VID-20250522-WA0023.mp4" },
//     { name: "Zara and muhammed saying hi", src: "/videos/VID-20250523-WA0001.mp4" },
//     { name: "Zara remove your diaper", src: "/videos/VID-20250524-WA0000.mp4" },
//     { name: "Zara disturbing", src: "/videos/VID-20250525-WA0002.mp4" },
//     { name: "Zara water bottle battle", src: "/videos/VID-20250530-WA0003.mp4" },
//     { name: "Zara chewing charger", src: "/videos/VID-20250531-WA0000.mp4" },
//     { name: "Zara disturbing muhammed", src: "/videos/VID-20250603-WA0002.mp4" },
//     { name: "Zara being cute", src: "/videos/VID-20250608-WA0005.mp4" },
//     { name: "Zara sweet battle", src: "/videos/VID-20250609-WA0038.mp4" },
//     { name: "madam 6 teeth part 2", src: "/videos/VID-20250610-WA0014.mp4" },
//     { name: "Zara pillow fight", src: "/videos/VID-20250613-WA0009.mp4" },
//     { name: "madam 8 teeth debut", src: "/videos/VID-20250707-WA0000.mp4" },
//     { name: "madam 8 teeth part 1", src: "/videos/VID-20250710-WA0004.mp4" },
//     { name: "madam 8 teeth part 2", src: "/videos/VID-20250714-WA0004.mp4" },
//     { name: "madam 8 teeth part 3", src: "/videos/VID-20250719-WA0016.mp4" },
//     { name: "madam 8 teeth part 4 (being damé'ed)", src: "/videos/VID-20250719-WA0017.mp4" },
//     { name: "madam 8 teeth part 5 (Taaaaaa edition)", src: "/videos/VID-20250725-WA0001.mp4" },
//     { name: "madam 8 teeth part 6", src: "/videos/VID-20250804-WA0005.mp4" },
//     { name: "madam 8 teeth part 6 (royalty wake up)", src: "/videos/VID-20250807-WA0004.mp4" },
//     { name: "madam 8 teeth part 6 (qiba edition)", src: "/videos/VID-20250808-WA0000.mp4" },
//     { name: "madam more teeth debut", src: "/videos/VID-20250828-WA0001.mp4" },
//     { name: "Zara nicki minaj edition", src: "/videos/VID-20250828-WA0002.mp4" },
//     { name: "Zara technologiya", src: "/videos/VID-20250831-WA0000.mp4" },
//     { name: "Zara nicki minaj edition ft. muhammed", src: "/videos/VID-20250905-WA0000.mp4" },
//     { name: "jika independence day", src: "/videos/VID-20250908-WA0000.mp4" },
//     { name: "madam more teeths part 1", src: "/videos/VID-20251006-WA0002.mp4" },
//     { name: "The wicked laugh", src: "/videos/VID-20251014-WA0000.mp4" },
//   ];

// const credentials = [
//     { name: "AWS Certificate", src: "/credentials/bsc certificate.jpeg" },
//     { name: "Google Cloud", src: "/credentials/indigene.jpg" },
//     { name: "Microsoft Azure", src: "/credentials/azure.jpg" },
//   ]

// // ---------- PAGE WRAPPER WITH ANIMATIONS ----------
// function AnimatedPageContainer({ children }) {
//   const location = useLocation();

//   return (
//     <PageContainer
//       sx={{
//         scrollBehavior: "smooth",
//         overflowY: "auto",
//         maxHeight: "calc(100vh - 64px)",
//         px: { xs: 1, sm: 2, md: 3 },
//         pb: 4,
//       }}
//     >
//       <Typography
//         variant="h5"
//         gutterBottom
//         fontWeight={700}
//         sx={{ mb: 3, textAlign: "center" }}
//       >
//         Downloadable Contents
//       </Typography>

//       <AnimatePresence mode="wait">
//         <motion.div
//           key={location.pathname}
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -30 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//         >
//           {children}
//         </motion.div>
//       </AnimatePresence>
//     </PageContainer>
//   );
// }

// // ---------- LAYOUT WITH ROUTER ----------
// function DashboardRoutes() {
//   return (
//     <AnimatedPageContainer>
//       <Routes>
//         <Route path="/" element={<Navigate to="/videos" replace />} />
//         <Route path="/videos" element={<GalleryPage items={videos} />} />
//         <Route path="/credentials" element={<GalleryPage items={credentials} />} />
//       </Routes>
//     </AnimatedPageContainer>
//   );
// }

// // ---------- MAIN APP ----------
// export default function App() {
//   return (
//     <BrowserRouter>
//       <AppProvider navigation={NAVIGATION} theme={demoTheme}>
//         <DashboardLayout>
//           <DashboardRoutes />
//         </DashboardLayout>
//       </AppProvider>
//     </BrowserRouter>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import LoginPage from "./LoginPage";
import VideosPage from "./VideosPage";
import CredentialsPage from "./CredentialsPage";
import PicturesPage from "./PicturesPage";

// Mock data
const videos = [
  { name: "madam 6 teeths", src: "/videos/VID-20250517-WA0005.mp4" },
  { name: "Muhammed jumping up and down", src: "/videos/VID-20250517-WA0007.mp4" },
  { name: "Zara {tata} & flicking finger finger", src: "/videos/VID-20250522-WA0013.mp4" },
  { name: "Zara in hijab", src: "/videos/VID-20250522-WA0015.mp4" },
  { name: "Zara birthday with balloon", src: "/videos/VID-20250522-WA0016.mp4" },
  { name: "Zara {tata} with kitso", src: "/videos/VID-20250522-WA0022.mp4" },
  { name: "Zara ana kitso", src: "/videos/VID-20250522-WA0023.mp4" },
  { name: "Zara and muhammed saying hi", src: "/videos/VID-20250523-WA0001.mp4" },
  { name: "Zara remove your diaper", src: "/videos/VID-20250524-WA0000.mp4" },
  { name: "Zara disturbing", src: "/videos/VID-20250525-WA0002.mp4" },
  { name: "Zara water bottle battle", src: "/videos/VID-20250530-WA0003.mp4" },
  { name: "Zara chewing charger", src: "/videos/VID-20250531-WA0000.mp4" },
  { name: "Zara disturbing muhammed", src: "/videos/VID-20250603-WA0002.mp4" },
  { name: "Zara being cute", src: "/videos/VID-20250608-WA0005.mp4" },
  { name: "Zara sweet battle", src: "/videos/VID-20250609-WA0038.mp4" },
  { name: "madam 6 teeth part 2", src: "/videos/VID-20250610-WA0014.mp4" },
  { name: "Zara pillow fight", src: "/videos/VID-20250613-WA0009.mp4" },
  { name: "madam 8 teeth debut", src: "/videos/VID-20250707-WA0000.mp4" },
  { name: "madam 8 teeth part 1", src: "/videos/VID-20250710-WA0004.mp4" },
  { name: "madam 8 teeth part 2", src: "/videos/VID-20250714-WA0004.mp4" },
  { name: "madam 8 teeth part 3", src: "/videos/VID-20250719-WA0016.mp4" },
  { name: "madam 8 teeth part 4 (being damé'ed)", src: "/videos/VID-20250719-WA0017.mp4" },
  { name: "madam 8 teeth part 5 (Taaaaaa edition)", src: "/videos/VID-20250725-WA0001.mp4" },
  { name: "madam 8 teeth part 6", src: "/videos/VID-20250804-WA0005.mp4" },
  { name: "madam 8 teeth part 6 (royalty wake up)", src: "/videos/VID-20250807-WA0004.mp4" },
  { name: "madam 8 teeth part 6 (qiba edition)", src: "/videos/VID-20250808-WA0000.mp4" },
  { name: "madam more teeth debut", src: "/videos/VID-20250828-WA0001.mp4" },
  { name: "Zara nicki minaj edition", src: "/videos/VID-20250828-WA0002.mp4" },
  { name: "Zara technologiya", src: "/videos/VID-20250831-WA0000.mp4" },
  { name: "Zara nicki minaj edition ft. muhammed", src: "/videos/VID-20250905-WA0000.mp4" },
  { name: "jika independence day", src: "/videos/VID-20250908-WA0000.mp4" },
  { name: "madam more teeths part 1", src: "/videos/VID-20251006-WA0002.mp4" },
  { name: "The wicked laugh", src: "/videos/VID-20251014-WA0000.mp4" },
  { name: "Zara nicki minaj part 1 ft. muhammed", src: "/videos/VID-20250720-WA0023.mp4" }
];

const credentials = [
  { name: "Bsc Certificate", src: "/credentials/bsc certificate.jpeg" },
  { name: "Indigene", src: "/credentials/indigene.jpg" },
  { name: "Résumé", src: "/credentials/isah's resume.pdf" },
  { name: "Nysc certificate", src: "/credentials/nysc certificate.png" },
  { name: "Primary school certificate", src: "/credentials/primary certificate.jpeg" },
  { name: "Testimonial", src: "/credentials/testimonial.jpeg" },
  { name: "WAEC Certificate", src: "/credentials/waec.jpeg" },
  { name: "PREMIUM NIN", src: "/credentials/Premium_SAIDU.pdf" },
  { name: "Improved NIN", src: "/credentials/improved_SAIDU.pdf" },
]

const pictures = [
  { name: "Douche's", src: "/pictures/IMG-20250516-WA0005.jpg" },
  { name: "Zara birthday 1", src: "/pictures/IMG-20250522-WA0017.jpg" },
  { name: "Zara birthday 1_2", src: "/pictures/IMG-20250522-WA0018.jpg" },
  { name: "Zara birthday 1 happy", src: "/pictures/IMG-20250522-WA0019.jpg" },
  { name: "Zara birthday 1 with muhammed", src: "/pictures/IMG-20250522-WA0020.jpg" },
  { name: "sleeping beauty", src: "/pictures/IMG-20250523-WA0000.jpg" },
  { name: "Smiling beauty", src: "/pictures/IMG-20250603-WA0001.jpg" },
  { name: "Coneheads", src: "/pictures/IMG-20250608-WA0000.jpg" },
  { name: "Small mommy", src: "/pictures/IMG-20251006-WA0004.jpg" },
  { name: "Madam CEO", src: "/pictures/IMG-20251006-WA0005.jpg" },
  { name: "K.S kofar bai", src: "/pictures/IMG-20251006-WA0006.jpg" },
  { name: "Kwalliya ta biya kudin sabulu", src: "/pictures/IMG-20251006-WA0007.jpg" },
]

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("user") ? true : false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsAuthenticated(true);
  }, []);

  const handleLogin = (username, password) => {
    if (username && password) {
      localStorage.setItem("user", JSON.stringify({ username, password }));
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <DashboardLayout onLogout={handleLogout}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/videos" replace />}
          />
          <Route
            path="/videos"
            element={<VideosPage videos={videos} />}
          />
          <Route
            path="/credentials"
            element={<CredentialsPage credentials={credentials} />}
          />
          <Route
            path="/pictures"
            element={<PicturesPage pictures={pictures} />}
          />
          <Route path="*" element={<Navigate to="/videos" replace />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

