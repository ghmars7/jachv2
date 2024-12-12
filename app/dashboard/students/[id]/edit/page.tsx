"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Admission, Classes } from "@/types";

const EditStudentPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    class: "",
    birthDate: "",
    parentEmail: "",
    admission: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = useParams(); // Get student ID from route params

  // Fetch student data
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`/api/students/${id}`, { method: "GET" });
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const data = await response.json();
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          class: data.class,
          birthDate: data.birthDate,
          parentEmail: data.parentEmail,
          admission: data.admission,
        });
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchStudent();
  }, [id]);

  // Handle form changes
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update student");
      }

      alert("Student updated successfully!");
      router.push("/dashboard/students"); // Redirect after successful update
    } catch (err: any) {
      setError(err.message || "An error occurred while updating the student.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">{"Modifier l'élève"}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="firstName">Prénom</Label>
          <Input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Nom</Label>
          <Input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="class">Classe</Label>
          <Select onValueChange={(value) => handleChange("class", value)} value={formData.class}>
            <SelectTrigger id="class">
              <SelectValue placeholder="Sélectionnez une classe" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(Classes)
                .filter(([key, value]) => isNaN(Number(key))) // Ensure we only use string keys (class names)
                .map(([key, value]) => (
                  <SelectItem key={value} value={key}>
                    {key}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="birthDate">Date de naissance</Label>
          <Input
            id="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={(e) => handleChange("birthDate", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="parentEmail">Email du parent</Label>
          <Input
            id="parentEmail"
            type="email"
            value={formData.parentEmail}
            onChange={(e) => handleChange("parentEmail", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="admission">Admission</Label>
          <Select onValueChange={(value) => handleChange("admission", value)} value={formData.admission}>
            <SelectTrigger id="admission">
              <SelectValue placeholder="Select Admission" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(Admission)
                .filter(([key, value]) => isNaN(Number(key))) // Ensure we only use string keys (class names)
                .map(([key, value]) => (
                  <SelectItem key={value} value={key}>
                    {key}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Mise à jour..." : "Mettre à jour"}
        </Button>
      </form>
    </div>
  );
};

export default EditStudentPage;
