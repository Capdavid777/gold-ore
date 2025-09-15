'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'sent'>('idle');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');

        const form = e.currentTarget;
        const data = {
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
            telephone: (form.elements.namedItem('telephone') as HTMLInputElement).value,
            message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
        };

        try {
            await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            setStatus('sent');
            form.reset();
        } catch (err) {
            console.error(err);
            setStatus('idle');
        }
    }

    return (
        <main className="container mx-auto max-w-2xl px-6 py-16">
            <h1 className="font-display text-4xl mb-6">Contact Us</h1>
            <p className="text-[hsl(var(--text-muted))] mb-8">
                Fill in the form below and we’ll get back to you shortly.
            </p>

            {status === 'sent' ? (
                <p className="text-green-600 font-medium">Thank you! Your message has been sent.</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block font-medium mb-1">
                            Name *
                        </label>
                        <input
                            required
                            type="text"
                            id="name"
                            name="name"
                            className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 py-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block font-medium mb-1">
                            Email *
                        </label>
                        <input
                            required
                            type="email"
                            id="email"
                            name="email"
                            className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 py-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="telephone" className="block font-medium mb-1">
                            Telephone
                        </label>
                        <input
                            type="tel"
                            id="telephone"
                            name="telephone"
                            className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 py-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block font-medium mb-1">
                            Message *
                        </label>
                        <textarea
                            required
                            id="message"
                            name="message"
                            rows={5}
                            className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 py-2"
                        />
                    </div>

                    <Button type="submit" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Sending…' : 'Send Message'}
                    </Button>
                </form>
            )}
        </main>
    );
}
