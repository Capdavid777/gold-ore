import { twMerge } from 'tailwind-merge';

type Props = {
  text?: string;
  className?: string;
  animated?: boolean;
  as?: keyof JSX.IntrinsicElements; // e.g., 'h1', 'span', 'div'
};

export default function GoldWordmark({
  text = 'Gold Ore',
  className,
  animated = true,
  as = 'span',
}: Props) {
  const Tag = as as any;
  return (
    <Tag
      aria-label={text}
      className={twMerge(
        'metallic-gold',
        animated && 'metallic-animate',
        className
      )}
    >
      {text}
    </Tag>
  );
}
