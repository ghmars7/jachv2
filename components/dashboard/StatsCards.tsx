import { useStudents } from "@/hooks/useStudents";
import { useTeachers } from "@/hooks/useTeachers";
import { useClasses } from "@/hooks/useClasses";

export default function StatsCards() {
  // Hooks pour récupérer les données
  const { students, isLoading: isLoadingStudents } = useStudents();
  const { teachers, isLoading: isLoadingTeachers } = useTeachers();
  const { classes, isLoading: isLoadingClasses } = useClasses();

  // Vérification de l'état de chargement global
  const isLoading = isLoadingStudents || isLoadingTeachers || isLoadingClasses;

  // Gestion des valeurs par défaut si les données ne sont pas encore chargées
  const stats = [
    { name: "Total Élèves", value: students?.length || 0 },
    { name: "Classes", value: classes?.length || 0 },
    { name: "Professeurs", value: teachers?.length || 0 },
  ];

  if (isLoading) {
    return <div>Chargement des statistiques...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
        >
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.name}</div>
        </div>
      ))}
    </div>
  );
}
