import type { Metadata } from "next";
import { hasStudioSession } from "@/lib/studio-auth";
import { StudioLogin } from "@/components/studio-login";
import { ResumeStudio } from "@/components/resume-studio";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default async function StudioPage() {
  const authed = await hasStudioSession();
  return (
    <main className="relative min-h-screen w-full bg-slate-950 px-6 pb-20 pt-28 font-sans">
      {authed ? <ResumeStudio /> : <StudioLogin />}
    </main>
  );
}
