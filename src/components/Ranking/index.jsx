import { useContext, useState } from "react";
import { PedidoEndContext } from "../../providers/PedidosEnd";
import { PedidoContext } from "../../providers/PedidoContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { RankingCard } from "./RankingCard";
import styles from "./style.module.scss";
import { useTheme } from "../../providers/ThemeContext";
import { useFilterRegistro } from "../../hooks/useFilterRegistro";
import { useFilterFind } from "../../hooks/useFilterFind";

export const Ranking = () => {
  const { isDarkMode } = useTheme();
  const { pedidosList } = useContext(PedidoContext);
  const { pedidosEndList } = useContext(PedidoEndContext);

  const [dataDia, setDataDia] = useState(null);
  const [dataMes, setDataMes] = useState(null);

  let dataFormatada = null;
  if (dataDia) {
    dataFormatada = format(dataDia, "dd/MM/yyyy"); // usar esse formato para compatibilidade com seu filtro
  } else if (dataMes) {
    dataFormatada = format(dataMes, "MM/yyyy");
  }

  // pega os pedidos filtrados por data
  const pedidosFiltrados = useFilterRegistro(pedidosList, dataFormatada, "");

  // une pedidos iniciados com finalizados
  const pedidosCompletos = useFilterFind(pedidosFiltrados, pedidosEndList);

  // contagem por nome
  const pedidoCount = pedidosCompletos.reduce((acc, pedido) => {
    const nome = pedido.nome;
    if (!acc[nome]) {
      acc[nome] = 0;
    }
    acc[nome]++;
    return acc;
  }, {});

  const ranking = Object.entries(pedidoCount)
    .map(([nome, totalPedidos]) => ({ nome, totalPedidos }))
    .sort((a, b) => b.totalPedidos - a.totalPedidos);

  const top3 = ranking.slice(0, 3);
  const rest = ranking.slice(3);

  const titleClass = isDarkMode ? "title-white" : "title-black";

  const preposicoes = ["da", "de", "dos", "das", "do", "a", "ao", "na", "no"];

  const getNomeExibido = (nome) => {
    const nomeArray = nome.split(" ");
    return preposicoes.includes(nomeArray[1]?.toLowerCase())
      ? nomeArray.slice(0, 3).join(" ")
      : nomeArray.slice(0, 2).join(" ");
  };

  const getImageUrl = (name) =>
    `https://res.cloudinary.com/dilivah9m/image/upload/${name.replace(/ /g, "_")}.jpg`;
  const fallbackImage = "https://res.cloudinary.com/dilivah9m/image/upload/Icon_unknown.jpg";

  const handleChangeDia = (date) => {
    setDataDia(date);
    setDataMes(null);
  };

  const handleChangeMes = (date) => {
    setDataMes(date);
    setDataDia(null);
  };

  return (
    <div className={styles.containerDiv}>
      <h1 className={`${titleClass} ${styles.titleRanking}`}>Ranking Pedidos</h1>

      <div className={styles.containerMain}>
        <div className={styles.containerDate}>
          <label htmlFor="date" className={`${titleClass} ${styles.label}`}>
            Dia:
          </label>
          <DatePicker
            selected={dataDia}
            onChange={handleChangeDia}
            dateFormat="dd/MM/yyyy"
            locale={ptBR}
            className="input-search"
            placeholderText="dd/mm/yyyy"
          />

          <label htmlFor="month" className={`${titleClass} ${styles.label}`}>
            Mês:
          </label>
          <DatePicker
            selected={dataMes}
            onChange={handleChangeMes}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            locale={ptBR}
            className="input-search"
            placeholderText="mm/yyyy"
          />
        </div>

        {dataFormatada && (
          <>
            <div className={styles.podioContainer}>
              {top3.map((item, index) => {
                const positions = [0, 1, 2];
                const pos = positions[index];

                return (
                  <div
                    key={index}
                    className={`${styles.podioCard} ${styles[`pos${pos}`]}`}
                  >
                    <span className={`${titleClass} ${styles.position}`}>
                      {[1, 2, 3][index]}°
                    </span>
                    <img
                      className={styles.imagem}
                      src={getImageUrl(item.nome)}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallbackImage;
                      }}
                    />
                    <p className={`${titleClass} ${styles.paragraph}`}>
                      {getNomeExibido(item.nome)}
                    </p>
                    <span className={`${styles.numPedidos}`}>
                      {item.totalPedidos}
                    </span>
                  </div>
                );
              })}
            </div>

            <ul className={styles.containerList}>
              {rest.map((item, index) => (
                <RankingCard
                  key={index + 3}
                  item={item}
                  index={index + 3}
                  isMonthly={!!dataMes}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
