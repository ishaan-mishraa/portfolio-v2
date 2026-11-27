import { Document, Link, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";
import { ACHIEVEMENTS, EDUCATION, PROFILE, PUBLICATIONS } from "@/content/profile";
import type { ResumeData } from "@/lib/tailor";

const INK = "#111827";
const MUTED = "#4b5563";
const RULE = "#d1d5db";
const ACCENT = "#1e3a8a";

const s = StyleSheet.create({
  page: { paddingTop: 30, paddingBottom: 30, paddingHorizontal: 38, fontFamily: "Helvetica", fontSize: 9, color: INK, lineHeight: 1.3 },
  name: { fontFamily: "Helvetica-Bold", fontSize: 21, letterSpacing: 0.3, lineHeight: 1.15 },
  headline: { fontSize: 10.5, color: MUTED, marginTop: 3 },
  contact: { flexDirection: "row", flexWrap: "wrap", marginTop: 6, fontSize: 8.8, color: MUTED },
  contactItem: { marginRight: 10 },
  link: { color: ACCENT, textDecoration: "none" },
  section: { marginTop: 8 },
  sectionTitle: {
    fontFamily: "Helvetica-Bold", fontSize: 9.5, letterSpacing: 1.2, textTransform: "uppercase", color: ACCENT,
    borderBottomWidth: 0.7, borderBottomColor: RULE, paddingBottom: 2, marginBottom: 5,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  bold: { fontFamily: "Helvetica-Bold" },
  muted: { color: MUTED },
  item: { marginBottom: 4 },
  bullet: { flexDirection: "row", marginTop: 1.5 },
  dot: { width: 9, color: MUTED },
  bulletText: { flex: 1 },
  skillRow: { flexDirection: "row", marginBottom: 2 },
  skillLabel: { width: 100, fontFamily: "Helvetica-Bold" },
  footer: { position: "absolute", bottom: 16, left: 40, right: 40, fontSize: 7, color: "#9ca3af", textAlign: "center" },
});

function Bullet({ children }: { children: string }) {
  return (
    <View style={s.bullet}>
      <Text style={s.dot}>•</Text>
      <Text style={s.bulletText}>{children}</Text>
    </View>
  );
}

function ResumeDocument({ data }: { data: ResumeData }) {
  const host = PROFILE.site.replace(/^https?:\/\//, "");
  return (
    <Document title={`${PROFILE.name} – Resume`} author={PROFILE.name} subject={PROFILE.headline}>
      <Page size="A4" style={s.page}>
        <Text style={s.name}>{PROFILE.name}</Text>
        <Text style={s.headline}>{PROFILE.headline}</Text>
        <View style={s.contact}>
          <Text style={s.contactItem}>{PROFILE.location}</Text>
          <Link style={[s.contactItem, s.link]} src={`mailto:${PROFILE.email}`}>{PROFILE.email}</Link>
          <Link style={[s.contactItem, s.link]} src={PROFILE.site}>{host}</Link>
          <Link style={[s.contactItem, s.link]} src={PROFILE.links.github}>github.com/ishaan-mishraa</Link>
          <Link style={[s.contactItem, s.link]} src={PROFILE.links.linkedin}>linkedin.com/in/ishaanmishraa</Link>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Summary</Text>
          <Text>{PROFILE.summary}</Text>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Experience</Text>
          {data.experience.map((r) => (
            <View key={r.org} style={s.item} wrap={false}>
              <View style={s.row}>
                <Text style={s.bold}>{r.title}</Text>
                <Text style={s.muted}>{r.period}</Text>
              </View>
              <Text style={s.muted}>{r.org} · {r.location}</Text>
              {r.bullets.map((b) => <Bullet key={b.text}>{b.text}</Bullet>)}
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Projects & Research</Text>
          {data.projects.map((p) => (
            <View key={p.title} style={s.item} wrap={false}>
              <View style={s.row}>
                <Text>
                  <Text style={s.bold}>{p.title}</Text>
                  <Text style={s.muted}>  ·  {p.stack.join(", ")}</Text>
                </Text>
                {p.links[0] && <Link style={s.link} src={p.links[0].href}>{p.links[0].label}</Link>}
              </View>
              <Bullet>{p.summary}</Bullet>
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Skills</Text>
          {data.skills.map((g) => (
            <View key={g.label} style={s.skillRow}>
              <Text style={s.skillLabel}>{g.label}</Text>
              <Text style={{ flex: 1 }}>{g.items.map((i) => i.name).join(", ")}</Text>
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Publications</Text>
          {PUBLICATIONS.map((p) => (
            <Text key={p.citation} style={{ marginBottom: 2 }}>
              {p.citation} <Link style={s.link} src={p.href}>DOI</Link>
            </Text>
          ))}
        </View>

        <View style={s.section} wrap={false}>
          <Text style={s.sectionTitle}>Education</Text>
          {EDUCATION.map((e) => (
            <View key={e.title} style={s.row}>
              <Text>
                <Text style={s.bold}>{e.title}</Text>
                <Text style={s.muted}>  ·  {e.org}  ·  {e.detail}</Text>
              </Text>
              <Text style={s.muted}>{e.period}</Text>
            </View>
          ))}
        </View>

        <View style={s.section} wrap={false}>
          <Text style={s.sectionTitle}>Achievements</Text>
          {ACHIEVEMENTS.map((a) => <Bullet key={a}>{a}</Bullet>)}
        </View>

        <Text style={s.footer} fixed>
          Latest version: {host}/resume{data.tailored ? " · this copy was ordered for a specific job description" : ""}
        </Text>
      </Page>
    </Document>
  );
}

export function renderResumePdf(data: ResumeData): Promise<Buffer> {
  return renderToBuffer(<ResumeDocument data={data} />);
}
