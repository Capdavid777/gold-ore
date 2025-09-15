import { twMerge } from 'tailwind-merge';
export function Section({ className = '', ...props }: React.HTMLAttributes<HTMLElement>) {
return <section className={twMerge('py-16 md:py-24', className)} {...props}><div className="container mx-auto">{props.children}</div></section>;
}