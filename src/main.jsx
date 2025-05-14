import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { PedidoProvider } from "./providers/PedidoContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeContext.jsx";
import { PedidoEndProvider } from "./providers/PedidosEnd.jsx"
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PedidoProvider>
      <PedidoEndProvider>
        <BrowserRouter>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </PedidoEndProvider>
    </PedidoProvider>
  </StrictMode>
);
