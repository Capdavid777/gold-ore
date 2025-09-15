import { twMerge } from 'tailwind-merge';
export function Card({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
return <div className={twMerge('rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))] shadow-soft', className)} {...props} />;
}
export function CardContent({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={twMerge('p-6', className)} {...props} />; }