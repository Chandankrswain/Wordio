// Layout.tsx

import { Outlet, useLocation } from "react-router";

const Layout = () => {
  const location = useLocation();

  return <Outlet key={location.pathname} />;
};

export default Layout;
