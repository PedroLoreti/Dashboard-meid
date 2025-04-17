import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList
} from 'recharts';
import styles from "./style.module.scss";

// O componente agora espera um "pedidos" como prop
export const BarChartExample = ({ pedidos }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const pedidosPorHora = Array(24).fill(0); // Contagem de pedidos por hora

    // Função para parsear a data/hora
    const parseHora = (dataHoraStr) => {
      const [data, hora] = dataHoraStr.split(' ');
      const [dia, mes, ano] = data.split('/').map(Number);
      const [h, m, s] = hora.split(':').map(Number);
      return new Date(ano, mes - 1, dia, h, m, s);
    };

    // Verifica se pedidos foram passados como prop e faz o agrupamento
    if (pedidos && Array.isArray(pedidos)) {
      pedidos.forEach((pedido) => {
        const dataInicio = parseHora(pedido.dataInicio); // Usa dataInicio
        const hora = dataInicio.getHours();
        pedidosPorHora[hora]++;
      });

      // Gerar dados para o gráfico (das 5:00 até 00:00)
      const graficoData = [];
      // Itera de 5 até 23 (horário final do intervalo)
      for (let i = 5; i < 24; i++) {
        graficoData.push({
          name: `${i}:00`, // Apenas a hora inicial
          Pedidos: pedidosPorHora[i],
        });
      }

      // Organizando o objeto no formato desejado para o gráfico
      setData(graficoData); // Atualiza o estado com os dados do gráfico
    }
  }, [pedidos]); // Reexecuta o efeito toda vez que pedidos muda

  return (
    <div className={styles.container}>
      <ResponsiveContainer>
        <BarChart
          data={data} // Aqui, pegamos o array com os dados agrupados por hora
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
          <XAxis dataKey="name" interval={0} angle={-90} textAnchor="end" height={100}  />
          <YAxis domain={[0, 100]} interval={0} tickCount={11}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="Pedidos" fill="#FF6347">
            <LabelList
              dataKey="Pedidos"
              position="top"
              content={({ x, y, value, width }) =>
                value > 0 ? (
                  <text
                    x={x + width / 2}
                    y={y - 5}
                    fill="#333"
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
