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
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => navigate("/")}>X</button>
      <div className={styles.containerDashboard}>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Nome do Separador</label>
            <input type="text" id="name" {...register("name")} />
          </div>
          <button type="submit">Pesquisar</button>
        </form>

        <DatePicker
          selected={tempDataPedido}
          onChange={handleChange}
          dateFormat="dd/MM/yyyy"
          locale={ptBR}
        />
      </div>

      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>{item[0]} {item[1]}   \\\\\\    {item[2]} {item[3]} {item[4]} {item[5]} {item[6]} {item[7]} {item[8]} {item[9]}</li>
        ))}
      </ul>
    </div>
  );
};
