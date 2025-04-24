import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList
} from 'recharts';
import styles from "./style.module.scss";

export const BarChartExample = ({ pedidos, theme = "light" }) => {
  const [data, setData] = useState([]);

  // Define cor com base no tema
  const textColor = theme === "dark" ? "#FFFFFF" : "#000000";
  const tooltipBg = theme === "dark" ? "#1f1f1f" : "#f9f9f9";

  useEffect(() => {
    const pedidosPorHora = Array(24).fill(0);
    const parseHora = (dataHoraStr) => {
      const [data, hora] = dataHoraStr.split(' ');
      const [dia, mes, ano] = data.split('/').map(Number);
      const [h, m, s] = hora.split(':').map(Number);
      return new Date(ano, mes - 1, dia, h, m, s);
    };

    if (pedidos && Array.isArray(pedidos)) {
      pedidos.forEach((pedido) => {
        const dataInicio = parseHora(pedido.dataInicio);
        const hora = dataInicio.getHours();
        pedidosPorHora[hora]++;
      });

      const graficoData = [];
      for (let i = 5; i < 24; i++) {
        graficoData.push({
          name: `${i}:00`,
          Pedidos: pedidosPorHora[i],
        });
      }

      setData(graficoData);
    }
  }, [pedidos]);

  return (
    <div className={styles.container}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 30, right: 30, left: -15, bottom: 0 }} >
          
          <CartesianGrid stroke="none" />

          <XAxis
            dataKey="name"
            interval={0}
            angle={-90}
            textAnchor="end"
            height={80}
            stroke={textColor}
            tick={{ fill: textColor }}
          />

          <YAxis
            domain={[0, 150]}
            interval={0}
            tickCount={10}
            stroke={textColor}
            tick={{ fill: textColor }}
          />

          <Tooltip
            contentStyle={{ backgroundColor: tooltipBg, color: textColor, border: "none" }}
            labelStyle={{ color: textColor }}
            itemStyle={{ color: textColor }}
          />

          <Legend wrapperStyle={{ color: textColor }} />

          <Bar dataKey="Pedidos" fill="#FF6347">
            <LabelList
              dataKey="Pedidos"
              position="top"
              content={({ x, y, value, width }) =>
                value > 0 ? (
                  <text
                    x={x + width / 2}
                    y={y - 5}
                    fill={textColor}
                    textAnchor="middle"
                    fontSize={12}
                  >
                    {value}
                  </text>
                ) : null
              }
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
