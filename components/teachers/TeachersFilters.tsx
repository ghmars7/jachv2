"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Classes } from "@/types";

interface TeacherFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
}

export function TeachersFilters({ searchQuery, setSearchQuery, selectedClass, setSelectedClass }: TeacherFiltersProps) {
  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <Input
          placeholder="Rechercher un professeur..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Select value={selectedClass} onValueChange={setSelectedClass}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrer par classe" />
        </SelectTrigger>{" "}
        <SelectContent>
          <SelectItem value="all">Tous les niveaux</SelectItem>
          {Object.keys(Classes)
            .filter((key) => isNaN(Number(key))) // Exclude numeric keys
            .map((className) => (
              <SelectItem key={Classes[className as keyof typeof Classes]} value={className.toString()}>
                {className}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
