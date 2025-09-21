'use client';

import { motion } from 'framer-motion';
import type { ContentItem } from '@/lib/rbac';
import { hasPermission } from '@/lib/rbac';

type Props = {
  item: ContentItem;
  onPreview: (it: ContentItem) => void;
  onDownload: (it: ContentItem) => void;
};

const typeIcon: Record<ContentItem['type'], string> = {
  pdf: '📄',
  image: '🖼️',
  video: '🎬',
  audio: '🎧',
  docx: '📝',
  folder: '📁',
};

function FileCard({ item, onPreview, onDownload }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group rounded-2xl border border-[#654e1a]/40 bg-[#1a1f24]/70 p-4"
    >
      <div className="flex items-start justify-between">
        <div className="text-3xl" aria-hidden="true">{typeIcon[item.type]}</div>
        <span className="text-xs text-gray-400">
          {new Date(item.modified || Date.now()).toLocaleDateString()}
        </span>
      </div>

      <div className="mt-2 font-medium">{item.name}</div>
      {item.tags?.length ? (
        <div className="mt-1 text-xs text-gray-400">{item.tags.join(' • ')}</div>
      ) : null}

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onPreview(item)}
          className="rounded-lg border border-[#654e1a]/40 px-3 py-1 hover:bg-[#161a1e]"
        >
          Preview
        </button>
        <button
          onClick={() => onDownload(item)}
          disabled={!hasPermission(item, 'download')}
          className="rounded-lg bg-[#b08d2b] text-black px-3 py-1 font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Download
        </button>
        <button
          disabled={!hasPermission(item, 'edit')}
          className="rounded-lg border border-[#654e1a]/40 px-3 py-1 disabled:opacity-40"
        >
          Edit
        </button>
      </div>
    </motion.div>
  );
}

export default FileCard;

