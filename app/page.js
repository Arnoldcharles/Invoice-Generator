"use client";
import Link from "next/link";
import { useState } from "react";
import "@/app/styles/invoice.css";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main className={darkMode ? "dark invoice-page" : "invoice-page"}>
      <div className="top-bar">
        <h1>🧾 Invoice Generator</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="branding">
        <img src="/logo.png" alt="Logo" className="logo" />
        <div>
          <h2>Nigid</h2>
          <p>Simple & Smart Invoicing Tool</p>
        </div>
      </div>

      <div className="btn-group">
        <Link href="/invoice">
          <button>➕ Create New Invoice</button>
        </Link>
        <Link href="/invoices">
          <button>📁 View Saved Invoices</button>
        </Link>
      </div>
    </main>
  );
}
