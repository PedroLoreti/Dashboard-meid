import { useContext, useState } from "react";
import { PedidoEndContext } from "../../providers/PedidosEnd";
import usePedidoCount from "../../hooks/usePedidoCount";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, startOfWeek, endOfWeek } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { RankingCard } from "./RankingCard";
import styles from "./style.module.scss";
import { useTheme } from "../../providers/ThemeContext";

export const Ranking = () => {
  const { isDarkMode } = useTheme();
  const { pedidosEndList } = useContext(PedidoEndContext);

  const [filtro, setFiltro] = useState("dia"); // 'dia', 'semana' ou 'mes'
  const [dataSelecionada, setDataSelecionada] = useState(null);

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
    setDataSelecionada(null); // limpa data ao trocar filtro
  };

  let dataFormatada = null;

  if (dataSelecionada) {
    if (filtro === "dia") {
      dataFormatada = format(dataSelecionada, "yyyy-MM-dd");
    } else if (filtro === "mes") {
      dataFormatada = format(dataSelecionada, "yyyy-MM");
    } else if (filtro === "semana") {
      const inicioSemana = startOfWeek(dataSelecionada, {
        locale: ptBR,
        weekStartsOn: 1,
      });
      const fimSemana = endOfWeek(dataSelecionada, {
        locale: ptBR,
        weekStartsOn: 1,
      });
      dataFormatada = {
        start: format(inicioSemana, "yyyy-MM-dd"),
        end: format(fimSemana, "yyyy-MM-dd"),
      };
    }
  }

  const pedidoCount = usePedidoCount(pedidosEndList, dataFormatada, filtro);
  const titleClass = isDarkMode ? "title-white" : "title-black";

  const top3 = pedidoCount.slice(0, 3);
  const rest = pedidoCount.slice(3);

  const preposicoes = ["da", "de", "dos", "das", "do", "a", "ao", "na", "no"];

  const getNomeExibido = (nome) => {
    const nomeArray = nome.split(" ");
    return preposicoes.includes(nomeArray[1]?.toLowerCase())
      ? nomeArray.slice(0, 3).join(" ")
      : nomeArray.slice(0, 2).join(" ");
  };

  const getImageUrl = (name) =>
    `https://res.cloudinary.com/dilivah9m/image/upload/${name.replace(
      / /g,
      "_"
    )}.jpg`;
  const fallbackImage =
    "https://res.cloudinary.com/dilivah9m/image/upload/Icon_unknown.jpg";

  return (
    <div className={styles.containerDiv}>
      <h1 className={`${titleClass} ${styles.titleRanking}`}>
        Ranking Pedidos
      </h1>

      <div className={styles.containerMain}>
        <div className={styles.containerDate}>
          <label className={`${titleClass} ${styles.label}`}>Filtro:</label>
          <select
            value={filtro}
            onChange={handleFiltroChange}
            className="input-search"
          >
            <option value="dia">Dia</option>
            <option value="semana">Semana</option>
            <option value="mes">Mês</option>
          </select>

          <label className={`${titleClass} ${styles.label}`}>
            {filtro === "dia"
              ? "Dia:"
              : filtro === "semana"
              ? "Semana:"
              : "Mês:"}
          </label>
          <DatePicker
            selected={dataSelecionada}
            onChange={(date) => setDataSelecionada(date)}
            dateFormat={
              filtro === "dia"
                ? "dd/MM/yyyy"
                : filtro === "mes"
                ? "MM/yyyy"
                : "dd/MM/yyyy"
            }
            showMonthYearPicker={filtro === "mes"}
            locale={ptBR}
            className="input-search"
            placeholderText={
              filtro === "dia"
                ? "dd/mm/yyyy"
                : filtro === "mes"
                ? "mm/yyyy"
                : "dd/mm/yyyy"
            }
          />
        </div>

        {dataSelecionada && (
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
                    <span className={styles.numPedidos}>
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
                  isMonthly={filtro === "mes"}
                  isWeekly={filtro === "semana"}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
