export default function ServerLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
    return (
        <main>
          {children}
        </main>
    );
  }
  