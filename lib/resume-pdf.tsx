import { Document, Link, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";
import { PROFILE } from "@/content/profile";
import { FONT_MIN, resolveResume, type ResolvedResume, type ResolvedSection, type ResumeConfig } from "@/lib/resume-model";

// Layout mirrors the original LaTeX resume: sans-serif, 0.35in margins, centred header,
// ruled section titles, bold org + right-aligned date, italic role + italic location.
// Every size and gap scales with the base font size `f` so the page can be auto-fitted.

const MARGIN = 25; // 0.35in

function makeStyles(f: number) {
  return StyleSheet.create({
    page: { padding: MARGIN, fontFamily: "Helvetica", fontSize: f, color: "#000", lineHeight: 1.17 },
    name: { fontFamily: "Helvetica-Bold", fontSize: f * 2.4, textAlign: "center", lineHeight: 1.1 },
    contact: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", marginTop: f * 0.5, fontSize: f * 0.95 },
    link: { color: "#000", textDecoration: "underline" },
    sep: { marginHorizontal: f * 0.6 },
    section: { marginTop: f * 0.4 },
    sectionTitle: {
      fontFamily: "Helvetica-Bold", fontSize: f * 1.2, borderBottomWidth: 0.8, borderBottomColor: "#000",
      paddingBottom: f * 0.15, marginBottom: f * 0.3,
    },
    block: { paddingLeft: f, marginBottom: f * 0.25 },
    row: { flexDirection: "row", justifyContent: "space-between" },
    bold: { fontFamily: "Helvetica-Bold" },
    italic: { fontFamily: "Helvetica-Oblique", fontSize: f * 0.95 },
    bullets: { paddingLeft: f, marginTop: f * 0.1 },
    bullet: { flexDirection: "row" },
    dot: { width: f * 0.9 },
    bulletText: { flex: 1, fontSize: f * 0.93 },
    line: { paddingLeft: f, fontSize: f * 0.95, marginBottom: f * 0.05 },
  });
}
type S = ReturnType<typeof makeStyles>;

function Bullets({ s, items }: { s: S; items: string[] }) {
  if (!items.length) return null;
  return (
    <View style={s.bullets}>
      {items.map((t) => (
        <View key={t} style={s.bullet}>
          <Text style={s.dot}>•</Text>
          <Text style={s.bulletText}>{t}</Text>
        </View>
      ))}
    </View>
  );
}

function Sub({ s, l1, r1, l2, r2 }: { s: S; l1: string; r1: string; l2: string; r2: string }) {
  return (
    <View>
      <View style={s.row}>
        <Text style={s.bold}>{l1}</Text>
        <Text>{r1}</Text>
      </View>
      <View style={s.row}>
        <Text style={s.italic}>{l2}</Text>
        <Text style={s.italic}>{r2}</Text>
      </View>
    </View>
  );
}

function SectionBody({ s, f, sec }: { s: S; f: number; sec: ResolvedSection }) {
  switch (sec.kind) {
    case "education":
      return sec.items.map((e) => (
        <View key={e.id} style={s.block}>
          <Sub s={s} l1={e.school} r1={e.period} l2={`${e.degree} (${e.detail})`} r2={e.location} />
        </View>
      ));
    case "skills":
      return sec.items.map((g) => (
        <Text key={g.label} style={s.line}>
          <Text style={s.bold}>{g.label}</Text>: {g.names.join(", ")}
        </Text>
      ));
    case "experience":
    case "volunteer":
      return sec.items.map(({ role, bullets }) => (
        <View key={role.id} style={s.block} wrap={false}>
          <Sub s={s} l1={role.org} r1={role.period} l2={role.title} r2={role.location} />
          <Bullets s={s} items={bullets} />
        </View>
      ));
    case "projects":
      return sec.items.map(({ project: p, bullets }) => (
        <View key={p.id} style={s.block} wrap={false}>
          <View style={s.row}>
            <Text style={{ flex: 1, fontSize: f * 0.95 }}>
              <Text style={[s.bold, { fontSize: f }]}>{p.title}</Text>
              {"  |  "}
              <Text style={s.italic}>{p.stack.join(", ")}</Text>
              {p.links.map((l) => (
                <Text key={l.href}>
                  {"  |  "}
                  <Link style={s.link} src={l.href}>{l.label}</Link>
                </Text>
              ))}
            </Text>
            <Text>{p.year}</Text>
          </View>
          <Bullets s={s} items={bullets} />
        </View>
      ));
    case "publications":
      return sec.items.map(({ pub, bullets }) => (
        <View key={pub.id} style={s.block} wrap={false}>
          <View style={s.row}>
            <Text style={[s.bold, { flex: 1 }]}>
              {pub.title}
              {pub.href ? (
                <Text style={{ fontFamily: "Helvetica" }}>
                  {"  |  "}
                  <Link style={s.link} src={pub.href}>DOI</Link>
                </Text>
              ) : null}
            </Text>
            <Text>{pub.date}</Text>
          </View>
          <Bullets s={s} items={bullets} />
        </View>
      ));
    case "achievements":
      return sec.items.map((a) => (
        <Text key={a.id} style={s.line}>
          <Text style={s.bold}>{a.lead}</Text>: {a.text}
        </Text>
      ));
  }
}

function ResumeDocument({ data, f }: { data: ResolvedResume; f: number }) {
  const s = makeStyles(f);
  return (
    <Document title={`${PROFILE.name} – Resume`} author={PROFILE.name}>
      <Page size="A4" style={s.page}>
        <Text style={s.name}>{PROFILE.name}</Text>
        {data.contacts.length > 0 && (
          <View style={s.contact}>
            {data.contacts.flatMap((c, i) => [
              ...(i > 0 ? [<Text key={`sep-${i}`} style={s.sep}>|</Text>] : []),
              <Link key={c.href} style={s.link} src={c.href}>{c.label}</Link>,
            ])}
          </View>
        )}
        {data.sections.map((sec) => (
          <View key={sec.kind} style={s.section}>
            <Text style={s.sectionTitle} minPresenceAhead={f * 3}>{sec.title}</Text>
            <SectionBody s={s} f={f} sec={sec} />
          </View>
        ))}
      </Page>
    </Document>
  );
}

const countPages = (pdf: Buffer) => (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;

async function renderAt(data: ResolvedResume, f: number) {
  const pdf = await renderToBuffer(<ResumeDocument data={data} f={f} />);
  return { pdf, pages: countPages(pdf), fontSize: f };
}

export type RenderResult = { pdf: Buffer; pages: number; fontSize: number; fits: boolean };

/**
 * Renders the layout at its chosen font size; if that exceeds the page limit,
 * binary-searches the largest size (down to FONT_MIN) that fits. If nothing fits,
 * returns the smallest attempt with fits=false so the studio can say so.
 */
export async function renderResume(config: ResumeConfig): Promise<RenderResult> {
  const data = resolveResume(config);
  const limit = config.pages;
  const first = await renderAt(data, config.fontSize);
  if (first.pages <= limit) return { ...first, fits: true };

  const floor = await renderAt(data, FONT_MIN);
  if (floor.pages > limit) return { ...floor, fits: false };

  let lo = FONT_MIN;
  let hi = config.fontSize;
  let best = floor;
  for (let i = 0; i < 6 && hi - lo > 0.05; i++) {
    const mid = Math.round(((lo + hi) / 2) * 100) / 100;
    const r = await renderAt(data, mid);
    if (r.pages <= limit) {
      best = r;
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return { ...best, fits: true };
}
