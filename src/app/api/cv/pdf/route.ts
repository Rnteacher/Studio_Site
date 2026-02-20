import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const portfolioId = searchParams.get("portfolioId");

    if (!portfolioId) {
      return NextResponse.json({ error: "Missing portfolioId" }, { status: 400 });
    }

    const supabase = await createClient();

    // Fetch portfolio with student info (contact comes from students now)
    const { data: portfolio, error: portfolioError } = await supabase
      .from("portfolios")
      .select("*, students(name, email, phone, website)")
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
    const { Document, Page, Text, View, StyleSheet, Font, renderToBuffer } = ReactPDF;

    // Register Hebrew font
    Font.register({
      family: "Heebo",
      fonts: [
        { src: "https://fonts.gstatic.com/s/heebo/v26/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EiSysd0mm_00.ttf", fontWeight: 400 },
        { src: "https://fonts.gstatic.com/s/heebo/v26/NGSpv5_NC0k9P_v6ZUCbLRAHxK1E1yysd0mm_00.ttf", fontWeight: 700 },
      ],
    });

    const styles = StyleSheet.create({
      page: { fontFamily: "Heebo", padding: 40, fontSize: 10, direction: "rtl" as unknown as undefined },
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

    const studentRow = portfolio.students as Record<string, unknown> | null;
    const studentName = (studentRow?.name as string) ?? "";
    const contactParts: string[] = [];
    if (studentRow?.email) contactParts.push(studentRow.email as string);
    if (studentRow?.phone) contactParts.push(studentRow.phone as string);
    if (studentRow?.website) contactParts.push(studentRow.website as string);

    const sections = (cvSections ?? []).map((s) => ({
      title: s.title as string,
      entries: (s.entries as Array<{ title: string; subtitle?: string; dateRange?: string; description?: string }>) ?? [],
    }));

    // Use require("react") to get the same React instance as react-pdf's reconciler.
    // ESM `import React from "react"` can give a different instance in Next.js bundling,
    // causing error #31 ($$typeof symbol mismatch).
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const React = require("react") as { createElement: typeof import("react").createElement };
    const h = React.createElement;

    // Build CV entry elements
    const buildCvEntries = (entries: typeof sections[0]["entries"]) =>
      entries.map((entry, ei) => {
        const children = [
          h(Text, { key: "t", style: styles.entryTitle }, entry.title),
        ];
        if (entry.subtitle) children.push(h(Text, { key: "s", style: styles.entrySubtitle }, entry.subtitle));
        if (entry.dateRange) children.push(h(Text, { key: "d", style: styles.entryDate }, entry.dateRange));
        if (entry.description) children.push(h(Text, { key: "desc", style: styles.entryDesc }, entry.description));
        return h(View, { key: String(ei), style: styles.entry }, ...children);
      });

    // Build section elements
    const buildSections = () =>
      sections.map((section, si) =>
        h(View, { key: String(si), style: styles.section },
          h(Text, { style: styles.sectionTitle }, section.title),
          ...buildCvEntries(section.entries),
        )
      );

    // Build header
    const headerChildren = [
      h(Text, { key: "name", style: styles.name }, studentName || portfolio.about_title || ""),
    ];
    if (contactParts.length > 0) {
      headerChildren.push(h(Text, { key: "contact", style: styles.contactRow }, contactParts.join("  |  ")));
    }
    const headerView = h(View, { key: "header", style: styles.header }, ...headerChildren);

    // Build page children
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pageChildren: any[] = [headerView];

    // About section
    if (portfolio.about_body) {
      pageChildren.push(
        h(View, { key: "about", style: styles.section },
          h(Text, { style: styles.sectionTitle }, "אודות"),
          h(Text, { style: styles.entryDesc }, portfolio.about_body),
        )
      );
    }

    // CV sections
    pageChildren.push(...buildSections());

    // Build final document
    const doc = h(Document, null,
      h(Page, { size: "A4", style: styles.page }, ...pageChildren)
    );

    const buffer = await renderToBuffer(doc);

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
