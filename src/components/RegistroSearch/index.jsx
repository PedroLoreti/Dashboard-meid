import { useState, useContext } from "react";
import { format } from "date-fns";
import { SearchForm } from "../SearchForm/index";
import { PedidoContext } from "../../providers/PedidoContext";
import { PedidoEndContext } from "../../providers/PedidosEnd";
import { useFilterRegistro } from "../../hooks/useFilterRegistro";
import { useFilterFind } from "../../hooks/useFilterFind";
import { useTheme } from "../../providers/ThemeContext";

import styles from "./style.module.scss";

export const RegistroSearch = () => {
  const { pedidosList } = useContext(PedidoContext);
  const { pedidosEndList } = useContext(PedidoEndContext);
  const { isDarkMode } = useTheme();

  const [name, setName] = useState("");
  const [dataPedido, setDataPedido] = useState(null);

  const onSubmit = (data) => {
    setName(data.name);
    setDataPedido(data.data);
  };

  const dataFormatada = dataPedido ? format(dataPedido, "dd/MM/yyyy") : null;
  const filteredData = useFilterRegistro(pedidosList, dataFormatada, name);
  const pedidoComplete = useFilterFind(filteredData, pedidosEndList);

  const titleClass = isDarkMode ? "title-white" : "title-black";
  const borderContainer = isDarkMode
    ? "border-container-white"
    : "border-container-black";
  const border = isDarkMode ? "border-white" : "border-black";

  return (
    <div className={styles.containerSearch}>
      <h2 className={styles.titleRegistro + " " + titleClass}>
        Registro de pedidos
      </h2>

      <SearchForm
        onSubmit={onSubmit}
        titleClass={titleClass}
        buttonClass={styles.buttonSearch}
      />

      <div className={styles.count}>
        <i className={`fa fa-list ${styles.countIcon}`} />{" "}
        {/* Um ícone de lista para visualmente indicar a quantidade */}
        {"Count: " + pedidoComplete.length}
      </div>

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
            <div
              key={index}
              className={styles.row + " " + titleClass + " " + border}
            >
              <div>{item.codigo}</div>
              <div>{item.nome}</div>
              <div>{item.dataInicio}</div>
              <div>{item.dataFinal}</div>
              <div>{item.total}</div>
            </div>
          ))}
        </div>
      </div>
      {pedidoComplete.length === 0 && (
        <div className={styles.empty}>
          <i className={`fa fa-exclamation-circle ${styles.emptyIcon}`} />{" "}
          {/* Ícone de alerta */}
          Nenhum pedido encontrado
        </div>
      )}
    </div>
  );
};
