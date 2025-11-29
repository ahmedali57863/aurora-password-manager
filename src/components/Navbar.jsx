import React, { useRef, useState, useEffect } from 'react'
import { FaGithub, FaSignOutAlt } from 'react-icons/fa'
import { useNavigate, Link } from 'react-router-dom'

// Minimal inline icon components to avoid extra dependencies
const Home = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 21V12h14v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const User = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Mail = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M3 8.5v7A2.5 2.5 0 0 0 5.5 18h13A2.5 2.5 0 0 0 21 15.5v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 8.5l-9 6-9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const X = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 6l12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Menu = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M3 6h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 12h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Navbar = () => {
  const canvasRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  // Canvas Animation Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    // Initialize particles for the data stream effect
    const initParticles = () => {
      particles = [];
      const particleCount = 20; // Number of "data bits"
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: Math.random() * 2 + 0.5,
          length: Math.random() * 20 + 5,
          color: `rgba(0, 255, 255, ${Math.random() * 0.5})`, // Cyan color
          thickness: Math.random() * 2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background grid lines (optional, adds to futuristic feel)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;

      // Horizontal subtle lines
      for (let i = 0; i < canvas.height; i += 10) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw moving particles
      particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#00ffff';

        ctx.beginPath();
        // Draw a glowing trail/rect
        ctx.rect(p.x, p.y, p.length, p.thickness);
        ctx.fill();

        // Update position
        p.x += p.speed;

        // Reset if off screen
        if (p.x > canvas.width) {
          p.x = -p.length;
          p.y = Math.random() * canvas.height;
        }
      });

      // Reset shadow for next frame to avoid performance hit
      ctx.shadowBlur = 0;

      animationFrameId = window.requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    initParticles();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed left-0 right-0 z-50 flex justify-center px-4 top-6">
      {/* Container:
        - Glassmorphism: backdrop-blur, bg-opacity
        - Shape: Rounded full (pill), border
        - Glow: shadow-lg, shadow-cyan-500/20
      */}
      <div className="relative flex items-center justify-between w-full max-w-2xl h-16 rounded-full border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,255,0.1)] overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,255,0.2)]">

        {/* The Futuristic Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
        />

        {/* Left Side: Logo */}
        <Link to="/manager" className="relative z-10 flex items-center gap-2 pl-8 transition-opacity cursor-pointer hover:opacity-80">
          <span className="text-xl tracking-widest text-transparent font-brokeren bg-clip-text bg-gradient-to-r from-purple-500 to-fuchsia-500">
            AURORA
          </span>
        </Link>

        {/* Right Side: Desktop Menu */}
        <div className="relative z-10 items-center hidden gap-6 pr-8 md:flex">
          {/* <NavButton icon={<Home size={16} />} label="Home" /> */}
          <a href="https://github.com/ahmedali57863" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 text-gray-400 hover:text-white hover:bg-white/5">
            <span className="transition-transform duration-300 group-hover:scale-110"><FaGithub size={16} /></span>
            <span className="text-sm font-medium tracking-wide">GitHub</span>
          </a>

          <Link to="/about" className="group flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 text-gray-400 hover:text-white hover:bg-white/5">
            <span className="transition-transform duration-300 group-hover:scale-110"><User size={16} /></span>
            <span className="text-sm font-medium tracking-wide">About</span>
          </Link>

          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 text-red-400 hover:text-red-300 hover:bg-white/5">
            <span className="transition-transform duration-300 group-hover:scale-110"><FaSignOutAlt size={16} /></span>
            <span className="text-sm font-medium tracking-wide">Logout</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative z-10 pr-6 transition-colors md:hidden text-white/80 hover:text-cyan-400"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Dropdown (Simulated inside the pill for slickness or outside) */}
        {/* For this specific futuristic pill design, we usually keep mobile menu separate or expand the pill. 
            Here, simple absolute positioning for mobile fallback. */}
      </div>

      {/* Mobile Menu Dropdown (Outside the pill) */}
      {isMobileMenuOpen && (
        <div className="absolute flex flex-col w-full max-w-sm gap-2 p-4 border top-20 bg-black/80 backdrop-blur-xl border-white/10 rounded-2xl md:hidden animate-in fade-in slide-in-from-top-5">
          <Link to="/manager" className="flex items-center w-full gap-3 p-3 text-gray-300 transition-all rounded-xl hover:bg-cyan-500/10 hover:text-cyan-400">
            <Home size={18} />
            <span className="font-medium">Home</span>
          </Link>
          <Link to="/about" className="flex items-center w-full gap-3 p-3 text-gray-300 transition-all rounded-xl hover:bg-cyan-500/10 hover:text-cyan-400">
            <User size={18} />
            <span className="font-medium">About</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center w-full gap-3 p-3 text-red-400 transition-all rounded-xl hover:bg-red-500/10 hover:text-red-300">
            <FaSignOutAlt size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar



















