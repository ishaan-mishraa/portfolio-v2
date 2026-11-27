import { Download } from "lucide-react";
import { ResumePreview } from "@/components/resume-preview";
import { defaultResume } from "@/lib/tailor";

// Public resume page: the standard resume, preview + download.
export function ResumeView() {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
      <ResumePreview data={defaultResume()} />

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <h2 className="font-serif text-2xl text-slate-100">Resume</h2>
          <p className="mt-1 text-sm text-slate-400">Generated from this site, so it&apos;s always the latest version.</p>
          <a
            href="/api/resume"
            className="mt-5 flex items-center justify-center gap-2 rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-white"
          >
            <Download className="h-4 w-4" /> Download PDF
          </a>
        </div>
      </aside>
    </div>
  );
}
