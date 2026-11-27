import { Document, Link, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";
import { ACHIEVEMENTS, EDUCATION, PROFILE, PUBLICATIONS } from "@/content/profile";
import type { ResumeData } from "@/lib/tailor";

// Layout mirrors the original LaTeX resume: sans-serif, 0.35in margins, centred header,
// ruled section titles, bold org + right-aligned date, italic role + italic location.

const MARGIN = 25; // 0.35in

const s = StyleSheet.create({
  page: { padding: MARGIN, fontFamily: "Helvetica", fontSize: 10, color: "#000", lineHeight: 1.17 },
  name: { fontFamily: "Helvetica-Bold", fontSize: 24, textAlign: "center", lineHeight: 1.1 },
  contact: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", marginTop: 5, fontSize: 9.5 },
  link: { color: "#000", textDecoration: "underline" },
  sep: { marginHorizontal: 6 },
  section: { marginTop: 4 },
  sectionTitle: {
    fontFamily: "Helvetica-Bold", fontSize: 12, borderBottomWidth: 0.8, borderBottomColor: "#000",
    paddingBottom: 1.5, marginBottom: 3,
  },
  block: { paddingLeft: 10, marginBottom: 2.5 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  bold: { fontFamily: "Helvetica-Bold" },
  italic: { fontFamily: "Helvetica-Oblique", fontSize: 9.5 },
  bullets: { paddingLeft: 10, marginTop: 1 },
  bullet: { flexDirection: "row" },
  dot: { width: 9 },
  bulletText: { flex: 1, fontSize: 9.3 },
  line: { paddingLeft: 10, fontSize: 9.5, marginBottom: 0.5 },
});

function Bullets({ items }: { items: string[] }) {
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

function Subheading({ left1, right1, left2, right2 }: { left1: string; right1: string; left2: string; right2: string }) {
  return (
    <View>
      <View style={s.row}>
        <Text style={s.bold}>{left1}</Text>
        <Text>{right1}</Text>
      </View>
      <View style={s.row}>
        <Text style={s.italic}>{left2}</Text>
        <Text style={s.italic}>{right2}</Text>
      </View>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle} minPresenceAhead={30}>{title}</Text>
      {children}
    </View>
  );
}

function ResumeDocument({ data }: { data: ResumeData }) {
  const host = PROFILE.site.replace(/^https?:\/\//, "");
  const work = data.experience.filter((r) => r.category === "work");
  const volunteer = data.experience.filter((r) => r.category === "volunteer");
  const contacts = [
    { label: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { label: host, href: PROFILE.site },
    { label: "linkedin.com/in/ishaanmishraa", href: PROFILE.links.linkedin },
    { label: "github.com/ishaan-mishraa", href: PROFILE.links.github },
  ];

  return (
    <Document title={`${PROFILE.name} – Resume`} author={PROFILE.name}>
      <Page size="A4" style={s.page}>
        <Text style={s.name}>{PROFILE.name}</Text>
        <View style={s.contact}>
          {contacts.flatMap((c, i) => [
            ...(i > 0 ? [<Text key={`sep-${i}`} style={s.sep}>|</Text>] : []),
            <Link key={c.href} style={s.link} src={c.href}>{c.label}</Link>,
          ])}
        </View>

        <Section title="Education">
          {EDUCATION.map((e) => (
            <View key={e.school} style={s.block}>
              <Subheading left1={e.school} right1={e.period} left2={`${e.degree} (${e.detail})`} right2={e.location} />
            </View>
          ))}
        </Section>

        <Section title="Technical Skills">
          {data.skills.map((g) => (
            <Text key={g.label} style={s.line}>
              <Text style={s.bold}>{g.label}</Text>: {g.items.map((i) => i.name).join(", ")}
            </Text>
          ))}
        </Section>

        <Section title="Experience">
          {work.map((r) => (
            <View key={r.org} style={s.block} wrap={false}>
              <Subheading left1={r.org} right1={r.period} left2={r.title} right2={r.location} />
              <Bullets items={r.bullets.map((b) => b.text)} />
            </View>
          ))}
        </Section>

        <Section title="Projects">
          {data.projects.map((p) => (
            <View key={p.title} style={s.block} wrap={false}>
              <View style={s.row}>
                <Text style={{ flex: 1, fontSize: 9.5 }}>
                  <Text style={[s.bold, { fontSize: 10 }]}>{p.title}</Text>
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
              <Bullets items={p.bullets.map((b) => b.text)} />
            </View>
          ))}
        </Section>

        <Section title="Publications">
          {PUBLICATIONS.map((p) => (
            <View key={p.title} style={s.block} wrap={false}>
              <View style={s.row}>
                <Text style={[s.bold, { flex: 1 }]}>
                  {p.title}
                  {p.href ? (
                    <Text style={{ fontFamily: "Helvetica" }}>
                      {"  |  "}
                      <Link style={s.link} src={p.href}>DOI</Link>
                    </Text>
                  ) : null}
                </Text>
                <Text>{p.date}</Text>
              </View>
              <Bullets items={p.bullets} />
            </View>
          ))}
        </Section>

        {volunteer.length > 0 && (
          <Section title="Volunteer Experience">
            {volunteer.map((r) => (
              <View key={r.org} style={s.block} wrap={false}>
                <Subheading left1={r.org} right1={r.period} left2={r.title} right2={r.location} />
                <Bullets items={r.bullets.map((b) => b.text)} />
              </View>
            ))}
          </Section>
        )}

        <Section title="Achievements">
          {ACHIEVEMENTS.map((a) => (
            <Text key={a.lead} style={s.line}>
              <Text style={s.bold}>{a.lead}</Text>: {a.text}
            </Text>
          ))}
        </Section>

      </Page>
    </Document>
  );
}

export function renderResumePdf(data: ResumeData): Promise<Buffer> {
  return renderToBuffer(<ResumeDocument data={data} />);
}
