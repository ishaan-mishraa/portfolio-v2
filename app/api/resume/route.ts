import { renderResumePdf } from "@/lib/resume-pdf";
import { defaultResume, tailorResume } from "@/lib/tailor";

const MAX_JD_CHARS = 20_000;

function pdfResponse(pdf: Buffer, filename: string) {
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

// GET /api/resume -> the default, always-current resume
export async function GET() {
  const pdf = await renderResumePdf(defaultResume());
  return pdfResponse(pdf, "Ishaan_Mishra_Resume.pdf");
}

// POST /api/resume { jd: string } -> resume ordered for that job description
export async function POST(request: Request) {
  let jd = "";
  try {
    const body = await request.json();
    jd = typeof body?.jd === "string" ? body.jd : "";
  } catch {
    return Response.json({ error: "Send JSON like { \"jd\": \"...\" }." }, { status: 400 });
  }
  if (jd.trim().length < 30) {
    return Response.json({ error: "Paste a longer job description (at least a few sentences)." }, { status: 400 });
  }
  if (jd.length > MAX_JD_CHARS) jd = jd.slice(0, MAX_JD_CHARS);

  const pdf = await renderResumePdf(tailorResume(jd));
  return pdfResponse(pdf, "Ishaan_Mishra_Resume_Tailored.pdf");
}
