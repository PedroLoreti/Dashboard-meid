import React, { useState } from "react";
import RevenueCard from "../../components/Dashboard/RevenueCard";
import { PedidoContext } from "../../providers/PedidoContext";
import { PedidoEndContext } from "../../providers/PedidosEnd"
import { useContext } from "react";
import { useFilterRegistro } from "../../hooks/useFilterRegistro";
import { useFilterFind } from "../../hooks/useFilterFind"
import { calcularMediaMinutos } from "../../hooks/useFilterFind"
import { pedidoMaisDemorado } from "../../hooks/useFilterFind"
import { SearchForm } from "../../components/SearchForm";
import { useTheme } from "../../providers/ThemeContext";
import { format } from "date-fns";
import { BarChartExample } from "../../components/BarCharts"
import styles from "./style.module.scss";


export const DashboardPage = () => {

    const { pedidosList } = useContext(PedidoContext);
    const { pedidosEndList} = useContext(PedidoEndContext)
    const { isDarkMode } = useTheme();

    const [name, setName] = useState("");
    const [dataPedido, setDataPedido] = useState(null);
  
    const onSubmit = (data) => {
      setName(data.name);
      setDataPedido(data.data);
    };

    const dataFormatada = dataPedido ? format(dataPedido, "dd/MM/yyyy") : null;

    const filteredData = useFilterRegistro(pedidosList, dataFormatada, name);
    const pedidoComplete = useFilterFind(filteredData, pedidosEndList)

    const maisDemorado = pedidoMaisDemorado(pedidoComplete);

    const titleClass = isDarkMode ? "title-white" : "title-black";

    return (
        <div className={`${styles.dashboardContainer} ${isDarkMode ? styles.dark : styles.light}`}>
          <h2 className={`${styles.titleDashboard} ${titleClass}`}>Dashboard</h2>
      
          <div className={styles.searchWrapper}>
            <SearchForm
              onSubmit={onSubmit}
              titleClass={titleClass}
              buttonClass={styles.buttonSearch}
              allowOrderSearch={false}
              themeClass={isDarkMode ? styles.dark : styles.light}
            />
          </div>
      
          <div className={styles.cardContainer}>
            <RevenueCard 
              title="Total Pedidos" 
              amount={`${pedidoComplete.length} pedidos`} 
            />
            <RevenueCard 
              title="Media por pedido" 
              amount={`${calcularMediaMinutos(pedidoComplete)}`} 
            />
            <RevenueCard 
              title="Pedido mais demorado" 
              amount={
                maisDemorado 
                  ? `#${maisDemorado.codigo} - ${maisDemorado.total}` 
                  : "Nenhum pedido"
              } 
            />
          </div>
      
          <BarChartExample pedidos={pedidoComplete} />
        </div>
      );
};
