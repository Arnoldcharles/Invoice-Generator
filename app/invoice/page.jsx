"use client";
import { useState } from "react";
import html2pdf from "html2pdf.js";
import "../styles/invoice.css";
import Link from "next/link";

export default function InvoicePage() {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0 },
  ]);
  const [darkMode, setDarkMode] = useState(false);

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] =
      field === "description" ? value : parseFloat(value);
    setItems(newItems);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const tax = +(subtotal * 0.075).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const downloadPDF = () => {
    const element = document.getElementById("invoice-preview");
    html2pdf().from(element).save("invoice.pdf");
  };

  const saveToDatabase = async () => {
    const res = await fetch("/api/invoices", {
      method: "POST",
      body: JSON.stringify({
        clientName,
        clientEmail,
        items,
        subtotal,
        tax,
        total,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) alert("Invoice saved to MongoDB!");
    else alert("Failed to save.");
  };

  return (
    <div className={darkMode ? "dark invoice-page" : "invoice-page"}>
      <div className="top-bar">
        <h1>Invoice Generator</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <div className="invoice-form">
        <input
          type="text"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Client Email"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
        />

        <h3>Items</h3>
        {items.map((item, idx) => (
          <div key={idx} className="item-row">
            <input
              type="text"
              placeholder="Description"
              value={item.description}
              onChange={(e) => updateItem(idx, "description", e.target.value)}
            />
            <input
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) => updateItem(idx, "quantity", e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => updateItem(idx, "price", e.target.value)}
            />
          </div>
        ))}
        <button onClick={addItem}>+ Add Item</button>
      </div>

      <div className="invoice-preview" id="invoice-preview">
        <h2>Invoice Preview</h2>
        <p>
          <strong>Client:</strong> {clientName}
        </p>
        <p>
          <strong>Email:</strong> {clientEmail}
        </p>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>₦{item.price.toFixed(2)}</td>
                <td>₦{(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          <strong>Subtotal:</strong> ₦{subtotal.toFixed(2)}
        </p>
        <p>
          <strong>Tax (7.5%):</strong> ₦{tax.toFixed(2)}
        </p>
        <p>
          <strong>Total:</strong> ₦{total.toFixed(2)}
        </p>
      </div>

      <div className="btn-group">
        <button onClick={downloadPDF}>📄 Download PDF</button>
        <button onClick={saveToDatabase}>💾 Save to DB</button>
        <Link href="/">Home</Link>
      </div>
    </div>
  );
}
