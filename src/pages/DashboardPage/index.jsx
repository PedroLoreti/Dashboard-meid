import React from "react";
import RevenueCard from "../../components/Dashboard/RevenueCard";
import { PedidoContext } from "../../providers/PedidoContext";
import { PedidoEndContext } from "../../providers/PedidosEnd"
import { useContext } from "react";
import { useFilterRegistro } from "../../hooks/useFilterRegistro";
import { useFilterFind } from "../../hooks/useFilterFind"
import { calcularMediaMinutos } from "../../hooks/useFilterFind"

export const DashboardPage = () => {

    const { pedidosList } = useContext(PedidoContext);
    const { pedidosEndList} = useContext(PedidoEndContext)

    const filteredData = useFilterRegistro(pedidosList, "10/04/2025");

    const pedidoComplete = useFilterFind(filteredData, pedidosEndList)


    return (
        <div>
            <h1>Dashboard</h1>
            <RevenueCard 
                title="Total Pedidos" 
                amount={`${pedidoComplete.length} pedidos`} 
            />
            <RevenueCard 
                title="Media por pedido" 
                amount={`${calcularMediaMinutos(pedidoComplete)}`} 
            />
        </div>
  );
};
