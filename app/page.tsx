import React from "react";
import { Badge } from "@/components/ui/badge";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Download, Briefcase, GraduationCap, ExternalLink, Users } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-slate-950 font-sans selection:bg-slate-800 overflow-x-hidden pb-8">
      
      {/* --- HERO SECTION --- */}
      <div className="relative flex h-screen w-full flex-col items-center justify-center shrink-0">
        
        {/* The Interactive Ripple Layer */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <BackgroundRippleEffect />
        </div>
        
        {/* The Hero Content Layer */}
        <div className="relative z-20 w-full max-w-3xl px-6 flex flex-col items-center pointer-events-none">
          
          <h1 className="text-center text-5xl md:text-7xl font-bold text-slate-100 tracking-tight pointer-events-auto">
            Ishaan Mishra
          </h1>
          
          <div className="mt-6 max-w-2xl text-center pointer-events-auto">
            <TextGenerateEffect 
              words="Systems Engineer @ TCS. Architecting robust backend infrastructure and machine learning solutions." 
              className="text-slate-400 text-base md:text-xl"
            />
          </div>

          {/* Primary CTA: Resume Download */}
          <div className="mt-10 flex justify-center pointer-events-auto">
            <a 
              href="https://drive.google.com/file/d/1V1ghArc0dQvUj0DF1DAYypKFIMZQCM2_/view?usp=drive_link" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-2 rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-slate-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              Download Resume
            </a>
          </div>

          {/* Technical Badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-10 pointer-events-auto">
            <Badge variant="outline" className="bg-slate-900/50 text-slate-300 border-slate-700 backdrop-blur-sm px-3 py-1 cursor-pointer hover:bg-slate-800 transition-colors">Java</Badge>
            <Badge variant="outline" className="bg-slate-900/50 text-slate-300 border-slate-700 backdrop-blur-sm px-3 py-1 cursor-pointer hover:bg-slate-800 transition-colors">SpringBoot</Badge>
            <Badge variant="outline" className="bg-slate-900/50 text-slate-300 border-slate-700 backdrop-blur-sm px-3 py-1 cursor-pointer hover:bg-slate-800 transition-colors">Angular</Badge>
            <Badge variant="outline" className="bg-slate-900/50 text-slate-300 border-slate-700 backdrop-blur-sm px-3 py-1 cursor-pointer hover:bg-slate-800 transition-colors">Next.js</Badge>
            <Badge variant="outline" className="bg-slate-900/50 text-slate-300 border-slate-700 backdrop-blur-sm px-3 py-1 cursor-pointer hover:bg-slate-800 transition-colors">Node.js</Badge>
            <Badge variant="outline" className="bg-slate-900/50 text-slate-300 border-slate-700 backdrop-blur-sm px-3 py-1 cursor-pointer hover:bg-slate-800 transition-colors">Python</Badge>
            <Badge variant="outline" className="bg-slate-900/50 text-slate-300 border-slate-700 backdrop-blur-sm px-3 py-1 cursor-pointer hover:bg-slate-800 transition-colors">Machine Learning</Badge>
          </div>

        </div>
      </div>

      {/* --- KEY HIGHLIGHTS: BENTO GRID --- */}
      <div className="relative z-20 w-full max-w-5xl px-6 mx-auto mt-12 pointer-events-auto">
        <h2 className="text-2xl font-bold text-slate-100 mb-6">Key Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <Card className="md:col-span-2 bg-slate-900/40 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-100">Systems Engineer @ TCS</CardTitle>
              <CardDescription className="text-slate-400">Digital • Grade C1</CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300 text-sm leading-relaxed">
              Recently completed the rigorous Initial Learning Program (ILP). Currently transitioning into enterprise-scale backend development, focusing on scalable infrastructure design, secure API integrations, and modern deployment workflows.
            </CardContent>
          </Card>

          <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm flex flex-col">
            <CardHeader>
              <CardTitle className="text-slate-100">KIIT University</CardTitle>
              <CardDescription className="text-slate-400">B.Tech Computer Science</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-start justify-end flex-grow pb-6">
              <h3 className="text-6xl font-bold text-slate-100 tracking-tighter">9.37</h3>
              <p className="text-slate-400 text-sm mt-1 font-medium">CGPA</p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 bg-slate-900/40 border-slate-800 backdrop-blur-sm flex flex-col">
            <CardHeader>
              <CardTitle className="text-slate-100">
                <a 
                  href="https://cricmarket.ishaanm.dev" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-sky-400 transition-colors flex items-center gap-2 w-fit"
                >
                  CricMarket <ExternalLink className="w-4 h-4" />
                </a>
              </CardTitle>
              <CardDescription className="text-slate-400">The "Transfermarkt for Cricket"</CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300 text-sm leading-relaxed flex-grow">
              <p className="mb-4">
                Engineered a financial and statistical database for global franchise economies. Designed a high-performance monorepo architecture featuring a Next.js UI, an edge-deployed Hono API, and an automated Python data pipeline leveraging GitHub Actions for nightly Supabase ingestion.
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                <Badge variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700 border-none text-xs">Next.js</Badge>
                <Badge variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700 border-none text-xs">Hono</Badge>
                <Badge variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700 border-none text-xs">Cloudflare Workers</Badge>
                <Badge variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700 border-none text-xs">Python</Badge>
                <Badge variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700 border-none text-xs">Supabase</Badge>
                <Badge variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700 border-none text-xs">GitHub Actions</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm flex flex-col">
            <CardHeader>
              <CardTitle className="text-slate-100">Research & Pubs</CardTitle>
              <CardDescription className="text-slate-400">ICTIS 2026 • Bangkok</CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300 text-sm leading-relaxed flex-grow">
              Authored and presented a comparative study utilizing emerging deep learning models for the binary classification of brain tumor detection.
            </CardContent>
          </Card>
        </div>
      </div>

      {/* --- TIMELINE SECTION --- */}
      <div className="relative z-20 w-full max-w-5xl px-6 mx-auto mt-24 pointer-events-auto">
        <h2 className="text-2xl font-bold text-slate-100 mb-10">Journey</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* Experience Column */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-slate-400"/> Experience
            </h3>
            
            <div className="border-l-2 border-slate-800 ml-3 pl-8 py-2 flex flex-col gap-10">
              
              {/* TCS Block */}
              <div className="relative">
                <div className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-2 border-slate-400 bg-slate-950 ring-4 ring-slate-950" />
                <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm shadow-none">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-slate-100 text-base">Systems Engineer (Digital)</CardTitle>
                    <CardDescription className="text-slate-400">TCS • Current • Banagalore, Karnataka</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-slate-300 text-xs leading-relaxed">
                    Completed ILP and transitioned into enterprise-scale backend and deployment workflows.
                  </CardContent>
                </Card>
              </div>

              {/* DRDO Block */}
              <div className="relative">
                <div className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-2 border-slate-800 bg-slate-950 ring-4 ring-slate-950" />
                <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm shadow-none">
                  <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-slate-100 text-base">Research Intern</CardTitle>
                      <CardDescription className="text-slate-400">ADRDE, DRDO • May-June 2024• Agra, UP, India</CardDescription>
                    </div>
                    <a 
                      href="https://drive.google.com/file/d/1DnLuerQ-N-id9Y5GgoMB3BZC9brV87U-/view?usp=sharing" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-sky-400 hover:underline flex items-center gap-1"
                    >
                      Certificate <ExternalLink className="w-3 h-3" />
                    </a>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-slate-300 text-xs leading-relaxed space-y-2">
                    <p>• Created a versatile service for plotting 2D and 3D graphs, enabling users to visualize complex data easily.</p>
                    <p>• Utilized Plotly.js for dynamic 2D/3D data visualizations.</p>
                    <p>• Implemented Three.js and Cesium.js for interactive 3D graphics, maps, and globes within the browser.</p>
                    <p>• Designed systems to handle diverse datasets and file formats using Papa-parser and parsing utilities.</p>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>

          {/* Education Column */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-slate-400"/> Education
            </h3>
            
            <div className="border-l-2 border-slate-800 ml-3 pl-8 py-2 flex flex-col gap-10">
              {/* GATE Exam Block */}
              <div className="relative">
                <div className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-2 border-slate-400 bg-slate-950 ring-4 ring-slate-950" />
                <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm shadow-none">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-slate-100 text-base">GATE Computer Science</CardTitle>
                    <CardDescription className="text-slate-400">Cleared 2025, 2026 • 96+ Percentile (2026)</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              {/* KIIT Block */}
              <div className="relative">
                <div className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-2 border-slate-800 bg-slate-950 ring-4 ring-slate-950" />
                <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm shadow-none">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-slate-100 text-base">KIIT University</CardTitle>
                    <CardDescription className="text-slate-400">B.Tech, Computer Science & Engineering • 2022-26 • CGPA: 9.37</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              {/* 12th School Block */}
              <div className="relative">
                <div className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-2 border-slate-800 bg-slate-950 ring-4 ring-slate-950" />
                <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm shadow-none">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-slate-100 text-base">12th Grade</CardTitle>
                    <CardDescription className="text-slate-400">Vivekanand Mission Vidyapeeth, Madhubani, Bihar, India</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              {/* 10th School Block */}
              <div className="relative">
                <div className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-2 border-slate-800 bg-slate-950 ring-4 ring-slate-950" />
                <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm shadow-none">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-slate-100 text-base">10th Grade</CardTitle>
                    <CardDescription className="text-slate-400">Delhi Public School, Biratnagar, Nepal</CardDescription>
                  </CardHeader>
                </Card>
              </div>

            </div>
          </div>

          {/* Volunteering Column */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-400"/> Volunteering
            </h3>
            
            <div className="border-l-2 border-slate-800 ml-3 pl-8 py-2 flex flex-col gap-10">
              
              {/* Enactus Block */}
              <div className="relative">
                <div className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-2 border-slate-400 bg-slate-950 ring-4 ring-slate-950" />
                <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm shadow-none">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-slate-100 text-base">Technical Team Member</CardTitle>
                    <CardDescription className="text-slate-400">Enactus KIIT • Mar 2023 – Jan 2025</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-slate-300 text-xs leading-relaxed space-y-2">
                    <p>• Ideated and executed technical projects for social entrepreneurship.</p>
                    <p>• Built web apps for Enactus initiatives and participated in National Expositions 2023 & 2024.</p>
                    <p>• Won 2024 Early Stage Category at Enactus Nationals.</p>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>

        </div>
      </div>
      
      {/* --- FOOTER SECTION --- */}
      <footer className="relative z-20 w-full max-w-5xl mx-auto px-6 mt-24 pb-8">
        <div className="border-t border-slate-800/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-slate-500 text-sm text-center md:text-left">
            <p>© {new Date().getFullYear()} Ishaan Mishra. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="https://github.com/ishaan-mishraa" target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors flex items-center gap-1">
              GitHub <span className="text-slate-600">↗</span>
            </a>
            <a href="https://www.linkedin.com/in/ishaanmishraa/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors flex items-center gap-1">
              LinkedIn <span className="text-slate-600">↗</span>
            </a>
            <a href="https://x.com/ishaanmishraa" target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors flex items-center gap-1">
              X <span className="text-slate-600">↗</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-2 text-slate-500 text-xs">
            <span>Built with</span>
            <Badge variant="outline" className="bg-slate-900/40 border-slate-800 text-slate-400 px-2 py-0.5 rounded-full">Next.js</Badge>
            <Badge variant="outline" className="bg-slate-900/40 border-slate-800 text-slate-400 px-2 py-0.5 rounded-full">Tailwind</Badge>
          </div>
        </div>
      </footer>
      
    </main>
  );
}