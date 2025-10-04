import { CategoryInfo, HookCategory } from '@/types/hook';

interface CategoryFilterProps {
  categories: CategoryInfo[];
  activeCategory: HookCategory | 'all';
  onCategoryChange: (category: HookCategory | 'all') => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {/* All button */}
      <button
        onClick={() => onCategoryChange('all')}
        className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
          activeCategory === 'all'
            ? 'bg-gray-900 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Hooks
      </button>

      {/* Category buttons */}
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
            activeCategory === category.id
              ? `bg-${category.color} text-white shadow-md`
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="mr-1.5">{category.icon}</span>
          {category.label}
        </button>
      ))}
    </div>
  );
}
