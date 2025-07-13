// Layout.tsx
import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router";

const Layout = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Outlet key={location.pathname} />
    </AnimatePresence>
  );
};

export default Layout;
