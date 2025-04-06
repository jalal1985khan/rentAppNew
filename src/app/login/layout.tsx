export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary-dark">
      <div className="min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
} 