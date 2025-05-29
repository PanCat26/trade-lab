import styles from './Position.module.css';

export default function Position({position}) {


    return (
        <div className={styles.position}>
            <button className={styles.titleRow}>
                <div className={styles.title}>
                    <span className={styles.ticker}>{position.ticker}</span>
                    <h5 className={styles.security}>{position.security}</h5>
                </div>
            </button>
            <div className={styles.data}>

            </div>
        </div>
    );
}