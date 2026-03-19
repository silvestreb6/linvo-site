export function DecoCircle({ className }: { className: string }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
