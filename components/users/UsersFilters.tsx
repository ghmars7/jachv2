"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role } from "@/types";

interface UserFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedRole: string;
  setSelectedRole: (value: string) => void;
}

export function UsersFilters({ searchQuery, setSearchQuery, selectedRole, setSelectedRole }: UserFiltersProps) {
  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <Input
          placeholder="Rechercher un utilisateur..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Select value={selectedRole} onValueChange={setSelectedRole}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrer par droit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les niveaux</SelectItem>
          {Object.keys(Role)
            .filter((key) => isNaN(Number(key))) // Exclude numeric keys
            .map((rightName) => (
              <SelectItem key={Role[rightName as keyof typeof Role]} value={rightName.toString()}>
                {rightName}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
