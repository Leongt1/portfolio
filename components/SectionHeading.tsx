type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

export default function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <p className="font-mono text-sm tracking-[0.25em] text-hud-cyan">
        {"// "}
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl sm:text-4xl font-semibold uppercase tracking-wide">
        {title}
      </h2>
      <div className="mt-4 h-px w-24 bg-hud-red" aria-hidden />
    </div>
  );
}
