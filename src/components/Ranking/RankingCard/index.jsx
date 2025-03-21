import styles from "./style.module.scss"
export const RankingCard = ({item}) => {
    
    return (
        <li>
            <p className={styles.paragraph}>{item[0]}</p>
            <span>{item[1]}</span>
        </li>
    )
}