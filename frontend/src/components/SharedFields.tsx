type SharedFieldsProps = {
  email: string;
  password: string;
  sheetName: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setSheetName: (value: string) => void;
};

export function SharedFields({
  email,
  password,
  sheetName,
  setEmail,
  setPassword,
  setSheetName,
}: SharedFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="flex flex-col gap-2 text-sm text-[#532331]">
        Sender Email
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-md border border-[#b11f3c]/30 bg-white px-3 py-2 outline-none focus:border-[#b11f3c]"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-[#532331]">
        Password / App Password
        <input
          required
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-md border border-[#b11f3c]/30 bg-white px-3 py-2 outline-none focus:border-[#b11f3c]"
        />
      </label>

      <label className="sm:col-span-2 flex flex-col gap-2 text-sm text-[#532331]">
        Sheet Name
        <input
          value={sheetName}
          onChange={(event) => setSheetName(event.target.value)}
          className="rounded-md border border-[#b11f3c]/30 bg-white px-3 py-2 outline-none focus:border-[#b11f3c]"
        />
      </label>
    </div>
  );
}
