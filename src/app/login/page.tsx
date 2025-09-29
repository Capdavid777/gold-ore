import { LoginButton } from "@/components/AuthButtons";

export default function LoginPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center bg-[#0B0E13] text-white">
      <div className="max-w-md w-full rounded-2xl border border-zinc-800 p-8 bg-black/40 shadow-xl">
        <h1 className="text-3xl font-semibold mb-4 text-[#C4A04A]">Welcome</h1>
        <p className="text-sm text-zinc-400 mb-6">
          Staff & investors secure access. By continuing you agree to our policies.
        </p>
        <LoginButton />
      </div>
    </main>
  );
}
