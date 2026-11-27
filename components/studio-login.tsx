"use client";

import { useActionState } from "react";
import { Loader2, Lock } from "lucide-react";
import { login } from "@/app/studio/actions";

export function StudioLogin() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="mx-auto mt-16 w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
      <Lock className="h-5 w-5 text-slate-500" />
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-100">Studio</h1>
      <p className="mt-1 text-sm text-slate-400">Private. Owner access only.</p>
      <input
        name="password"
        type="password"
        required
        autoFocus
        autoComplete="current-password"
        placeholder="Password"
        className="mt-6 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:border-slate-500 focus:outline-none"
      />
      {state?.error && <p className="mt-3 text-xs text-red-400">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-white disabled:opacity-50"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enter"}
      </button>
    </form>
  );
}
