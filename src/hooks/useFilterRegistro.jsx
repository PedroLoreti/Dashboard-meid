import { useState, useEffect } from "react";

export const useFilterRegistro = (data, searchDate, searchName = "", filterType = "diario") => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const trimmedQuery = searchName.trim().toUpperCase();

    const filteredResults = data.filter((item) => {
      if (!searchDate) return true;
      if (!item || !item[0]) return false;

      const itemDate = new Date(item[0].split('/').reverse().join('-'));
      const searchDateObj = new Date(searchDate.split('/').reverse().join('-'));

      // Filtro por tipo (diário, semanal, mensal)
      switch (filterType) {
        case "diario":
          return item[0] === searchDate; // Comparação direta da string DD/MM/AAAA
          
        case "semanal":
          // Lógica existente para filtro semanal
          const oneWeekAfter = new Date(searchDateObj);
          oneWeekAfter.setDate(oneWeekAfter.getDate() + 7);
          return itemDate >= searchDateObj && itemDate < oneWeekAfter;
          
        case "mensal":
          // Filtro mensal corrigido
          return (
            itemDate.getMonth() === searchDateObj.getMonth() &&
            itemDate.getFullYear() === searchDateObj.getFullYear()
          );
          
        default:
          return true;
      }
    }).filter((item) => {
      // Filtro por nome ou número de pedido (mantido igual)
      if (!trimmedQuery) return true;
      if (!isNaN(parseInt(trimmedQuery))) {
        return item.slice(2).some((pedido) => pedido.includes(trimmedQuery));
      }
      return item[1].includes(trimmedQuery);
    });

    setFilteredData(filteredResults);
  }, [data, searchDate, searchName, filterType]);

  return filteredData;
};