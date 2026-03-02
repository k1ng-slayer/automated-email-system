type AppHeaderProps = {
  title: string;
};

export function AppHeader({ title }: AppHeaderProps) {
  return (
    <header className="rounded-3xl border border-[#b11f3c]/25 bg-white p-6 shadow-[0_10px_40px_rgba(177,31,60,0.12)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#b11f3c]">
            Automated Email System
          </p>
          <h1 className="text-2xl font-bold text-[#5a1020]">{title}</h1>
        </div>

        <div className="flex items-start gap-3">
          <img
            src="/kjsieit-logo.jpg"
            alt="K J Somaiya Institute of Engineering and Information Technology"
            className="h-12 w-auto rounded-md bg-white p-1 sm:h-14"
          />
        </div>
      </div>
    </header>
  );
}
