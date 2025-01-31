import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
// import { App } from "./App.tsx";
import Products from "./pages/products/products.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Products />
  </StrictMode>
);
