import { ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <div className="relative bg-surface-a0 text-white min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute -z-10 w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] bg-primary-a0 rounded-full blur-[120px] opacity-20 animate-pulse"></div>

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-bold text-primary-a10 leading-tight relative">
        Next-Gen Hosting
      </h1>
      <p className="mt-4 text-tonal-a40 text-lg md:text-xl max-w-md">
        Blazing fast, ultra-secure, and built for performance.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <button className="w-full min-w-[250px] sm:w-auto px-6 py-4 border border-primary-a10 bg-tonal-a10/40 text-white text-lg rounded-lg hover:bg-tonal-a10/60 transition">
          Get Started
        </button>
        <button className="w-full sm:w-auto px-6 py-4 border border-tonal-a40 text-tonal-a40 text-lg rounded-lg hover:bg-tonal-a20/30 transition">
          Learn More
        </button>
      </div>

      {/* Floating Elements for Depth */}
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-tonal-a20 blur-[60px] opacity-30"></div>
      <div className="absolute top-24 right-12 w-20 h-20 bg-primary-a30 blur-[80px] opacity-20"></div>

      <div className="absolute bottom-6 flex flex-col items-center animate-bounce">
        <ChevronDown className="w-8 h-8 text-tonal-a40 opacity-60 -mt-2" />
        <ChevronDown className="w-8 h-8 text-tonal-a40 opacity-90 mt-[-16px]" />
      </div>
    </div>
  );
}
