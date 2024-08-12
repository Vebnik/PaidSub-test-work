import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <span className="text-default-600">Special for</span>
        <div className="mx-1" />
        <p className="text-primary">PaidSub Testwork</p>
      </footer>
    </div>
  );
}
