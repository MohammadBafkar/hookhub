# HookHub - MVP Specification

## 1. Project Overview

**HookHub** is a web application that serves as a curated directory for discovering and browsing open-source Claude Code hooks. The platform makes it easy for developers to find, explore, and integrate community-created hooks into their Claude Code workflows.

### Purpose

- Centralize discovery of Claude Code hooks
- Showcase community contributions
- Make it easy to find hooks by category and use case
- Lower the barrier to entry for using Claude Code hooks

### Target Audience

- Developers using Claude Code
- DevOps engineers automating workflows
- Teams standardizing coding practices
- Open-source contributors

---

## 2. What are Claude Code Hooks?

Claude Code hooks are user-defined shell commands that execute at specific points in Claude Code's lifecycle. They provide deterministic control over Claude Code's behavior, enabling automation, validation, and custom workflows.

### Hook Lifecycle Events

1. **UserPromptSubmit** - When user submits a prompt
2. **PreToolUse** - Before Claude executes a tool (Edit, Write, Bash, etc.)
3. **PostToolUse** - After Claude completes a tool execution
4. **Stop** - When Claude finishes responding
5. **SubagentStop** - When a subagent completes
6. **PreCompact** - Before context compaction
7. **SessionStart** - When a new session begins
8. **Notification** - When Claude sends a notification

### Common Use Cases

- **Code Quality**: Auto-formatting, linting, style checking
- **Git Automation**: Automatic commits, branch management
- **Monitoring**: Logging tool usage, tracking changes
- **Notifications**: Slack/Discord alerts, desktop notifications
- **Validation**: Input validation, permission checks
- **CI/CD Integration**: Running tests, deployment triggers
- **Multi-Agent Systems**: Coordinating multiple Claude instances

### Configuration

Hooks are configured in `.claude/settings.json` files:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "/path/to/format-code.sh"
          }
        ]
      }
    ]
  }
}
```

---

## 3. MVP Scope

### In Scope

✅ Display hooks in a responsive grid layout
✅ Category-based filtering
✅ Static hook data (curated from GitHub)
✅ Basic hook information: name, description, category, repo link
✅ Mobile-responsive design
✅ Simple search functionality

### Out of Scope (Post-MVP)

❌ User authentication/accounts
❌ User-submitted hooks
❌ GitHub API integration
❌ Detailed hook pages
❌ Hook ratings/reviews
❌ Code preview/syntax highlighting
❌ Installation instructions/copy-paste
❌ Hook dependencies tracking

---

## 4. Data Model

### Hook Interface

```typescript
interface Hook {
  id: string;                    // Unique identifier (slug format)
  name: string;                  // Display name of the hook
  description: string;           // Brief description (1-2 sentences)
  longDescription?: string;      // Detailed description (for future use)
  category: HookCategory;        // Primary category
  tags?: string[];               // Additional searchable tags
  repoUrl: string;               // GitHub repository URL
  author: string;                // GitHub username or organization
  authorUrl?: string;            // GitHub profile URL
  stars?: number;                // GitHub stars (for future API integration)
  language?: string;             // Primary language (bash, python, etc.)
  createdAt?: string;            // ISO date string
  updatedAt?: string;            // ISO date string
  featured?: boolean;            // Highlight featured hooks
}
```

### Hook Categories

```typescript
type HookCategory =
  | 'code-quality'      // Linting, formatting, style checks
  | 'git-automation'    // Commits, branches, PRs
  | 'monitoring'        // Logging, observability, analytics
  | 'notifications'     // Slack, Discord, email alerts
  | 'validation'        // Input validation, permissions
  | 'testing'           // Running tests, coverage
  | 'ci-cd'             // Build, deploy, automation
  | 'multi-agent'       // Multi-agent coordination
  | 'workflow'          // General workflow automation
  | 'other';            // Miscellaneous

interface CategoryInfo {
  id: HookCategory;
  label: string;
  description: string;
  icon?: string;        // Emoji or icon identifier
  color: string;        // Tailwind color class
}
```

---

## 5. UI/UX Requirements

### Main Page Layout

```
┌─────────────────────────────────────────────┐
│           HookHub Header                     │
│  Logo | Search Bar | GitHub Link             │
├─────────────────────────────────────────────┤
│                                              │
│  [All] [Code Quality] [Git] [Monitoring]... │  ← Category Filter
│                                              │
├──────────────┬──────────────┬──────────────┤
│              │              │              │
│  Hook Card   │  Hook Card   │  Hook Card   │  ← Grid Layout
│              │              │              │
├──────────────┼──────────────┼──────────────┤
│              │              │              │
│  Hook Card   │  Hook Card   │  Hook Card   │
│              │              │              │
└──────────────┴──────────────┴──────────────┘
```

### Hook Card Design

Each card should display:

- Hook name (headline)
- Category badge (colored pill)
- Description (2-3 lines, truncated)
- Author info with avatar placeholder
- GitHub repo link (icon button)
- Optional: Language badge
- Optional: Star count

**Card States:**

- Default: White/gray background
- Hover: Subtle elevation/shadow, category color accent
- Active/Clicked: Brief scale animation

### Responsive Breakpoints

- **Desktop (≥1280px)**: 3 columns
- **Tablet (768px - 1279px)**: 2 columns
- **Mobile (<768px)**: 1 column, full width cards

### Color Scheme

Use Tailwind CSS with custom category colors:

- Code Quality: `blue-500`
- Git Automation: `purple-500`
- Monitoring: `green-500`
- Notifications: `yellow-500`
- Validation: `red-500`
- Testing: `pink-500`
- CI/CD: `indigo-500`
- Multi-Agent: `cyan-500`
- Workflow: `gray-500`
- Other: `slate-500`

---

## 6. Component Architecture

### Component Hierarchy

```plaintext
app/
└── page.tsx (Main Page)
    ├── Header
    │   ├── Logo
    │   ├── SearchBar
    │   └── GitHubLink
    ├── CategoryFilter
    │   └── FilterButton[]
    └── HookGrid
        └── HookCard[]
```

### Component Specifications

#### `<HookCard>`

**Props:**

```typescript
interface HookCardProps {
  hook: Hook;
  onClick?: () => void;
}
```

**Responsibilities:**

- Display hook information in card format
- Handle hover interactions
- Link to GitHub repository
- Show category badge with appropriate color

#### `<HookGrid>`

**Props:**

```typescript
interface HookGridProps {
  hooks: Hook[];
  loading?: boolean;
}
```

**Responsibilities:**

- Render grid layout
- Handle responsive breakpoints
- Show empty state when no hooks match filters
- Display loading skeleton (future)

#### `<CategoryFilter>`

**Props:**

```typescript
interface CategoryFilterProps {
  categories: CategoryInfo[];
  activeCategory: HookCategory | 'all';
  onCategoryChange: (category: HookCategory | 'all') => void;
}
```

**Responsibilities:**

- Display filter buttons/pills
- Highlight active category
- Emit category change events
- Support "All" option

#### `<SearchBar>` (Optional for MVP)

**Props:**

```typescript
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
```

**Responsibilities:**

- Accept text input
- Debounce input changes
- Clear button when value exists

---

## 7. Initial Hook Data

### Data Source

For MVP, use a static TypeScript file with curated hooks from these sources:

1. **disler/claude-code-hooks-mastery**
   - Category: Multi-Agent, Workflow
   - Comprehensive hook examples covering all 8 lifecycle events
   - Python-based hooks with UV scripts

2. **disler/claude-code-hooks-multi-agent-observability**
   - Category: Monitoring
   - Real-time monitoring and visualization
   - Event tracking and logging

3. **decider/claude-hooks**
   - Category: Code Quality
   - Automatic validation and quality checks
   - Lightweight Python SDK

4. **webdevtodayjason/claude-hooks**
   - Category: Workflow
   - CLI-based hook manager
   - Coding standards enforcement

5. **GitButler Integration Hooks**
   - Category: Git Automation
   - Automatic branch and commit management
   - Pre/Post tool use hooks

### Example Data Structure

```typescript
// src/data/hooks.ts
export const hooks: Hook[] = [
  {
    id: 'claude-code-hooks-mastery',
    name: 'Claude Code Hooks Mastery',
    description: 'Comprehensive examples covering all 8 hook lifecycle events with Python UV scripts',
    category: 'multi-agent',
    tags: ['python', 'learning', 'examples'],
    repoUrl: 'https://github.com/disler/claude-code-hooks-mastery',
    author: 'disler',
    authorUrl: 'https://github.com/disler',
    language: 'python',
    featured: true
  },
  {
    id: 'multi-agent-observability',
    name: 'Multi-Agent Observability',
    description: 'Real-time monitoring and visualization for Claude Code agents through hook event tracking',
    category: 'monitoring',
    tags: ['observability', 'logging', 'visualization'],
    repoUrl: 'https://github.com/disler/claude-code-hooks-multi-agent-observability',
    author: 'disler',
    authorUrl: 'https://github.com/disler',
    language: 'python',
    featured: true
  },
  // ... more hooks
];
```

---

## 8. File Structure

```plaintext
hookhub/
├── src/
│   ├── app/
│   │   ├── layout.tsx           (existing root layout)
│   │   ├── page.tsx             (main page - hook grid)
│   │   └── globals.css          (existing global styles)
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── HookCard.tsx
│   │   ├── HookGrid.tsx
│   │   ├── CategoryFilter.tsx
│   │   └── SearchBar.tsx
│   ├── data/
│   │   ├── hooks.ts             (static hook data)
│   │   └── categories.ts        (category definitions)
│   ├── types/
│   │   └── hook.ts              (TypeScript interfaces)
│   └── lib/
│       └── utils.ts             (helper functions)
├── public/
│   └── ...                       (static assets)
├── spec/
│   └── CLAUDE.md                 (this file)
├── CLAUDE.md                     (project guidance for Claude Code)
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 9. Tech Stack

### Core Technologies (Already Configured)

- **Next.js 15**: App Router, server components
- **React 19**: Latest features
- **TypeScript**: Strict mode enabled
- **Tailwind CSS v4**: Utility-first styling
- **Turbopack**: Fast builds and HMR

### Additional Dependencies (None Required for MVP)

All features can be built with existing dependencies.

### Development Tools

- ESLint with `next/core-web-vitals` and `next/typescript`
- Path alias: `@/*` → `src/*`

---

## 10. Implementation Phases

### Phase 1: Foundation (Day 1)

- [ ] Create type definitions (`types/hook.ts`)
- [ ] Create category definitions (`data/categories.ts`)
- [ ] Set up initial hook data (`data/hooks.ts`) with 10-15 curated hooks
- [ ] Create utility functions (`lib/utils.ts`)

### Phase 2: Core Components (Day 1-2)

- [ ] Build `HookCard` component with styling
- [ ] Build `HookGrid` component with responsive layout
- [ ] Build `CategoryFilter` component
- [ ] Build `Header` component with logo and links

### Phase 3: Main Page (Day 2)

- [ ] Implement main page layout (`app/page.tsx`)
- [ ] Add category filtering logic
- [ ] Add search functionality (optional)
- [ ] Test responsive behavior

### Phase 4: Polish (Day 2-3)

- [ ] Add hover effects and animations
- [ ] Implement empty states
- [ ] Add loading skeletons (optional)
- [ ] Optimize for mobile
- [ ] Test across browsers

### Phase 5: Content (Day 3)

- [ ] Research and add more hooks (target: 20-30 hooks)
- [ ] Write accurate descriptions
- [ ] Verify repository links
- [ ] Add language badges

---

## 11. Key Features Detail

### Category Filtering

**Behavior:**

- Default: Show all hooks
- Click category: Filter to show only that category
- Click active category or "All": Reset to show all
- Visual feedback: Active category highlighted

**Implementation:**

- Client-side filtering using array `.filter()`
- Store active category in component state
- No URL persistence needed for MVP

### Search (Optional)

**Behavior:**

- Search by hook name and description
- Case-insensitive
- Real-time filtering as user types
- Debounce input (300ms)

**Implementation:**

- Simple string matching
- Combine with category filter (AND logic)

### Responsive Grid

**Behavior:**

- Smooth column transitions at breakpoints
- Equal height cards within rows
- Consistent spacing/gaps

**Implementation:**

- CSS Grid with Tailwind classes
- `grid-cols-1 md:grid-cols-2 xl:grid-cols-3`
- Gap: `gap-6` or `gap-8`

---

## 12. Design Guidelines

### Typography

- **Headings**: Use system font stack (Geist Sans)
- **Body**: Clean, readable line height (1.6)
- **Code**: Geist Mono for language badges

### Spacing

- Consistent padding: `p-4` (16px) or `p-6` (24px)
- Card margins: `gap-6` (24px) between cards
- Section spacing: `space-y-8` or `space-y-12`

### Accessibility

- Semantic HTML elements
- Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels for icon buttons
- Keyboard navigation support
- Focus states for interactive elements
- Color contrast compliance (WCAG AA)

### Performance

- Optimize images (use Next.js Image component if needed)
- No unnecessary client-side JavaScript
- Leverage server components where possible
- Minimal bundle size

---

## 13. Future Enhancements

### Post-MVP Features

1. **GitHub API Integration**
   - Real-time star counts
   - Last updated dates
   - Contributor counts
   - Automatic data sync

2. **Hook Detail Pages**
   - Full description
   - Installation instructions
   - Code examples
   - Usage documentation
   - Related hooks

3. **User Features**
   - Submit new hooks (form + moderation)
   - Rating/voting system
   - Comments/discussions
   - Bookmark/favorites

4. **Advanced Filtering**
   - Multi-select categories
   - Filter by language
   - Sort by popularity/date
   - Filter by hook event type

5. **Search Enhancements**
   - Full-text search
   - Tag-based search
   - Advanced search operators

6. **Analytics**
   - Track popular hooks
   - View counts
   - Click-through rates

7. **Developer Tools**
   - Hook generator/template
   - Testing framework
   - Documentation builder

---

## 14. Success Metrics (Future)

### MVP Success Indicators

- Successfully displays all hooks in grid format
- Category filtering works correctly
- Mobile responsive across common devices
- Fast page load (<2s)
- Accessible to screen readers

### Post-MVP Metrics

- Number of hooks in directory
- User engagement (clicks, time on site)
- Community contributions
- GitHub stars on featured repos

---

## 15. Open Questions

1. **Branding**: What should the logo/design system look like?
2. **Domain**: What domain will this be hosted on?
3. **Moderation**: If user submissions are added, who will moderate?
4. **Monetization**: Will this remain free/open-source?
5. **API**: Should we provide an API for programmatic access?

---

## 16. References

### Documentation

- [Claude Code Hooks Official Docs](https://docs.claude.com/en/docs/claude-code/hooks)
- [Anthropic Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)

### Example Repositories

- [claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery)
- [claude-code-hooks-multi-agent-observability](https://github.com/disler/claude-code-hooks-multi-agent-observability)
- [claude-hooks by decider](https://github.com/decider/claude-hooks)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)

### Articles

- [How I'm Using Claude Code Hooks](https://medium.com/@joe.njenga/use-claude-code-hooks-newest-feature-to-fully-automate-your-workflow-341b9400cfbe)
- [Automate Your AI Workflows with Claude Code Hooks](https://blog.gitbutler.com/automate-your-ai-workflows-with-claude-code-hooks)

---

## 17. Appendix

### Sample Hook Categories with Examples

#### **Code Quality**

- ESLint auto-fix on PostToolUse
- Prettier formatting
- StyleLint for CSS

#### **Git Automation**

- Auto-commit on file changes
- GitButler branch management
- Conventional commit message enforcement

#### **Monitoring**

- Hook event logging to JSON
- Performance metrics tracking
- Token usage monitoring

#### **Notifications**

- Slack notifications on errors
- Discord webhook integration
- Desktop notifications

#### **Validation**

- Permission checks before file writes
- Input sanitization
- API key validation

---

**Version**: 1.0
**Last Updated**: 2025-01-04
**Status**: MVP Specification - Ready for Implementation
