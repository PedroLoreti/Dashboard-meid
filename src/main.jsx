import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { PedidoProvider } from "./providers/PedidoContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PedidoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PedidoProvider>
  </StrictMode>
);
