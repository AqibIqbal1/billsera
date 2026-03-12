import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(req: NextRequest) {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return NextResponse.json(
      { message: "Supabase env vars missing" },
      { status: 500 }
    );
  }

  const { email } = (await req.json().catch(() => ({}))) as {
    email?: string;
  };

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { message: "Valid email is required" },
      { status: 400 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase.from("waitlist").insert({
    email,
    source: "landing",
  });

  if (error) {
    // Treat duplicate emails as success for UX
    const duplicate =
      (error as any).code === "23505" ||
      (error.message || "").toLowerCase().includes("duplicate");

    if (!duplicate) {
      return NextResponse.json(
        { message: "Could not save email", error: error.message },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Added to waitlist" }, { status: 200 });
}

