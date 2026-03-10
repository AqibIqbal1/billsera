export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 bg-grid-dark" />
      <div className="fixed inset-0 noise z-0" />
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}
