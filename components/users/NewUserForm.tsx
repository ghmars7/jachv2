"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { passwordGenerator } from "@/utils/PasswordGenerator";
import { Classes, Role } from "../../types";
import { useRouter } from "next/navigation";

export default function NewUserForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "", // Initial password value is empty
    class: "",
    role: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // UseEffect hook to generate password once on mount
  useEffect(() => {
    const initialPassword = passwordGenerator(6); // Generate password once
    setFormData((prev) => ({
      ...prev,
      password: initialPassword, // Set the generated password in the state
    }));
  }, []); // Empty dependency array ensures it only runs once on mount

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.birthDate || !formData.role) {
      alert("Please fill out all required fields.");
      return;
    }


    const formatedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthDate: formData.birthDate,
      email: `${formData.firstName}.${formData.lastName}@group-saint-exupery.fr`.toLowerCase(), // Générer un email basé sur prénom et nom
      password: formData.password,
      class: formData.class,
      role: formData.role,
    };

    console.log("Formated Data:", formatedData);

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formatedData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("User created successfully!");
        console.log("Created user:", result);
        router.push("/dashboard");

        
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to create user"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while creating the user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Ajouter un nouvel utilisateur</h2>
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
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="text"
            value={formData.password}
            disabled
          />
        </div>
        <div>
          <Label htmlFor="birthDate">Date de naissance *</Label>
          <Input id="birthDate" type="date" onChange={(e) => handleChange("birthDate", e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="class">Role *</Label>
          <Select onValueChange={(value) => handleChange("role", value)} value={formData.role}>
            <SelectTrigger id="class">
              <SelectValue placeholder="Sélectionnez un role" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(Role)
                .filter((key) => isNaN(Number(key))) // Exclude numeric keys
                .map((roleName) => (
                  <SelectItem key={Role[roleName as keyof typeof Role]} value={roleName.toString()}>
                    {roleName}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {formData.role === "professeur" && (
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
        )}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Création..." : "Ajouter Utilisateur"}
        </Button>
      </form>
    </div>
  );
}
