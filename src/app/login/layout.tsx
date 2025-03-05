export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{
        alignContent: "center",
        height: "100svh",
        justifyItems: "center",
      }}
    >
      {children}
    </div>
  );
}
