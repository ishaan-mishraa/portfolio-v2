import { cookies } from "next/headers";
import { renderResume, type RenderResult } from "@/lib/resume-pdf";
import { defaultConfig, normalizeConfig } from "@/lib/resume-model";
import { STUDIO_COOKIE, isValidSession } from "@/lib/studio-auth";

function pdfResponse(r: RenderResult, filename: string) {
  return new Response(new Uint8Array(r.pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
      "X-Resume-Pages": String(r.pages),
      "X-Resume-Font-Size": r.fontSize.toFixed(2),
      "X-Resume-Fits": String(r.fits),
    },
  });
}

// GET /api/resume -> the standard, always-current resume (public)
export async function GET() {
  return pdfResponse(await renderResume(defaultConfig()), "Ishaan_Mishra_Resume.pdf");
}

// POST /api/resume { config, company } -> custom layout. Owner only (studio session cookie).
export async function POST(request: Request) {
  if (!isValidSession((await cookies()).get(STUDIO_COOKIE)?.value)) {
    return Response.json({ error: "Not authorised." }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return Response.json({ error: "Invalid request." }, { status: 400 });

  const config = normalizeConfig(body.config); // drops unknown ids, clamps font size and pages
  const company =
    typeof body.company === "string" ? body.company.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 40) : "";

  return pdfResponse(await renderResume(config), `Ishaan_Mishra_Resume${company ? `_${company}` : ""}.pdf`);
}
