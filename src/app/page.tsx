'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import HookGrid from '@/components/HookGrid';
import { hooks } from '@/data/hooks';
import { categories } from '@/data/categories';
import { HookCategory } from '@/types/hook';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<HookCategory | 'all'>('all');

  const filteredHooks = activeCategory === 'all'
    ? hooks
    : hooks.filter(hook => hook.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Intro section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Discover Claude Code Hooks
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Browse our curated collection of open-source hooks to extend Claude Code&apos;s capabilities.
            Filter by category to find the perfect hook for your workflow.
          </p>
        </div>

        {/* Category filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Hook grid */}
        <HookGrid hooks={filteredHooks} />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              Built with Next.js 15, React 19, and Tailwind CSS v4
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://docs.claude.com/en/docs/claude-code/hooks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Claude Code Docs
              </a>
              <a
                href="https://github.com/mohammadbafkar/hookhub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contribute
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
