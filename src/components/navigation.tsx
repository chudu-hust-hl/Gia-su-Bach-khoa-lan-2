import { useVirtualKeyboardVisible } from "hooks";
import React, { FC, useMemo, useState, startTransition } from "react";
import { useLocation, useNavigate } from "react-router";
import { MenuItem } from "types";
import { BottomNavigation, Icon } from "zmp-ui";

const tabs: Record<string, MenuItem> = {
  "/": {
    label: "Trang chủ",
    icon: <Icon icon="zi-home" />,
  },
  "/allClasses": {
    label: "Danh sách lớp",
    icon: <Icon icon="zi-more-grid" />,
  },
  "/your-class": {
    label: "Lớp của bạn",
    icon: <Icon icon="zi-favorite-list" />,
  },
  "/profile": {
    label: "Cá nhân",
    icon: <Icon icon="zi-user" />,
  },
};

export type TabKeys = keyof typeof tabs;

export const NO_BOTTOM_NAVIGATION_PAGES = ["/start", "/formParent", "/formStudent", "/formSuccess"];

export const Navigation: FC = () => {
  const keyboardVisible = useVirtualKeyboardVisible();
  const navigate = useNavigate();
  const location = useLocation();

  const noBottomNav = useMemo(() => {
    return NO_BOTTOM_NAVIGATION_PAGES.includes(location.pathname);
  }, [location]);

  if (noBottomNav || keyboardVisible) {
    return <></>;
  }

  return (
    <BottomNavigation
      id="footer"
      activeKey={location.pathname}
      onChange={(path) => {
        startTransition(() => {
          navigate(path);
        });
      }}
      className="z-50"
    >
      {Object.keys(tabs).map((path: TabKeys) => (
        <BottomNavigation.Item
          key={path}
          label={tabs[path].label}
          icon={tabs[path].icon}
          activeIcon={tabs[path].activeIcon}
        />
      ))}
    </BottomNavigation>
  );
}; 