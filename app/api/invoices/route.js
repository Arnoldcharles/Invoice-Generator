import { connectDB } from "@/app/lib/mongodb";
import Invoice from "@/app/models/Invoice";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const saved = await Invoice.create(data);
  return NextResponse.json(saved);
}

export async function GET() {
  await connectDB();
  const invoices = await Invoice.find().sort({ createdAt: -1 });
  return NextResponse.json(invoices);
}
