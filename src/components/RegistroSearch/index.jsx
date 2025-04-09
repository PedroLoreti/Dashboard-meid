import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import { format } from "date-fns";
import { useState } from "react";
import { useContext } from "react";
import { PedidoContext } from "../../providers/PedidoContext";
import { useFilterRegistro } from "../../hooks/useFilterRegistro";
import { useTheme } from "../../providers/ThemeContext";
import styles from "./style.module.scss";
import { IoSearch } from "react-icons/io5";
import { PedidoEndContext } from "../../providers/PedidosEnd"
import { useFilterFind } from "../../hooks/useFilterFind"

export const RegistroSearch = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isDarkMode } = useTheme()
  const [dataPedido, setDataPedido] = useState();
  const [tempDataPedido, setTempDataPedido] = useState(null);
  const [name, setName] = useState("");
  const dataFormatada = dataPedido ? format(dataPedido, "dd/MM/yyyy") : null;
  const { pedidosList } = useContext(PedidoContext);
  const { pedidosEndList} = useContext(PedidoEndContext)


  const filteredData = useFilterRegistro(pedidosList, dataFormatada, name);

  const pedidoComplete = useFilterFind(filteredData, pedidosEndList)

  
  
  const titleClass = `${isDarkMode ? "title-white" : "title-black"}`;
  const borderContainer = `${isDarkMode ? "border-container-white" : "border-container-black"}`;
  const border = `${isDarkMode ? "border-white" : "border-black"}`;

  const onSubmit = (data) => {
    setName(data.name);
    setDataPedido(tempDataPedido);
  };

  const handleChange = (date) => {
    setTempDataPedido(date);
  };

  return (
    <div className={styles.containerSearch}>
      <h2 className={styles.titleRegistro + " " + titleClass}>Registro de pedidos</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.containerName}>
          <label htmlFor="name" className={titleClass}>Nome/Pedido:</label>
          <input type="text" id="name" className="input-search" {...register("name")} placeholder="Nome ou Pedido" />
        </div>

        <div className={styles.containerDate}>
          <label htmlFor="date" className={titleClass}>Data:</label>
          <DatePicker
            selected={tempDataPedido}
            onChange={handleChange}
            dateFormat="dd/MM/yyyy"
            locale={ptBR}
            className="input-search"
            placeholderText="dd/mm/yyyy"
          />
        </div>
        <button type="submit" className={`${styles.buttonSearch}`}>
          <IoSearch className={styles.icon}/>
        </button>
      </form>

      <div className={styles.containerGrid + " " + borderContainer}>
        <div className={styles.header + " " + titleClass}>
          <div>pedido</div>
          <div>Nome do Separador</div>
          <div>Data Inicio</div>
          <div>Data Finalizado</div>
          <div>Total</div>
        </div>
        <div className={styles.body}>
          {pedidoComplete.map((item, index) => (
            <div key={index} className={styles.row + " " + titleClass + " " + border }>
              <div>{item.codigo}</div>
              <div>{item.nome}</div>
              <div>{item.dataInicio}</div>
              <div>{item.dataFinal}</div>
              <div>{item.total}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
