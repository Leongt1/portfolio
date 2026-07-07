import { profile } from "@/data/profile";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const channels = [
  { label: "EMAIL", value: "noelgthomas28@gmail.com", href: `mailto:${profile.email}` },
  { label: "PHONE", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { label: "GITHUB", value: "github.com/Leongt1", href: profile.github },
  { label: "LINKEDIN", value: "in/noelgthomas", href: profile.linkedin },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-hud-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="COMMS" title="Contact" />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="space-y-1">
              <p className="text-hud-muted text-sm leading-relaxed mb-6 max-w-sm">
                Open to development roles and freelance work - got a cool project in mind?
                Send a transmission below, or reach me
                directly on any channel - all frequencies monitored.
              </p>
              <ul className="space-y-4">
                {channels.map((channel) => (
                  <li key={channel.label} className="flex items-baseline gap-4">
                    <span className="w-20 shrink-0 font-mono text-xs tracking-[0.2em] text-hud-cyan">
                      {channel.label}
                    </span>
                    <a
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="hud-underline font-mono text-sm text-hud-text break-all"
                    >
                      {channel.value}
                    </a>
                  </li>
                ))}
                <li className="flex items-baseline gap-4">
                  <span className="w-20 shrink-0 font-mono text-xs tracking-[0.2em] text-hud-cyan">
                    RÉSUMÉ
                  </span>
                  <a href={profile.resumeUrl} className="hud-underline font-mono text-sm text-hud-text">
                    DOWNLOAD PDF ↓
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="hud-clip-lg border border-hud-line border-t-2 border-t-hud-red bg-hud-panel p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
