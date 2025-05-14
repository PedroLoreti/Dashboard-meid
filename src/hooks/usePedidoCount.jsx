import { useEffect, useState } from "react";
import { PedidoEndContext } from "../providers/PedidosEnd";
import { useContext } from "react";

const usePedidoCount = (data, filterDate) => {
  const [pedidoCount, setPedidoCount] = useState({});

  useEffect(() => {
    const countPedidos = () => {
      const count = {};

      if (!Array.isArray(data)) return;

      data.forEach((item) => {
        const pedidoDate = item[0];
        const [datePart] = pedidoDate.split(" ");

        const nome = item[1];
        const numPedidos = item.length - 2;

        if (datePart === filterDate) {
          if (count[nome]) {
            count[nome] += numPedidos;
          } else {
            count[nome] = numPedidos;
          }
        }
      });

      setPedidoCount(count);
    };

    countPedidos();
  }, [data, filterDate]);

  return pedidoCount;
};

export default usePedidoCount;

export const useContagemPedidosMes = (mes) => {
  const { pedidosEndList } = useContext(PedidoEndContext);
  const [contagem, setContagem] = useState({});

  useEffect(() => {
    if (!pedidosEndList || pedidosEndList.length === 0) return;

    const pedidosPorFuncionario = pedidosEndList.reduce((acc, pedido) => {
      const dataFinal = new Date(pedido.dataFinal);
      const mesPedido = dataFinal.getMonth() + 1;
      const nomeFuncionario = pedido.nome;

      if (mesPedido === mes) {
        if (!acc[nomeFuncionario]) {
          acc[nomeFuncionario] = 0;
        }
        acc[nomeFuncionario] += 1;
      }

      return acc;
    }, {});

    setContagem(pedidosPorFuncionario);
  }, [pedidosEndList, mes]);

  return { contagem };
};
