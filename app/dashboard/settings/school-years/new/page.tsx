"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function NewSchoolYearPage() {
  const [year, setYear] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/school-years', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ year, isActive }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'année scolaire');
      }

      toast({
        title: "Succès",
        description: "Nouvelle année scolaire créée",
      });

      router.push('/dashboard/settings');
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
        <DashboardHeader/>
        <div className="flex-1 space-y-4 p-8 pt-6">
            <Card className="max-w-md mx-auto">
            <CardHeader>
                <h2 className="text-2xl font-bold">Nouvelle Année Scolaire</h2>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="year">Année Scolaire</Label>
                    <Input
                    id="year"
                    placeholder="2023-2024"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    pattern="\d{4}-\d{4}"
                    required
                    />
                    <p className="text-sm text-muted-foreground">
                    Format: YYYY-YYYY (ex: 2023-2024)
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch
                    id="active"
                    checked={isActive}
                    onCheckedChange={setIsActive}
                    />
                    <Label htmlFor="active">Définir comme année active</Label>
                </div>
                </CardContent>
                <CardFooter>
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? "Création..." : "Créer l'année scolaire"}
                </Button>
                </CardFooter>
            </form>
            </Card>
        </div>
        </>
  );
}