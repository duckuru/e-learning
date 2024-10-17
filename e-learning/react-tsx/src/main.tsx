import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider.tsx";
import router from "./router.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ContextProvider>
            <RouterProvider router={router}></RouterProvider>
        </ContextProvider>
    </StrictMode>
);
