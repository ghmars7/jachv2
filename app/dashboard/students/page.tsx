"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { StudentsList } from "@/components/students/StudentsList";
import { StudentsFilters } from "@/components/students/StudentsFilters";

export default function StudentsPage() {
  const searchParams = useSearchParams();
  const classFilterFromQuery = searchParams.get("class") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState(classFilterFromQuery);

  // Update selectedClass when the query parameter changes
  useEffect(() => {
    setSelectedClass(classFilterFromQuery);
  }, [classFilterFromQuery]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <StudentsFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
      />
      <StudentsList searchQuery={searchQuery} selectedClass={selectedClass} />
    </div>
  );
}
