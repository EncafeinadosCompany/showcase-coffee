import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/store/store.ts";
import { App } from "./App.tsx";
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
       <Toaster position="top-right" reverseOrder={false}/>
       <App />
    </Provider>
  </StrictMode>
);