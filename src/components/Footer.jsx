import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-6 text-center text-sm bg-background text-muted-foreground border-t border-border">
      &copy; {new Date().getFullYear()} Aditya Tiwari. All rights reserved.
    </footer>
  );
} 