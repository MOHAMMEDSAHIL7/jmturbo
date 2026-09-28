export default function Navbar() {
  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 rounded-full border border-white/15 bg-black/60 px-8 py-3 backdrop-blur-md">
      <a href="/" className="font-bold tracking-widest">
        JM<span className="text-accent">TURBO</span>
      </a>
      <a href="#cars" className="text-sm text-white/70 hover:text-white">Cars</a>
      <a href="#learn" className="text-sm text-white/70 hover:text-white">Learn</a>
      <a href="#garages" className="text-sm text-white/70 hover:text-white">Garages</a>
      <a href="#book" className="rounded-full bg-accent px-4 py-1 text-sm font-semibold">Book</a>
    </nav>
  );
}