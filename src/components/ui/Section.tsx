interface SectionProps {
  id?: string;
  bg?: 'surface' | 'background' | 'primary' | 'primary-dark' | 'primary-bg';
  children: React.ReactNode;
  className?: string;
}

const bgMap = {
  surface: 'bg-surface',
  background: 'bg-background',
  primary: 'bg-primary',
  'primary-dark': 'bg-primary-dark',
  'primary-bg': 'bg-primary-bg',
};

export function Section({ id, bg = 'surface', children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${bgMap[bg]} ${className}`}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}
