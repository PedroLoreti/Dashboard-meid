import { useState, useEffect } from "react";

export const useFilterRegistro = (data, searchDate, searchName) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const trimmedQuery = searchName.trim().toUpperCase();

    const filteredResults = data
      .filter((item) => item[0].includes(searchDate))
      .filter((item) => {
        if (!trimmedQuery) return true;
        if (!isNaN(parseInt(trimmedQuery))) {
          return item.slice(2).some((pedido) => pedido.includes(trimmedQuery));
        }

        return item[1].includes(trimmedQuery);
      });

    setFilteredData(filteredResults);
  }, [data, searchDate, searchName]);

  return filteredData;
};


