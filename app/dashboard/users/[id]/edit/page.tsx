"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Classes, Role } from "@/types";

const EditUserPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
    class: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = useParams(); // Get user ID from route params

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${id}`, { method: "GET" });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        console.log(data);

        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          birthDate: data.birthDate || "",
          email: data.email || "",
          password: data.password || "",
          class: data.class || "",
          role: data.role || "",
        });
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUser();
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
      // Ensure the class field is cleared if the role is Admin
      const updatedFormData = formData.role === "Admin" ? { ...formData, class: "" } : formData;

      console.log(updatedFormData);

      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      alert("User updated successfully!");
      router.push("/dashboard/users"); // Redirect after successful update
    } catch (err: any) {
      setError(err.message || "An error occurred while updating the user.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">{"Modifier l'utilisateur"}</h2>
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
          <Label htmlFor="birthDate">Date de naissance</Label>
          <Input
            id="birthDate"
            type="date"
            value={formData.birthDate || ""}
            onChange={(e) => handleChange("birthDate", e.target.value)}
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="text"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
          />
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Mise à jour..." : "Mettre à jour"}
        </Button>
      </form>
    </div>
  );
};

export default EditUserPage;
