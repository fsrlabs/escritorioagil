export type TaskStatus = 'done' | 'wait' | 'alert';
export type BadgeVariant = 'green' | 'amber' | 'red';

export interface Task {
  icon: string;
  status: TaskStatus;
  name: string;
  time: string;
}

export interface Empresa {
  name: string;
  meta: string;
  regime: string;
  venc: string;
  status: string;
  badge: BadgeVariant;
  badgeText: string;
  tasks: Task[];
}
