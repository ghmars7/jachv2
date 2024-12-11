"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Eye, EyeOff, Trash2 } from "lucide-react";
import { useUsers } from "@/hooks/useUsers";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserListProps {
  searchQuery: string;
  selectedRole: string;
}

export function UsersList({ searchQuery, selectedRole }: UserListProps) {
  const { users, isLoading, mutate } = useUsers();
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const router = useRouter();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  const filteredUsers = users?.filter((user: any) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleTogglePassword = (id: string) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await fetch(`/api/users/${id}`, {
          method: "DELETE",
        });
        mutate();
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end"></div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Prénom</TableHead>
              <TableHead>Date de Naissance</TableHead>
              <TableHead>Classe</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mot de Passe</TableHead>

              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers?.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.birthDate}</TableCell>
                <TableCell>{user.class ? user.class : "-"}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex justify-between items-center space-x-2 w-[200px] overflow-hidden">
                    <Button variant="ghost" size="icon" onClick={() => handleTogglePassword(user._id)}>
                      {visiblePasswords[user._id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <span>{visiblePasswords[user._id] ? user.password : "*".repeat(12)}</span>
                  </div>
                </TableCell>

                <TableCell>{user.role}</TableCell>
                <TableCell className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => router.push(`/dashboard/users/${user._id}/edit`)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(user._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
