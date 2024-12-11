"use client";

import { useState } from "react";
import { UsersList } from "@/components/users/UsersList";
import { UsersFilters } from "@/components/users/UsersFilters";

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between"></div>

      <UsersFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />
      <UsersList searchQuery={searchQuery} selectedRole={selectedRole} />
    </div>
  );
}
