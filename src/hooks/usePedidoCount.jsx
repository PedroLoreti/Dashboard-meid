import { useEffect, useState } from "react";


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
