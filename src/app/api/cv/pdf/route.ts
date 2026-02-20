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

    // Dynamic import react-pdf internals for direct PDF generation
    // We bypass the React reconciler entirely to avoid the $$typeof symbol mismatch
    // (React error #31) that occurs when Next.js bundles multiple React instances.
    const [fontModule, layoutModule, renderModule, pdfkitModule, fnsModule] =
      await Promise.all([
        import("@react-pdf/font"),
        import("@react-pdf/layout"),
        import("@react-pdf/render"),
        import("@react-pdf/pdfkit"),
        import("@react-pdf/fns"),
      ]);

    const FontStore = fontModule.default;
    const layoutDocument = layoutModule.default;
    const renderPDF = renderModule.default;
    const PDFDocument = pdfkitModule.default;
    const { upperFirst } = fnsModule;

    // Font store setup
    const fontStore = new FontStore();

    // Register Hebrew font
    fontStore.register({
      family: "Heebo",
      fonts: [
        { src: "https://fonts.gstatic.com/s/heebo/v26/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EiSysd0mm_00.ttf", fontWeight: 400 },
        { src: "https://fonts.gstatic.com/s/heebo/v26/NGSpv5_NC0k9P_v6ZUCbLRAHxK1E1yysd0mm_00.ttf", fontWeight: 700 },
      ],
    });

    // ── Style definitions ──
    const styles: Record<string, Record<string, unknown>> = {
      page: { fontFamily: "Heebo", padding: 40, fontSize: 10, direction: "rtl" },
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
    };

    // ── Data extraction ──
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

    // ── Build react-pdf internal tree directly ──
    // This is the format the reconciler outputs: {type, box, style, props, children}
    // By building it directly, we skip the reconciler and avoid the React instance mismatch.

    type PdfNode = {
      type: string;
      box: Record<string, unknown>;
      style: Record<string, unknown>;
      props: Record<string, unknown>;
      children: (PdfNode | PdfTextInstance)[];
    };

    type PdfTextInstance = {
      type: "TEXT_INSTANCE";
      value: string;
    };

    const node = (type: string, style: Record<string, unknown>, children: (PdfNode | PdfTextInstance)[]): PdfNode => ({
      type,
      box: {},
      style: style || {},
      props: {},
      children,
    });

    const text = (value: string): PdfTextInstance => ({
      type: "TEXT_INSTANCE",
      value,
    });

    // Build header children
    const headerChildren: (PdfNode | PdfTextInstance)[] = [
      node("TEXT", styles.name, [text(studentName || portfolio.about_title || "")]),
    ];
    if (contactParts.length > 0) {
      headerChildren.push(
        node("TEXT", styles.contactRow, [text(contactParts.join("  |  "))]),
      );
    }
    const headerView = node("VIEW", styles.header, headerChildren);

    // Build page children
    const pageChildren: (PdfNode | PdfTextInstance)[] = [headerView];

    // About section
    if (portfolio.about_body) {
      pageChildren.push(
        node("VIEW", styles.section, [
          node("TEXT", styles.sectionTitle, [text("אודות")]),
          node("TEXT", styles.entryDesc, [text(portfolio.about_body)]),
        ]),
      );
    }

    // CV sections
    for (const section of sections) {
      const sectionChildren: (PdfNode | PdfTextInstance)[] = [
        node("TEXT", styles.sectionTitle, [text(section.title)]),
      ];
      for (const entry of section.entries) {
        const entryChildren: (PdfNode | PdfTextInstance)[] = [
          node("TEXT", styles.entryTitle, [text(entry.title)]),
        ];
        if (entry.subtitle) entryChildren.push(node("TEXT", styles.entrySubtitle, [text(entry.subtitle)]));
        if (entry.dateRange) entryChildren.push(node("TEXT", styles.entryDate, [text(entry.dateRange)]));
        if (entry.description) entryChildren.push(node("TEXT", styles.entryDesc, [text(entry.description)]));
        sectionChildren.push(node("VIEW", styles.entry, entryChildren));
      }
      pageChildren.push(node("VIEW", styles.section, sectionChildren));
    }

    // Build document tree (matches the output of react-pdf reconciler)
    const pageNode = node("PAGE", styles.page, pageChildren);
    pageNode.props = { size: "A4" };

    const documentNode = node("DOCUMENT", {}, [pageNode]);

    // ── Render PDF using react-pdf internals ──
    const ctx = new PDFDocument({
      compress: true,
      autoFirstPage: false,
      displayTitle: true,
      info: { Creator: "react-pdf", Producer: "react-pdf", CreationDate: new Date() },
    });

    // @ts-expect-error — layoutDocument accepts (document, fontStore) at runtime but .d.ts only declares 1 arg
    const layout = await layoutDocument(documentNode, fontStore);
    const fileStream = renderPDF(ctx, layout);

    // Collect stream into buffer
    const chunks: Uint8Array[] = [];
    const buffer = await new Promise<Uint8Array>((resolve, reject) => {
      fileStream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
      fileStream.on("end", () => {
        const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
        const result = new Uint8Array(totalLength);
        let offset = 0;
        for (const chunk of chunks) {
          result.set(chunk, offset);
          offset += chunk.length;
        }
        resolve(result);
      });
      fileStream.on("error", (error: Error) => reject(error));
    });

    return new Response(buffer as unknown as BodyInit, {
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
