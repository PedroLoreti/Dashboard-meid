import { useEffect, useState } from "react";

const usePedidoCount = (data, filterDate) => {
  const [pedidoCount, setPedidoCount] = useState([]);

  useEffect(() => {
    if (!Array.isArray(data)) return;

    const count = {};

    data.forEach((item) => {
      const rawDate = item[0]; // ex: "28/05/2025 14:17:08"
      const nome = item[1];
      const numPedidos = item.length - 2;

      if (!rawDate) return;

      const [datePart] = rawDate.split(" "); // "28/05/2025"
      const [dia, mes, ano] = datePart.split("/");
      const formattedDate = `${ano}-${mes}-${dia}`; // 2025-05-28
      const formattedMonth = `${ano}-${mes}`; // 2025-05

      let incluir = false;

      if (!filterDate) {
        incluir = true;
      } else if (typeof filterDate === "string" && filterDate.length === 10) {
        // Dia
        incluir = formattedDate === filterDate;
      } else if (typeof filterDate === "string" && filterDate.length === 7) {
        // Mês
        incluir = formattedMonth === filterDate;
      } else if (
        typeof filterDate === "object" &&
        filterDate.start &&
        filterDate.end
      ) {
        // Semana
        const dataItem = new Date(`${formattedDate}T00:00:00`);
        const dataStart = new Date(`${filterDate.start}T00:00:00`);
        const dataEnd = new Date(`${filterDate.end}T23:59:59`);

        incluir = dataItem >= dataStart && dataItem <= dataEnd;
      }

      if (incluir) {
        count[nome] = (count[nome] || 0) + numPedidos;
      }
    });

    const sortedArray = Object.entries(count)
      .map(([nome, totalPedidos]) => ({ nome, totalPedidos }))
      .sort((a, b) => b.totalPedidos - a.totalPedidos);

    setPedidoCount(sortedArray);
  }, [data, filterDate]);

  return pedidoCount;
};

export default usePedidoCount;
