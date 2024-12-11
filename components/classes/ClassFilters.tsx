"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Classes } from "@/types";

interface ClassFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedLevel: string;
  setSelectedLevel: (value: string) => void;
}

export function ClassFilters({ searchQuery, setSearchQuery, selectedLevel, setSelectedLevel }: ClassFiltersProps) {
  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <Input
          placeholder="Rechercher une classe..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Select value={selectedLevel} onValueChange={setSelectedLevel}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrer par niveau" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les niveaux</SelectItem>
          {Object.keys(Classes)
            .filter((key) => isNaN(Number(key))) // Exclude numeric keys
            .map((className) => (
              <SelectItem
                key={Classes[className as keyof typeof Classes]}
                value={Classes[className as keyof typeof Classes].toString()}
              >
                {className}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
