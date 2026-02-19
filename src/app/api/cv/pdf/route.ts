import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import React from "react";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const portfolioId = searchParams.get("portfolioId");

    if (!portfolioId) {
      return NextResponse.json({ error: "Missing portfolioId" }, { status: 400 });
    }

    const supabase = await createClient();

    // Fetch portfolio
    const { data: portfolio, error: portfolioError } = await supabase
      .from("portfolios")
      .select("*, students(name)")
      .eq("id", portfolioId)
      .single();

    if (portfolioError || !portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    // Fetch CV sections
    const { data: cvSections } = await supabase
      .from("cv_sections")
      .select("*")
      .eq("portfolio_id", portfolioId)
      .order("sort_order");

    // Dynamic import of react-pdf (server-side only)
    const ReactPDF = await import("@react-pdf/renderer");
    const { Document, Page, Text, View, StyleSheet, Font } = ReactPDF;

    // Register Hebrew font
    Font.register({
      family: "Heebo",
      fonts: [
        { src: "https://fonts.gstatic.com/s/heebo/v26/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EiSysd0mm_00.ttf", fontWeight: 400 },
        { src: "https://fonts.gstatic.com/s/heebo/v26/NGSpv5_NC0k9P_v6ZUCbLRAHxK1E1yysd0mm_00.ttf", fontWeight: 700 },
      ],
    });

    const styles = StyleSheet.create({
      page: { fontFamily: "Heebo", padding: 40, fontSize: 10 },
      header: { textAlign: "center", marginBottom: 20, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
      name: { fontSize: 22, fontWeight: 700, marginBottom: 4 },
      contactRow: { fontSize: 9, color: "#6b7280", marginTop: 4 },
      section: { marginTop: 16 },
      sectionTitle: { fontSize: 13, fontWeight: 700, marginBottom: 8, paddingBottom: 4, borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
      entry: { marginBottom: 8 },
      entryTitle: { fontSize: 11, fontWeight: 700 },
      entrySubtitle: { fontSize: 9, color: "#6b7280" },
      entryDate: { fontSize: 8, color: "#9ca3af" },
      entryDesc: { fontSize: 9, color: "#4b5563", marginTop: 2 },
    });

    const studentName = (portfolio.students as Record<string, unknown>)?.name as string ?? "";
    const contactParts: string[] = [];
    if (portfolio.contact_email) contactParts.push(portfolio.contact_email);
    if (portfolio.contact_phone) contactParts.push(portfolio.contact_phone);
    if (portfolio.contact_website) contactParts.push(portfolio.contact_website);

    const sections = (cvSections ?? []).map((s) => ({
      title: s.title,
      entries: (s.entries as Array<{ title: string; subtitle?: string; dateRange?: string; description?: string }>) ?? [],
    }));

    const h = React.createElement;

    const doc = h(
      Document,
      null,
      h(
        Page,
        { size: "A4", style: styles.page },
        // Header
        h(
          View,
          { style: styles.header },
          h(Text, { style: styles.name }, studentName || portfolio.about_title || ""),
          contactParts.length > 0
            ? h(Text, { style: styles.contactRow }, contactParts.join("  |  "))
            : null
        ),
        // About
        portfolio.about_body
          ? h(
              View,
              { style: styles.section },
              h(Text, { style: styles.sectionTitle }, "אודות"),
              h(Text, { style: styles.entryDesc }, portfolio.about_body)
            )
          : null,
        // CV Sections
        ...sections.map((section, si) =>
          h(
            View,
            { key: si, style: styles.section },
            h(Text, { style: styles.sectionTitle }, section.title),
            ...section.entries.map((entry, ei) =>
              h(
                View,
                { key: ei, style: styles.entry },
                h(Text, { style: styles.entryTitle }, entry.title),
                entry.subtitle ? h(Text, { style: styles.entrySubtitle }, entry.subtitle) : null,
                entry.dateRange ? h(Text, { style: styles.entryDate }, entry.dateRange) : null,
                entry.description ? h(Text, { style: styles.entryDesc }, entry.description) : null
              )
            )
          )
        )
      )
    );

    const buffer = await ReactPDF.renderToBuffer(doc);

    return new NextResponse(Buffer.from(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="cv-${portfolio.slug ?? portfolioId}.pdf"`,
      },
    });
  } catch (err) {
    console.error("PDF generation error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "PDF generation failed" },
      { status: 500 }
    );
  }
}
