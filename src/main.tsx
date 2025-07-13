import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/home-page.tsx";
import CardInfoPage from "./pages/card-info-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },

  {
    path: "/:word",
    Component: CardInfoPage,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <App />
  </StrictMode>
);
