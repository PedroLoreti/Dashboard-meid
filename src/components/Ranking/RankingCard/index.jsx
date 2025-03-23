import styles from "./style.module.scss"
export const RankingCard = ({item}) => {
    
    return (
        <li>
            <p className={styles.paragraph}>{item[0]}</p>
            <span className={styles.numPedidos}>{item[1]}</span>
        </li>
    )
}