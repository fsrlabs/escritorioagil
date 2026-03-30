import styles from './Topbar.module.css';

interface TopbarProps {
  escritorio: string;
  user: string;
}

export default function Topbar({ escritorio, user }: TopbarProps) {
  return (
    <div className={styles.topbar}>
      <div className={styles.logo}>
        escritório<span>ágil</span>
      </div>
      <div className={styles.meta}>
        <span className={styles.escritorio}>{escritorio}</span>
        <div className={styles.dot} />
        <span className={styles.user}>{user}</span>
      </div>
    </div>
  );
}
