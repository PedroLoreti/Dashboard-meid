import { useContext, useState } from "react";
import { PedidoContext } from "../../providers/PedidoContext";
import usePedidoCount from "../../hooks/usePedidoCount";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export const Ranking = () => {
  const { pedidosList } = useContext(PedidoContext);
  const [dataPedido, setDataPedido] = useState(null);
  const dataFormatada = dataPedido ? format(dataPedido, "dd/MM/yyyy") : null;
  console.log(dataFormatada);

  const pedidoCount = usePedidoCount(pedidosList, dataFormatada);

  const pedidoSorted = Object.entries(pedidoCount).sort((a, b) => b[1] - a[1]);
  console.log(pedidoSorted);

  const handleChange = (date) => {
    setDataPedido(date);
  };

  return (
    <div>
      <DatePicker
        selected={dataPedido}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        locale={ptBR}
      />
      <ul>
        {pedidoSorted.map((item, index) => (
          <li key={index}>
            {item[0]}: {item[1]}
          </li>
        ))}
      </ul>
    </div>
  );
};
