"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSchoolYears, useSchoolYearStore } from "@/hooks/useSchoolYear";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function YearSelector() {
  const { schoolYears, isLoading } = useSchoolYears();
  const { currentYear, setCurrentYear } = useSchoolYearStore();
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  // Ensure the component is only rendered on the client
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (schoolYears?.length && !currentYear) {
      const activeYear = schoolYears.find((year) => year.isActive);
      if (activeYear) {
        setCurrentYear(activeYear.year);
      } else {
        setCurrentYear(schoolYears[0].year);
      }
    }
  }, [schoolYears, currentYear, setCurrentYear]);

  // Avoid rendering on the server to prevent mismatches
  if (!hydrated || isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="flex items-center space-x-2">
      <Select
        value={currentYear || ""}
        onValueChange={setCurrentYear}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={currentYear} />
        </SelectTrigger>
        <SelectContent>
          {schoolYears?.map((year, id) => (
            <SelectItem
              key={id}
              value={year.year}
              className="flex items-center justify-between"
            >
              <span>{year.year}</span>
              {year.isActive && (
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                  Active
                </span>
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isAdmin() && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/dashboard/settings/school-years/new")}
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
