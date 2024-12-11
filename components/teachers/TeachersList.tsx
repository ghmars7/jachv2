"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Eye, EyeOff, Trash2 } from "lucide-react";
import type { Teacher } from "@/types";
import { useTeachers } from "@/hooks/useTeachers";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TeacherListProps {
  searchQuery: string;
  selectedClass: string;
}

export function TeachersList({ searchQuery, selectedClass }: TeacherListProps) {
  const { teachers, isLoading, mutate } = useTeachers();
  // const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const router = useRouter();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  const filteredTeachers = teachers?.filter((teacher: Teacher) => {
    const matchesSearch =
      teacher.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === "all" || teacher.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  // const handleTogglePassword = (id: string) => {
  //   setVisiblePasswords((prev) => ({
  //     ...prev,
  //     [id]: !prev[id],
  //   }));
  // };

  // const handleDelete = async (id: string) => {
  //   if (confirm("Êtes-vous sûr de vouloir supprimer ce professeur ?")) {
  //     try {
  //       await fetch(`/api/teachers/${id}`, {
  //         method: "DELETE",
  //       });
  //       mutate();
  //     } catch (error) {
  //       console.error("Erreur lors de la suppression:", error);
  //     }
  //   }
  // };

  return (
    <div className="space-y-4">
      <div className="flex justify-end"></div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Prénom</TableHead>
              <TableHead>Classe</TableHead>
              {/* <TableHead>Email</TableHead>
              <TableHead>Mot de Passe</TableHead> */}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeachers?.map((teacher: any) => (
              <TableRow key={teacher._id}>
                <TableCell>{teacher.lastName}</TableCell>
                <TableCell>{teacher.firstName}</TableCell>
                <TableCell>{teacher.class}</TableCell>
                {/* <TableCell>{teacher.email}</TableCell>
                <TableCell>
                  <div className="flex justify-between items-center space-x-2 w-[200px]">
                    <span>{visiblePasswords[teacher._id] ? teacher.password : "*".repeat(12)}</span>
                    <Button variant="ghost" size="icon" onClick={() => handleTogglePassword(teacher._id)}>
                      {visiblePasswords[teacher._id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </TableCell> */}
                <TableCell className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push(`/dashboard/teachers/${teacher._id}/edit`)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  {/* <Button variant="ghost" size="icon" onClick={() => handleDelete(teacher._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
