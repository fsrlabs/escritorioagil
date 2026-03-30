'use client';

import { useState } from 'react';
import { respostas } from '@/data/empresas';
import styles from './AgentBar.module.css';

interface AgentBarProps {
  onReply: (text: string) => void;
}

export default function AgentBar({ onReply }: AgentBarProps) {
  const [value, setValue] = useState('');

  function handleSend() {
    const val = value.trim().toLowerCase();
    if (!val) return;

    let resp = respostas.default;
    if (val.includes('extrato')) resp = respostas.extrato;
    else if (val.includes('atraso') || val.includes('atrasado')) resp = respostas.atraso;
    else if (val.includes('das') || val.includes('lembrete')) resp = respostas.das;
    else if (val.includes('vencimento') || val.includes('vence')) resp = respostas.vencimento;
    else if (val.includes('pendencia') || val.includes('pendência') || val.includes('pendente')) resp = respostas.pendencia;

    onReply(resp);
    setValue('');
  }

  return (
    <div className={styles.agentbar}>
      <div className={styles.pulse} />
      <span className={styles.label}>Assistente</span>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder='Pergunte ou instrua... ex: "quais clientes não mandaram o extrato?"'
      />
      <button className={styles.btn} onClick={handleSend}>Enviar</button>
    </div>
  );
}
