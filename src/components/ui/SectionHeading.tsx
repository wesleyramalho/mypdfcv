interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <h2
      className={`text-text-subtle font-sans text-xs font-bold tracking-widest uppercase ${className}`}
    >
      {children}
    </h2>
  );
}
