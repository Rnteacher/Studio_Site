import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/categories";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
}

const SearchFilter = ({
  searchQuery,
  onSearchChange,
  selectedTags,
  onTagToggle,
  onClearFilters,
}: SearchFilterProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="חפשו שירות, תחום או שם חניך/ה..."
            className="pr-10 h-12 text-base bg-card border-border rounded-xl"
          />
        </div>

        {/* Main Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() =>
                setExpandedCategory(expandedCategory === cat.name ? null : cat.name)
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                expandedCategory === cat.name
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-tag text-foreground hover:bg-primary/10"
              }`}
            >
              <span className="ml-1">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sub Tags */}
        {expandedCategory && (
          <div className="flex flex-wrap justify-center gap-2 mb-4 animate-fade-in">
            {categories
              .find((c) => c.name === expandedCategory)
              ?.subTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagToggle(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-heading text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {tag}
                </button>
              ))}
          </div>
        )}

        {/* Active Filters */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
            <span className="text-sm text-muted-foreground">סינון פעיל:</span>
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                variant="default"
                className="cursor-pointer gap-1"
                onClick={() => onTagToggle(tag)}
              >
                {tag}
                <X className="h-3 w-3" />
              </Badge>
            ))}
            <button
              onClick={onClearFilters}
              className="text-xs text-primary hover:underline mr-2"
            >
              נקה הכל
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchFilter;
