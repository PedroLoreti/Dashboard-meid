import { createContext, useState, useEffect } from "react";
import { apiEnd } from "../services/api";

export const PedidoEndContext = createContext({});

export const PedidoEndProvider = ({ children }) => {
  const [pedidosEndList, setPedidosEndList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getEndPedidos = async () => {
      if (loading) return;
      setLoading(true);

      try {
        const { data } = await apiEnd.get();
        if (JSON.stringify(data.values) !== JSON.stringify(pedidosEndList)) {
          setPedidosEndList(data.values);
        }
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    getEndPedidos();

    const intervalId = setInterval(getEndPedidos, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <PedidoEndContext.Provider value={{ pedidosEndList }}>
      {children}
    </PedidoEndContext.Provider>
  );
};
