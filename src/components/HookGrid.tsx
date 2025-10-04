import { Hook } from '@/types/hook';
import HookCard from './HookCard';

interface HookGridProps {
  hooks: Hook[];
  loading?: boolean;
}

export default function HookGrid({ hooks, loading }: HookGridProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading hooks...</div>
      </div>
    );
  }

  if (hooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No hooks found</h3>
        <p className="text-gray-600 text-center max-w-md">
          Try adjusting your filters or search terms to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {hooks.map((hook) => (
        <HookCard key={hook.id} hook={hook} />
      ))}
    </div>
  );
}
