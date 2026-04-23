import styles from "./Topbar.module.css";

interface TopbarProps {
  escritorio: string;
  user: string;
  onMenuToggle?: () => void;
}

export default function Topbar({
  escritorio,
  user,
  onMenuToggle,
}: TopbarProps) {
  return (
    <div className={styles.topbar}>
      <div className={styles.left}>
        <button
          className={styles.hamburger}
          onClick={onMenuToggle}
          aria-label="Abrir menu"
        >
          <svg
            viewBox="0 0 20 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M1 1h18M1 7h18M1 13h18" />
          </svg>
        </button>
        <div className={styles.logo}>
          escritório<span>ágil</span>
        </div>
      </div>
      <div className={styles.meta}>
        <span className={styles.escritorio}>{escritorio}</span>
        <div className={styles.dot} />
        <span className={styles.user}>{user}</span>
      </div>
    </div>
  );
}
