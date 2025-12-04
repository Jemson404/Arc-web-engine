import NavigationCube from "@/components/NavigationCube";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a14] via-[#0d0d1a] to-[#0a0a14] flex flex-col overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/3 rounded-full blur-[120px]" />
      </div>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12 pb-24">
        <NavigationCube />
      </main>
    </div>
  );
}
