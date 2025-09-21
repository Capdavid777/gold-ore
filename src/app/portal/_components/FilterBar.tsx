'use client';

import { useState } from 'react';

type Props = { onChange: (q: string) => void };

function FilterBar({ onChange }: Props) {
  const [q, setQ] = useState('');

  const submit = () => onChange(q.trim());

  return (
    <div className="flex gap-3 items-center">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        placeholder="Search files, tags, types..."
        className="w-full rounded-xl bg-[#161a1e] border border-[#654e1a]/40 px-4 py-2"
        aria-label="Search files"
      />
      <button
        onClick={submit}
        className="rounded-xl bg-[#b08d2b] text-black font-semibold px-4 py-2 hover:bg-[#d4af37]"
      >
        Filter
      </button>
    </div>
  );
}

export default FilterBar;

