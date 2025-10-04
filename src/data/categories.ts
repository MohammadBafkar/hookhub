import { CategoryInfo, HookCategory } from '@/types/hook';

export const categories: CategoryInfo[] = [
  {
    id: 'code-quality',
    label: 'Code Quality',
    description: 'Linting, formatting, style checks',
    icon: '✨',
    color: 'blue-500',
  },
  {
    id: 'git-automation',
    label: 'Git Automation',
    description: 'Commits, branches, PRs',
    icon: '🔀',
    color: 'purple-500',
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    description: 'Logging, observability, analytics',
    icon: '📊',
    color: 'green-500',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    description: 'Slack, Discord, email alerts',
    icon: '🔔',
    color: 'yellow-500',
  },
  {
    id: 'validation',
    label: 'Validation',
    description: 'Input validation, permissions',
    icon: '✅',
    color: 'red-500',
  },
  {
    id: 'testing',
    label: 'Testing',
    description: 'Running tests, coverage',
    icon: '🧪',
    color: 'pink-500',
  },
  {
    id: 'ci-cd',
    label: 'CI/CD',
    description: 'Build, deploy, automation',
    icon: '🚀',
    color: 'indigo-500',
  },
  {
    id: 'multi-agent',
    label: 'Multi-Agent',
    description: 'Multi-agent coordination',
    icon: '🤖',
    color: 'cyan-500',
  },
  {
    id: 'workflow',
    label: 'Workflow',
    description: 'General workflow automation',
    icon: '⚡',
    color: 'gray-500',
  },
  {
    id: 'other',
    label: 'Other',
    description: 'Miscellaneous',
    icon: '📦',
    color: 'slate-500',
  },
];

export const getCategoryInfo = (id: HookCategory): CategoryInfo | undefined => {
  return categories.find((cat) => cat.id === id);
};
