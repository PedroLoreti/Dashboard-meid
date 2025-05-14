import { useState, useMemo } from "react";
import styles from "./style.module.scss";
import { useContagemPedidosMes } from "../../hooks/usePedidoCount";

const Modal = ({ isOpen, onClose, item}) => {
  if (!isOpen) return null;

  const nome = item[0];
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth() + 1); 

  const { contagem } = useContagemPedidosMes(mesSelecionado);

  const totalPedidos = contagem[nome] || 0;

  const imageUrl = `https://res.cloudinary.com/dilivah9m/image/upload/${nome.replace(
    / /g,
    "_"
  )}.jpg`;
  const fallbackImage =
    "https://res.cloudinary.com/dilivah9m/image/upload/Icon_unknown.jpg";

  const handleMesChange = (e) => {
    const novoMes = parseInt(e.target.value, 10);
    setMesSelecionado(novoMes);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Fechar modal"
        >
          ×
        </button>

        <img
          className={styles.modalImage}
          src={imageUrl}
          alt={`Foto de ${nome}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />

        <h2 id="modal-title" className={styles.modalTitle}>
          {nome}
        </h2>

        <div className={styles.mesSelector}>
          <label htmlFor="mes">Escolha o mês:</label>
          <select
            id="mes"
            value={mesSelecionado}
            onChange={handleMesChange}
            aria-label="Selecione o mês"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        <p className={styles.modalText}>
          Total de pedidos no mês: <strong>{totalPedidos}</strong>
        </p>
      </div>
    </div>
  );
};

export default Modal;