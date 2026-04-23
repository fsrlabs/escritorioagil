"use client";

import { useState } from "react";
import { empresas } from "@/data/empresas";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import AgentBar from "@/components/AgentBar";
import OverviewSection from "@/components/OverviewSection";
import EmpresaSection from "@/components/EmpresaSection";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [agentReply, setAgentReply] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleSelectEmpresa(idx: number) {
    setActiveIndex(idx);
    setShowReply(false);
  }

  function handleShowOverview() {
    setActiveIndex(null);
  }

  function handleAgentReply(text: string) {
    setAgentReply("");
    setShowReply(true);
    setActiveIndex(null);
    let i = 0;
    const iv = setInterval(() => {
      if (i < text.length) {
        const char = text[i];
        i++;
        setAgentReply((prev) => prev + char);
      } else {
        clearInterval(iv);
      }
    }, 16);
  }

  return (
    <div className={styles.shell}>
      <Topbar
        escritorio="Demonstração EscritórioÁgil"
        user="demonstracao@escritorioagil.com.br"
        onMenuToggle={() => setSidebarOpen(true)}
      />
      <AgentBar onReply={handleAgentReply} />
      <div className={styles.body}>
        <Sidebar
          empresas={empresas}
          activeIndex={activeIndex}
          onSelectEmpresa={handleSelectEmpresa}
          onShowOverview={handleShowOverview}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className={styles.main}>
          <div className={styles.demoHint}>
            <strong>Protótipo interativo</strong> — clique nas empresas na barra
            lateral ou digite perguntas no campo do assistente acima.
            Experimente: <em>&ldquo;quais clientes estão em atraso?&rdquo;</em>
          </div>

          {showReply && agentReply && (
            <div className={styles.agentReply}>
              <div className={styles.agentReplyLabel}>Assistente</div>
              <div className={styles.agentReplyText}>{agentReply}</div>
            </div>
          )}

          {activeIndex === null ? (
            <OverviewSection
              empresas={empresas}
              onSelect={handleSelectEmpresa}
            />
          ) : (
            <EmpresaSection
              empresa={empresas[activeIndex]}
              onBack={handleShowOverview}
            />
          )}
        </main>
      </div>
    </div>
  );
}
