export const profile = {
  name: "Noel George Thomas",
  role: "Full-Stack Developer",
  stackLine: "Go / Flutter / React",
  tagline:
    "Hey, I'm Noel 👋 I love taking an idea and turning it into something real that people actually use. These days that means Go backends, Flutter apps and React frontends — and having a genuinely good time building them.",
  location: "Bengaluru, India",
  email: "noelgthomas28@gmail.com",
  phone: "+91 83173 80313",
  github: "https://github.com/Leongt1",
  linkedin: "https://www.linkedin.com/in/noelgthomas/",
  // stable route → redirects to the Drive-hosted PDF (see next.config.ts)
  resumeUrl: "/resume",
  stats: [
    { value: 2, suffix: "+", label: "YRS EXPERIENCE" },
    { value: 1, suffix: "K+", label: "APP USERS" },
    { value: 60, suffix: "%", label: "COMMS AUTOMATED" },
  ],
} as const;
