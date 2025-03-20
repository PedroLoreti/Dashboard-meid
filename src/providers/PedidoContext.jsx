import { createContext } from "react";

export const PedidoContext = createContext({});

export const PedidoProvider = (children) => {
    return (
        <PedidoContext.Provider value={{ }}>
            {children}
        </PedidoContext.Provider>
    )
}
