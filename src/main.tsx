import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/home-page.tsx";
import CardInfoPage from "./pages/card-info-page.tsx";
import Layout from "./layout.tsx";
import VoiceToTextTranslate from "./pages/voice-to-text-translate.tsx";
import TextToTextTranslate from "./pages/text-to-text-translate.tsx";
import ImportToTextTranslate from "./pages/import-to-translate.tsx";
import ClickToTextTranslate from "./pages/click-to-translate.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/:word", element: <CardInfoPage /> },
      { path: "/voice-to-text-translate", element: <VoiceToTextTranslate /> },
      { path: "/click-to-text-translate", element: <ClickToTextTranslate /> },
      { path: "/import-to-text-translate", element: <ImportToTextTranslate /> },
      { path: "/text-to-text-translate", element: <TextToTextTranslate /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
