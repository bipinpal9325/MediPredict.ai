/// <reference types="vite/client" />
import React from 'react'; 
import { createRoot } from "react-dom/client";
import { ClerkProvider } from '@clerk/clerk-react';
import App from "./app/App.tsx";
import "./styles/index.css";

const VITE_CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key. Add VITE_CLERK_PUBLISHABLE_KEY to your .env file.");
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>
);