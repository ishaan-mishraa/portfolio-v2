import { cookies } from "next/headers";
import { renderResumePdf } from "@/lib/resume-pdf";
import { buildResume, defaultResume } from "@/lib/tailor";
import { STUDIO_COOKIE, isValidSession } from "@/lib/studio-auth";

const MAX_JD_CHARS = 20_000;

function pdfResponse(pdf: Buffer, filename: string) {
  // Rough page count so the studio can warn when a version spills onto page 2.
  const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
      "X-Resume-Pages": String(pages),
    },
  });
}

// GET /api/resume -> the standard, always-current resume (public)
export async function GET() {
  return pdfResponse(await renderResumePdf(defaultResume()), "Ishaan_Mishra_Resume.pdf");
}

const strings = (v: unknown, max: number) =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string").slice(0, max) : undefined;

// POST /api/resume -> customised resume. Owner only (studio session cookie).
export async function POST(request: Request) {
  if (!isValidSession((await cookies()).get(STUDIO_COOKIE)?.value)) {
    return Response.json({ error: "Not authorised." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return Response.json({ error: "Invalid request." }, { status: 400 });

  const jd = typeof body.jd === "string" ? body.jd.slice(0, MAX_JD_CHARS) : "";
  const company = typeof body.company === "string" ? body.company.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 40) : "";

  const data = buildResume({ jd, projects: strings(body.projects, 10), hiddenBullets: strings(body.hiddenBullets, 50) });
  return pdfResponse(await renderResumePdf(data), `Ishaan_Mishra_Resume${company ? `_${company}` : ""}.pdf`);
}
