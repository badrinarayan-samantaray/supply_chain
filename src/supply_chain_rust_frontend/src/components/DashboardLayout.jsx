import React from "react";
import { Outlet } from "react-router-dom";

// This layout simply acts as a placeholder for nested routes
// since each page now manages its own layout via <BackgroundWrapper>

const DashboardLayout = () => {
  return <Outlet />;
};

export default DashboardLayout;
