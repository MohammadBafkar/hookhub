export type HookCategory =
  | 'code-quality'
  | 'git-automation'
  | 'monitoring'
  | 'notifications'
  | 'validation'
  | 'testing'
  | 'ci-cd'
  | 'multi-agent'
  | 'workflow'
  | 'other';

export interface Hook {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: HookCategory;
  tags?: string[];
  repoUrl: string;
  author: string;
  authorUrl?: string;
  stars?: number;
  language?: string;
  createdAt?: string;
  updatedAt?: string;
  featured?: boolean;
}

export interface CategoryInfo {
  id: HookCategory;
  label: string;
  description: string;
  icon?: string;
  color: string;
}
