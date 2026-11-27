import type { Metadata } from "next";
import { ResumeView } from "@/components/resume-view";

export const metadata: Metadata = {
  title: "Resume · Ishaan Mishra",
  description: "Download Ishaan Mishra's latest resume, or a version ordered for a specific job description.",
};

export default function ResumePage() {
  return (
    <main className="relative min-h-screen w-full bg-slate-950 px-6 pb-20 pt-28 font-sans selection:bg-sky-500/30">
      <ResumeView />
    </main>
  );
}
