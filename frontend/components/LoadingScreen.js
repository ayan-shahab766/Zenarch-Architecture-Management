"use client";

import Image from "next/image";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="relative">
        {/* Circular loading animation */}
        <div className="w-32 h-32 border-4 border-gold/20 border-t-gold rounded-full animate-spin"></div>
        {/* Logo in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Zenarch Logo"
            width={100}
            height={100}
            className="w-16 h-16 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;