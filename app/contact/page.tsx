"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { sendContactEmail } from "@/app/actions/contact";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Terminal, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const response = await sendContactEmail(formData);

    if (response?.error) {
      setError(response.error);
    } else {
      setIsSuccess(true);
      event.currentTarget.reset();
    }
    setIsPending(false);
  }

  return (
    <main className="relative min-h-screen w-full bg-slate-950 font-sans selection:bg-slate-800 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0 w-full h-full opacity-50">
        <BackgroundRippleEffect />
      </div>

      <div className="relative z-20 w-full max-w-lg px-6 pointer-events-auto">
        <button 
          onClick={() => router.push('/')}
          className="mb-8 flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </button>

        <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Terminal className="w-5 h-5 text-slate-400" />
            <h1 className="text-2xl font-bold text-slate-100">Establish Connection</h1>
          </div>
          <p className="text-slate-400 text-sm mb-8">Initiate a secure transmission directly to my inbox.</p>

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-4" />
              <h3 className="text-xl font-medium text-slate-200">Transmission Successful</h3>
              <p className="text-slate-400 text-sm mt-2">I've received your message and sent an acknowledgment to your email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="Your Name" 
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-slate-500 transition-colors"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="Your Email Address" 
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-slate-500 transition-colors"
                />
              </div>
              <div>
                <textarea 
                  name="message" 
                  required 
                  rows={4}
                  placeholder="Message payload..." 
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-slate-500 transition-colors resize-none"
                />
              </div>
              
              {error && <p className="text-red-400 text-xs">{error}</p>}

              <button 
                type="submit" 
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-950 font-semibold rounded-lg px-4 py-3 text-sm hover:bg-slate-300 transition-colors disabled:opacity-50"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Transmit Payload"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}