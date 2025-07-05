"use client";
import { useEffect, useState } from "react";
import "@/app/styles/invoice.css";
import Link from "next/link";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch("/api/invoices")
      .then((res) => res.json())
      .then(setInvoices)
      .catch(console.error);
  }, []);

  return (
    <div className="invoice-page">
      <h1>📁 Saved Invoices</h1>
      {invoices.length === 0 ? (
        <p>No invoices saved yet.</p>
      ) : (
        <div className="invoice-list">
          {invoices.map((inv) => (
            <div key={inv._id} className="invoice-card">
              <h3>{inv.clientName}</h3>
              <p>{inv.clientEmail}</p>
              <p>
                <strong>Total:</strong> ₦{inv.total.toFixed(2)}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(inv.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
      <Link href="/">Home</Link>
    </div>
  );
}
