import React, { FC } from "react";
import { Route, Routes } from "react-router";
import { Box } from "zmp-ui";
import { Navigation } from "./navigation";
import HomePage from "pages/home";
import CategoryPage from "pages/category";
import CartPage from "pages/cart";
import ProfilePage from "pages/profile/index";
import SearchPage from "pages/search";
import CheckoutResultPage from "pages/result";
import { getSystemInfo } from "zmp-sdk";
import { ScrollRestoration } from "./scroll-restoration";
import { useHandlePayment } from "hooks";
import { TutorListPage } from "pages/theme/tutor-list";
import AvailableClassPage from "pages/theme";
import ClassDetailPage from "pages/theme/class-detail";
import AppInfoPage from "pages/home/app-info";
import StandardInfoPage from "pages/home/standard";
import DownloadAppPage from "pages/home/download-intro";
import FormParrent from "pages/form/form-parent";
import FormStudent from "pages/form/form-student";

if (import.meta.env.DEV) {
  document.body.style.setProperty("--zaui-safe-area-inset-top", "24px");
} else if (getSystemInfo().platform === "android") {
  const statusBarHeight =
    window.ZaloJavaScriptInterface?.getStatusBarHeight() ?? 0;
  const androidSafeTop = Math.round(statusBarHeight / window.devicePixelRatio);
  document.body.style.setProperty(
    "--zaui-safe-area-inset-top",
    `${androidSafeTop}px`
  );
}

export const Layout: FC = () => {
  useHandlePayment();

  return (
    <Box flex flexDirection="column" className="h-screen">
      <ScrollRestoration />
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/app-info" element={<AppInfoPage />}></Route>
          <Route path="/app-standards" element={<StandardInfoPage />}></Route>
          <Route path="/download-app" element={<DownloadAppPage />}></Route>
          <Route path="/formParent" element={<FormParrent />}></Route>
          <Route path="/formStudent" element={<FormStudent />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/allclasses" element={<AvailableClassPage/>}></Route>
          <Route path="/class/:id" element={<ClassDetailPage />}></Route>
          <Route path="/category" element={<CategoryPage />}></Route>
          <Route path="/tutor-list" element={<TutorListPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/result" element={<CheckoutResultPage />}></Route>
        </Routes>
      </Box>
      <Navigation />
    </Box>
  );
};
