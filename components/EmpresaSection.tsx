import { Empresa } from '@/types';
import Badge from './Badge';
import styles from './EmpresaSection.module.css';

interface EmpresaSectionProps {
  empresa: Empresa;
  onBack: () => void;
}

const taskIconClass = {
  done: styles.tiDone,
  wait: styles.tiWait,
  alert: styles.tiAlert,
};

const taskBadgeClass = {
  done: styles.tbDone,
  wait: styles.tbWait,
  alert: styles.tbAlert,
};

const taskBadgeText = {
  done: 'Concluído',
  wait: 'Aguardando',
  alert: 'Urgente',
};

export default function EmpresaSection({ empresa, onBack }: EmpresaSectionProps) {
  const done = empresa.tasks.filter(t => t.status === 'done').length;

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <button className={styles.backBtn} onClick={onBack}>
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 2L4 7l5 5" />
            </svg>
            Voltar para visão geral
          </button>
          <div className={styles.pageTitle}>{empresa.name}</div>
          <div className={styles.pageSub}>{empresa.meta}</div>
        </div>
        <Badge variant={empresa.badge}>{empresa.badgeText}</Badge>
      </div>

      <div className={styles.detailGrid}>
        <div className={styles.detailMetric}>
          <div className={styles.detailLabel}>Regime tributário</div>
          <div className={styles.detailVal}>{empresa.regime}</div>
        </div>
        <div className={styles.detailMetric}>
          <div className={styles.detailLabel}>Próximo vencimento</div>
          <div className={styles.detailVal}>{empresa.venc}</div>
        </div>
        <div className={styles.detailMetric}>
          <div className={styles.detailLabel}>Status geral</div>
          <div className={styles.detailVal}>{empresa.status}</div>
        </div>
      </div>

      <div className={styles.tasksCard}>
        <div className={styles.tasksHeader}>
          <span className={styles.tasksTitle}>Tarefas do assistente</span>
          <span className={styles.tasksCount}>{done} de {empresa.tasks.length} concluídas</span>
        </div>
        {empresa.tasks.map((t, i) => (
          <div key={i} className={styles.taskRow}>
            <div className={`${styles.taskIcon} ${taskIconClass[t.status]}`}>{t.icon}</div>
            <div className={styles.taskName}>{t.name}</div>
            <div className={styles.taskTime}>{t.time}</div>
            <div className={`${styles.taskBadge} ${taskBadgeClass[t.status]}`}>
              {taskBadgeText[t.status]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
