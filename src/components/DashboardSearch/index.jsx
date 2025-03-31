import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import { format } from "date-fns";
import { useState } from "react";
import { useContext } from "react";
import { PedidoContext } from "../../providers/PedidoContext";
import { useFilterDashboard } from "../../hooks/useFilterDashboard";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";

export const DashboardSearch = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [dataPedido, setDataPedido] = useState();
  const [tempDataPedido, setTempDataPedido] = useState(null);
  const [name, setName] = useState("");
  const dataFormatada = dataPedido ? format(dataPedido, "dd/MM/yyyy") : null;
  const { pedidosList } = useContext(PedidoContext);

  const filteredData = useFilterDashboard(pedidosList, dataFormatada, name);

  console.log(filteredData);

  const onSubmit = (data) => {
    setName(data.name);
    setDataPedido(tempDataPedido);
  };

  const handleChange = (date) => {
    setTempDataPedido(date);
  };

  return (
    <div className={styles.containerSearch}>
      <h2 className={styles.titleDashboard}>Dashboard</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.containerName}>
          <label htmlFor="name">Nome do Separador:</label>
          <input type="text" id="name" {...register("name")} />
        </div>

        <div className={styles.containerDate}>
          <label htmlFor="date">Data:</label>
          <DatePicker
            selected={tempDataPedido}
            onChange={handleChange}
            dateFormat="dd/MM/yyyy"
            locale={ptBR}
            className={styles.datePicker}
          />
        </div>
        <button type="submit" className={styles.buttonSearch}>
          Pesquisar
        </button>
      </form>

      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
