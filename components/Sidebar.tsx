import { Empresa } from "@/types";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  empresas: Empresa[];
  activeIndex: number | null;
  onSelectEmpresa: (idx: number) => void;
  onShowOverview: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const dotClass: Record<string, string> = {
  green: styles.dotGreen,
  amber: styles.dotAmber,
  red: styles.dotRed,
};

export default function Sidebar({
  empresas,
  activeIndex,
  onSelectEmpresa,
  onShowOverview,
  isOpen = false,
  onClose,
}: SidebarProps) {
  function handleSelectEmpresa(idx: number) {
    onSelectEmpresa(idx);
    onClose?.();
  }

  function handleShowOverview() {
    onShowOverview();
    onClose?.();
  }

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.mobileHeader}>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <svg
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M2 2l10 10M12 2L2 12" />
            </svg>
          </button>
        </div>
        <div className={styles.section}>Visão geral</div>
        <div
          className={`${styles.navItem} ${activeIndex === null ? styles.active : ""}`}
          onClick={handleShowOverview}
        >
          <span className={styles.navItemName}>Todas as empresas</span>
        </div>

        <div className={styles.section} style={{ marginTop: 8 }}>
          Empresas
        </div>
        {empresas.map((e, i) => (
          <div
            key={e.name}
            className={`${styles.navItem} ${activeIndex === i ? styles.active : ""}`}
            onClick={() => handleSelectEmpresa(i)}
          >
            <span className={styles.navItemName}>{e.name}</span>
            <span className={`${styles.dot} ${dotClass[e.badge]}`} />
          </div>
        ))}

        <div className={styles.footer}>
          <div className={styles.footerName}>Demonstração EscritórioÁgil</div>
          <div className={styles.footerEmail}>
            demonstracao@escritorioagil.com.br
          </div>
        </div>
      </div>
    </>
  );
}
