"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";
import type { Class } from "@/types";
import { useClasses } from "@/hooks/useClasses";
import { useRouter } from "next/navigation";

interface ClassListProps {
  searchQuery: string;
  selectedLevel: string;
}

export function ClassList({ searchQuery, selectedLevel }: ClassListProps) {
  const { classes, isLoading } = useClasses();
  const router = useRouter();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  const filteredClasses = classes.filter((cls: Class) => {
    const matchesSearch = cls.level.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === "all" || cls.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Niveau</TableHead>
            <TableHead>Effectif</TableHead>
            <TableHead>Professeur</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClasses.map((cls: any) => (
            <TableRow key={cls._id}>
              <TableCell>{cls.level}</TableCell>
              <TableCell>{cls.studentsNumber} élèves</TableCell>
              <TableCell>{cls.teacher}</TableCell>
              <TableCell className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push(`/dashboard/students?class=${cls.level}`)}
                >
                  <SquareArrowOutUpRight className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
