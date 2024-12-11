"use client";

import { useState } from "react";
import { ClassList } from "@/components/classes/ClassList";
import { ClassFilters } from "@/components/classes/ClassFilters";

export default function ClassesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between"></div>
      <ClassFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
      />
      <ClassList searchQuery={searchQuery} selectedLevel={selectedLevel} />
    </div>
  );
}
