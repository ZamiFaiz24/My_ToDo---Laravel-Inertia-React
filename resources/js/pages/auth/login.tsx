import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthCard from "../../components/auth-card";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [direction, setDirection] = useState(1); // 1 = ke kanan, -1 = ke kiri

  const handleToggle = () => {
    setDirection(isLogin ? 1 : -1);
    setIsLogin((prev) => !prev);
  };

  const variants = {
    initial: (dir: number) => ({ x: dir * 1000, opacity: 0, position: "absolute" }),
    animate: { x: 0, opacity: 1, position: "relative" },
    exit: (dir: number) => ({ x: dir * -1000, opacity: 0, position: "absolute" }),
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans bg-gray-200 relative">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
        key={isLogin ? "login" : "register"}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={direction}
        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
        className="flex w-full h-full"
        >
        {isLogin ? (
          <>
            {/* Left: Welcome (Login) */}
            <div className="hidden md:flex w-1/2 h-full items-center justify-center relative overflow-hidden">
              {/* Background gradient & blur */}
              <div className="absolute inset-0 animated-gradient opacity-90 blur-sm" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black opacity-20" />
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center px-10 text-center">
                <img src="/images/logoo.gif" alt="Logo" className="w-40 h-40 mb-6 rounded-full shadow-lg border-4 border-[#4ecdc4]/30 object-cover" />
                {/* Untuk Login */}
                <h1 className="text-[#f7fff7] text-4xl font-extrabold mb-2 drop-shadow-lg flex items-center gap-2">
                  <span>👋</span> Selamat Datang Kembali!
                </h1>
                <p className="text-[#f7fff7]/90 text-lg mb-4 drop-shadow">
                  Yuk <span className="text-[#ffe66d] font-semibold">masuk</span> dan kelola aktivitas harianmu dengan <span className="text-[#4ecdc4] font-semibold">mudah</span> & <span className="text-[#ff6b6b] font-semibold">efisien</span> bersama <span className="text-[#1a535c] font-bold bg-[#ffe66d]/70 px-1 rounded">MyToDo</span>!
                </p>
                {/* Toggle Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleToggle}
                  className="group mt-4 px-6 py-2 bg-[#f7fff7]/20 hover:bg-[#ffe66d]/30 text-[#1a535c] rounded-full font-semibold shadow transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] active:scale-95"
                >
                  <span
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  >
                    {isLogin ? (
                      // Icon Next (Login → Register)
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#4ecdc4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                          initial={{ x: 0 }}
                          animate={{ x: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.2, repeatType: "reverse" }}
                        />
                      </svg>
                    ) : (
                      // Icon Back (Register → Login)
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#ff6b6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                          initial={{ x: 0 }}
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.2, repeatType: "reverse" }}
                        />
                      </svg>
                    )}
                  </span>
                  <span className="transition-colors duration-300 group-hover:text-[#ffe66d]">
                    {isLogin ? "Belum punya akun? Daftar" : "Sudah punya akun? Login"}
                  </span>
                </motion.button>
                <div className="flex gap-2 mt-6">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#ffe66d]/80 animate-pulse" />
                  <span className="inline-block w-3 h-3 rounded-full bg-[#4ecdc4]/60" />
                  <span className="inline-block w-3 h-3 rounded-full bg-[#ff6b6b]/40" />
                </div>
              </div>
            </div>
            {/* Right: Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-emerald-50 p-6">
              <div className="w-full max-w-md bg-navbar-bg text-white p-8 rounded-xl shadow-md">
                <AuthCard isLogin={isLogin} toggleForm={handleToggle} />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Left: Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-emerald-50 p-6">
              <div className="w-full max-w-md bg-navbar-bg text-white p-8 rounded-xl shadow-md">
                <AuthCard isLogin={isLogin} toggleForm={handleToggle} />
              </div>
            </div>
            {/* Right: Welcome (Register) */}
            <div className="hidden md:flex w-1/2 h-full items-center justify-center relative overflow-hidden">
              {/* Background gradient & blur */}
              <div className="absolute inset-0 animated-gradient opacity-90 blur-sm" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black opacity-20" />
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center px-10 text-center">
                <img src="/images/logoo.gif" alt="Logo" className="w-40 h-40 mb-6 rounded-full shadow-lg border-4 border-[#4ecdc4]/30 object-cover" />
                {/* Untuk Register */}
                <h1 className="text-[#f7fff7] text-4xl font-extrabold mb-2 drop-shadow-lg flex items-center gap-2">
                  <span>🚀</span> Bergabung Sekarang!
                </h1>
                <p className="text-[#f7fff7]/90 text-lg mb-4 drop-shadow">
                  Daftar dan mulai perjalanan <span className="text-[#4ecdc4] font-semibold">produktifmu</span>.<br />
                  <span className="text-[#ffe66d] font-semibold">Catat</span> tugas, <span className="text-[#ff6b6b] font-semibold">atur</span> waktu, dan <span className="text-[#1a535c] font-bold bg-[#ffe66d]/70 px-1 rounded">capai target</span> bersama MyToDo!
                </p>
                {/* Toggle Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleToggle}
                  className="group mt-4 px-6 py-2 bg-[#f7fff7]/20 hover:bg-[#ffe66d]/30 text-[#1a535c] rounded-full font-semibold shadow transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] active:scale-95"
                >
                  <span className="transition-colors duration-300 group-hover:text-[#ffe66d]">
                    Sudah punya akun? Login
                  </span>
                  <span
                    className="inline-block transition-transform duration-300 group-hover:-translate-x-1"
                    aria-hidden
                  >
                    {/* Icon Back (Register → Login) */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#ff6b6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                          initial={{ x: 0 }}
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.2, repeatType: "reverse" }}
                        />
                    </svg>
                  </span>
                </motion.button>
                <div className="flex gap-2 mt-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#ffe66d]/80 animate-pulse" />
                  <span className="inline-block w-3 h-3 rounded-full bg-[#4ecdc4]/60" />
                  <span className="inline-block w-3 h-3 rounded-full bg-[#ff6b6b]/40" />
                </div>
              </div>
            </div>
          </>
        )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
