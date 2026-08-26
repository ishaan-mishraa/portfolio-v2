"use client";

import * as React from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Terminal, Briefcase, Search, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

// --- CUSTOM INLINE BRAND ICONS ---
// Bypassing Lucide's brand icon removal with direct, scalable SVGs
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs font-medium text-slate-400 backdrop-blur-md transition-colors hover:bg-slate-800 hover:text-slate-200 shadow-lg cursor-pointer"
      >
        <Terminal className="h-3.5 w-3.5 text-slate-400" />
        <span>Quick Menu</span>
        <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400 font-mono">⌘K</kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="bg-slate-950 text-slate-200">
          <div className="flex items-center border-b border-slate-800 px-3 py-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-slate-400" />
            <input
              autoFocus
              placeholder="Type a command or search..."
              className="flex h-6 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-slate-500 text-slate-200"
              onChange={(e) => {
                const cmdkInput = document.querySelector('[cmdk-input]') as HTMLInputElement;
                if (cmdkInput) {
                  cmdkInput.value = e.target.value;
                  cmdkInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
              }}
            />
          </div>

          <CommandList className="max-h-[300px] overflow-y-auto p-1">
            <CommandEmpty className="py-6 text-center text-sm text-slate-500">No results found.</CommandEmpty>
            
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <Terminal className="mr-2 h-4 w-4" />
                <span>Home</span>
              </CommandItem>
              <CommandItem onSelect={() => { setOpen(false); window.scrollTo({ top: 700, behavior: 'smooth' }); }}>
                <Briefcase className="mr-2 h-4 w-4" />
                <span>Experience & Projects</span>
              </CommandItem>
              <CommandItem onSelect={() => { setOpen(false); router.push("/contact"); }}>
                <Mail className="mr-2 h-4 w-4" />
                <span>Contact / Send Message</span>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator className="bg-slate-800 my-1" />

            <CommandGroup heading="Contact & Socials">
              <CommandItem onSelect={() => { setOpen(false); window.location.href = "mailto:ishaancodes01@gmail.com"; }}>
                <Mail className="mr-2 h-4 w-4" />
                <span>Email</span>
              </CommandItem>
              <CommandItem onSelect={() => { setOpen(false); window.open("https://github.com/ishaan-mishraa", "_blank"); }}>
                <GithubIcon className="mr-2 h-4 w-4" />
                <span>GitHub</span>
              </CommandItem>
              <CommandItem onSelect={() => { setOpen(false); window.open("https://www.linkedin.com/in/ishaanmishraa/", "_blank"); }}>
                <LinkedinIcon className="mr-2 h-4 w-4" />
                <span>LinkedIn</span>
              </CommandItem>
              <CommandItem onSelect={() => { setOpen(false); window.open("https://x.com/ishaanmishraa", "_blank"); }}>
                <XIcon className="mr-2 h-4 w-4" />
                <span>X (Twitter)</span>
              </CommandItem>
              <CommandItem onSelect={() => { setOpen(false); window.open("https://www.instagram.com/ishaanmxshra", "_blank"); }}>
                <InstagramIcon className="mr-2 h-4 w-4" />
                <span>Instagram</span>
              </CommandItem>
            </CommandGroup>
            
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}