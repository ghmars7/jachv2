"use client";

import { useRouter } from "next/navigation";

export default function StudentsPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Professeurs</h2>
        {/* <Button onClick={() => router.push("/dashboard/teachers/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouveau Professeur
        </Button> */}
      </div>
      {children}
    </div>
  );
}
