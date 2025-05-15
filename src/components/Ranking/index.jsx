import { useContext, useState } from "react";
import { PedidoEndContext } from "../../providers/PedidosEnd";
import usePedidoCount from "../../hooks/usePedidoCount";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { RankingCard } from "./RankingCard";
import styles from "./style.module.scss";
import { useTheme } from "../../providers/ThemeContext";

export const Ranking = () => {
  const { isDarkMode } = useTheme();
  const { pedidosEndList } = useContext(PedidoEndContext);
  const [dataPedido, setDataPedido] = useState(null);
  const dataFormatada = dataPedido ? format(dataPedido, "dd/MM/yyyy") : null;

  const pedidoCount = usePedidoCount(pedidosEndList, dataFormatada);
  const titleClass = isDarkMode ? "title-white" : "title-black";

  const pedidoSorted = Object.entries(pedidoCount).sort((a, b) => b[1] - a[1]);

  const top3 = pedidoSorted.slice(0, 3);
  const rest = pedidoSorted.slice(3);

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

  

  const handleChange = (date) => {
    setDataPedido(date);
  };

  return (
    <div className={styles.containerDiv}>
      <h1 className={`${titleClass} ${styles.titleRanking}`}>Ranking Pedidos</h1>

      <div className={styles.containerMain}>
        <div className={styles.containerDate}>
          <label htmlFor="date" className={`${titleClass} ${styles.label}`}>
            Data:
          </label>

          <DatePicker
            selected={dataPedido}
            onChange={handleChange}
            dateFormat="dd/MM/yyyy"
            locale={ptBR}
            className="input-search"
            placeholderText="dd/mm/yyyy"
          />
        </div>

        <div className={styles.podioContainer}>
          {top3.map((item, index) => {
            const positions = [0, 1, 2]; // posição visual: 2°, 1°, 3°
            const pos = positions[index];

            return (
              <div key={index} className={`${styles.podioCard} ${styles[`pos${pos}`]}`}>
                <span className={`${titleClass} ${styles.position}`}>{[1, 2, 3][index]}°</span>
                <img
                  className={styles.imagem}
                  src={getImageUrl(item[0])}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackImage;
                  }}
                />
                <p className={`${titleClass} ${styles.paragraph}`}>
                  {getNomeExibido(item[0])}
                </p>
                <span className={`${styles.numPedidos}`}>{item[1]}</span>
              </div>
            );
          })}
        </div>

        {/* RESTANTE DA LISTA */}
        <ul className={styles.containerList}>
          {rest.map((item, index) => (
            <RankingCard key={index + 3} item={item} index={index + 3} />
          ))}
        </ul>
      </div>
    </div>
  );
};
