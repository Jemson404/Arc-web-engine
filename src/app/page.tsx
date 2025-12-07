import ChatInterface from "../components/ChatInterface";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black z-0 pointer-events-none" />

      <div className="z-10 w-full text-center pt-10">
        <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-2">ARC</h1>
        <p className="text-white/40 tracking-[0.1em] text-sm uppercase">Two Minds. One Pulse.</p>
      </div>

      <div className="z-10 w-full flex-1 flex items-center justify-center">
        <ChatInterface />
      </div>
    </main>
  );
}
