"use client";

import { useState, useMemo } from "react";
import { useServices } from "@/hooks/useServices";
import { useSiteContent } from "@/hooks/useSiteContent";
import ServiceCard from "@/components/ServiceCard";

const ServicesSection = () => {
  const { data: services = [], isLoading } = useServices();
  const { data: content } = useSiteContent();
  const svc = content?.services_section ?? {};
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    services.forEach((s) => {
      if (s.category) cats.add(s.category);
    });
    return [...cats].sort((a, b) => a.localeCompare(b, "he"));
  }, [services]);

  const filtered = useMemo(() => {
    const list = selectedCategory
      ? services.filter((s) => s.category === selectedCategory)
      : services;
    return [...list].sort((a, b) => a.title.localeCompare(b.title, "he"));
  }, [services, selectedCategory]);

  return (
    <section className="py-16" id="services">
      <div className="container mx-auto px-4">
        <h2 className="font-rubik text-3xl md:text-4xl font-extrabold text-heading text-center mb-4">
          {svc.title ?? "השירותים שלנו"}
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
          {svc.description ?? "שירותים מקצועיים מכישרונות צעירים — בחרו שירות וגלו מה אנחנו יכולים לעשות בשבילכם"}
        </p>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-tag text-foreground hover:bg-primary/10"
              }`}
            >
              הכל
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat ? null : cat)
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-tag text-foreground hover:bg-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">טוען...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((service) => (
              <div key={service.id} className="animate-fade-in">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">אין שירותים בקטגוריה זו</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
