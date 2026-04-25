export default function AuthLayout({ children }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--black)] p-4">
      {children}
    </div>
  );
}
