"use client";

import { useState } from "react";
import { TeachersList } from "@/components/teachers/TeachersList";
import { TeachersFilters } from "@/components/teachers/TeachersFilters";

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between"></div>
      <TeachersFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
      />
      <TeachersList searchQuery={searchQuery} selectedClass={selectedClass} />
    </div>
  );
}
