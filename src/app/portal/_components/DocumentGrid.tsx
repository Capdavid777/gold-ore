'use client';

import { useEffect, useState } from 'react';
import FilterBar from './FilterBar';
import FileCard from './FileCard';
import type { ContentItem } from '@/lib/rbac';

export default function DocumentGrid() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/content/list?q=${encodeURIComponent(q)}`);
      if (res.ok) setItems(await res.json());
    };
    load();
  }, [q]);

  const onPreview = (it: ContentItem) => {
    // For now, open the SAS link in a new tab; can be upgraded to a modal viewer
    onDownload(it);
  };

  const onDownload = async (it: ContentItem) => {
    const res = await fetch(`/api/content/sas?id=${encodeURIComponent(it.id)}`);
    if (!res.ok) {
      alert('Access denied');
      return;
    }
    const { url } = await res.json();
    window.open(url, '_blank', 'noopener');
  };

  return (
    <div className="space-y-6">
      <FilterBar onChange={setQ} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <FileCard
            key={it.id}
            item={it}
            onPreview={onPreview}
            onDownload={onDownload}
          />
        ))}
      </div>
    </div>
  );
}
