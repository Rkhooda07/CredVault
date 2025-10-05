import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const shouldBeDark = storedTheme === "dark" || (!storedTheme && systemPrefersDark);
    setIsDark(shouldBeDark);
    
    // Apply theme to document
    if (shouldBeDark) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      const newTheme = isDark ? "light" : "dark";
      setIsDark(!isDark);
      
      // Store preference
      localStorage.setItem("theme", newTheme);
      
      // Apply theme to document
      if (newTheme === "dark") {
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
      }
      
      // Reset animation
      setTimeout(() => setIsAnimating(false), 600);
    }, 300);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`relative overflow-hidden group hover:bg-muted/50 transition-all duration-300 ${
        isAnimating ? "animate-theme-switch" : ""
      }`}
      aria-label="Toggle theme"
    >
      {/* Background glow effect */}
      <div className={`absolute inset-0 rounded-lg bg-gradient-to-r transition-all duration-500 ${
        isDark 
          ? "from-primary/10 to-accent/10" 
          : "from-accent/10 to-primary/10"
      } opacity-0 group-hover:opacity-100`} />
      
      {/* Toggle container */}
      <div className="relative w-6 h-6">
        {/* Sun icon */}
        <Sun 
          className={`absolute top-0 left-0 w-6 h-6 transition-all duration-500 ease-in-out text-amber-500 ${
            isDark 
              ? "rotate-90 scale-0 opacity-0" 
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
        
        {/* Moon icon */}
        <Moon 
          className={`absolute top-0 left-0 w-6 h-6 transition-all duration-500 ease-in-out text-blue-400 ${
            isDark 
              ? "rotate-0 scale-100 opacity-100" 
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
      
      {/* Animated border ring */}
      <div className={`absolute inset-0 rounded-lg border-2 transition-all duration-300 ${
        isDark 
          ? "border-blue-400/20 group-hover:border-blue-400/40" 
          : "border-amber-500/20 group-hover:border-amber-500/40"
      }`} />
      
      {/* Enhanced sparkle effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className={`absolute top-1 right-1 w-1 h-1 rounded-full animate-sparkle ${
          isDark ? "bg-blue-400" : "bg-amber-500"
        }`} style={{ animationDelay: "0ms" }} />
        <div className={`absolute bottom-1 left-1 w-1 h-1 rounded-full animate-sparkle ${
          isDark ? "bg-primary" : "bg-accent"
        }`} style={{ animationDelay: "300ms" }} />
        <div className={`absolute top-1 left-1 w-0.5 h-0.5 rounded-full animate-sparkle ${
          isDark ? "bg-primary-glow" : "bg-amber-400"
        }`} style={{ animationDelay: "600ms" }} />
        <div className={`absolute bottom-1 right-1 w-0.5 h-0.5 rounded-full animate-sparkle ${
          isDark ? "bg-accent" : "bg-blue-400"
        }`} style={{ animationDelay: "900ms" }} />
      </div>
      
      {/* Pulsing glow effect when animating */}
      {isAnimating && (
        <div className={`absolute inset-0 rounded-lg ${
          isDark 
            ? "bg-blue-400/20 animate-pulse" 
            : "bg-amber-500/20 animate-pulse"
        }`} />
      )}
    </Button>
  );
}
