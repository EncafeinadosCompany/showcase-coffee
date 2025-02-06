import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/store/store.ts";
import { App } from "./App.tsx";
import { PrimeReactProvider} from 'primereact/api';
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <PrimeReactProvider>
        <App />
    </PrimeReactProvider> 
    </Provider>
  </StrictMode>
);