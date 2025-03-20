import { createContext, useState, useEffect } from "react";
import { api } from "../services/api";

export const PedidoContext = createContext({});

export const PedidoProvider = ({ children }) => {
  const [pedidosList, setPedidosList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPedidos = async () => {
      if (loading) return;
      setLoading(true);

      try {
        const { data } = await api.get();
        if (JSON.stringify(data.values) !== JSON.stringify(pedidosList)) {
          setPedidosList(data.values);
        }
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    getPedidos();

    const intervalId = setInterval(getPedidos, 5000);

    return () => clearInterval(intervalId);
  }, [pedidosList]);

  return (
    <PedidoContext.Provider value={{ pedidosList }}>
      {children}
    </PedidoContext.Provider>
  );
};
