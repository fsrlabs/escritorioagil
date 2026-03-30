import { Empresa } from '@/types';
import Badge from './Badge';
import styles from './OverviewSection.module.css';

interface OverviewSectionProps {
  empresas: Empresa[];
  onSelect: (idx: number) => void;
}

export default function OverviewSection({ empresas, onSelect }: OverviewSectionProps) {
  const totalDone = empresas.flatMap(e => e.tasks).filter(t => t.status === 'done').length;
  const totalTasks = empresas.flatMap(e => e.tasks).length;
  const waiting = empresas.flatMap(e => e.tasks).filter(t => t.status === 'wait').length;
  const urgent = empresas.flatMap(e => e.tasks).filter(t => t.status === 'alert').length;

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <div className={styles.pageTitle}>Visão geral</div>
          <div className={styles.pageSub}>Janeiro 2025 · {empresas.length} empresas ativas</div>
        </div>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <div className={styles.metricLabel}>Empresas</div>
          <div className={styles.metricVal}>{empresas.length}</div>
          <div className={styles.metricSub}>todas sincronizadas</div>
        </div>
        <div className={styles.metric}>
          <div className={styles.metricLabel}>Tarefas hoje</div>
          <div className={styles.metricVal}>{totalTasks}</div>
          <div className={styles.metricSub}>{totalDone} concluídas pelo assistente</div>
        </div>
        <div className={styles.metric}>
          <div className={styles.metricLabel}>Aguardando cliente</div>
          <div className={`${styles.metricVal} ${styles.amber}`}>{waiting}</div>
          <div className={styles.metricSub}>lembretes enviados</div>
        </div>
        <div className={styles.metric}>
          <div className={styles.metricLabel}>Requer atenção</div>
          <div className={`${styles.metricVal} ${styles.red}`}>{urgent}</div>
          <div className={styles.metricSub}>precisam de você</div>
        </div>
      </div>

      <div className={styles.ovCard}>
        <div className={`${styles.ovRow} ${styles.ovHeader}`}>
          <div>Empresa</div>
          <div>Status</div>
          <div className={styles.ovTasks}>Tarefas</div>
          <div>Próx. venc.</div>
          <div />
        </div>
        {empresas.map((e, i) => {
          const done = e.tasks.filter(t => t.status === 'done').length;
          return (
            <div key={e.name} className={styles.ovRow} onClick={() => onSelect(i)}>
              <div>
                <div className={styles.ovName}>{e.name}</div>
                <div className={styles.ovSub}>{e.meta.split('·')[1]?.trim()} · {e.regime}</div>
              </div>
              <div><Badge variant={e.badge}>{e.badgeText}</Badge></div>
              <div className={styles.ovTasks}>{done} / {e.tasks.length}</div>
              <div className={styles.ovVenc}>{e.venc}</div>
              <div className={styles.ovArrow}>›</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
