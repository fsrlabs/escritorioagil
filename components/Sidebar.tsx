import { Empresa } from "@/types";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  empresas: Empresa[];
  activeIndex: number | null;
  onSelectEmpresa: (idx: number) => void;
  onShowOverview: () => void;
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
}: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.section}>Visão geral</div>
      <div
        className={`${styles.navItem} ${activeIndex === null ? styles.active : ""}`}
        onClick={onShowOverview}
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
          onClick={() => onSelectEmpresa(i)}
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
  );
}
