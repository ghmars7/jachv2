"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Classes } from "@/types";

export default function NewStudentForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: null,
    class: "",
    parentEmail: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.birthDate || !formData.class) {
      alert("Please fill out all required fields.");
      return;
    }

    const formatedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthDate: formData.birthDate, // Utiliser la date telle quelle
      email: `${formData.firstName}.${formData.lastName}@ecole.fr`.toLowerCase(), // Générer un email basé sur prénom et nom
      parentEmail: formData.parentEmail ? formData.parentEmail : `parent.${formData.lastName}@email.com`.toLowerCase(), // Email parent par défaut
      class: formData.class, // Classe par défaut
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/students/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formatedData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Student created successfully!");
        console.log("Created student:", result);
        setFormData({
          firstName: "",
          lastName: "",
          birthDate: null,
          class: "",
          parentEmail: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to create student"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while creating the student.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Ajouter un nouvel élève</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="firstName">Prénom *</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Entrer prénom"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="lastName">Nom *</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Entrer nom"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="birthDate">Date de naissance *</Label>
          <Input id="birthDate" type="date" onChange={(e) => handleChange("birthDate", e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="class">Classe *</Label>
          <Select onValueChange={(value) => handleChange("class", value)} value={formData.class}>
            <SelectTrigger id="class">
              <SelectValue placeholder="Sélectionnez une classe" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(Classes)
                .filter((key) => isNaN(Number(key))) // Exclude numeric keys
                .map((className) => (
                  <SelectItem key={Classes[className as keyof typeof Classes]} value={className.toString()}>
                    {className}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="parentEmail">Email des parents</Label>
          <Input
            id="parentEmail"
            type="email"
            placeholder="Entrer email parent"
            value={formData.parentEmail}
            onChange={(e) => handleChange("parentEmail", e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Création..." : "Ajouter un élève"}
        </Button>
      </form>
    </div>
  );
}
