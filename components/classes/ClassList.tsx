"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import type { Class } from "@/types";
import { useClasses } from "@/hooks/useClasses";
import { useRouter } from "next/router";

interface ClassListProps {
  searchQuery: string;
  selectedLevel: string;
}

export function ClassList({ searchQuery, selectedLevel }: ClassListProps) {
  const { classes, isLoading, mutate } = useClasses();
  // const router = useRouter();

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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClasses.map((cls) => (
            <TableRow key={cls.id}>
              <TableCell>{cls.level}</TableCell>
              <TableCell>{cls.students} élèves</TableCell>
              <TableCell className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
