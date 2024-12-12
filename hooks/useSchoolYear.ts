"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import useSWR from "swr";
import type { SchoolYear } from "@/types/index";

// Type pour le store Zustand
interface SchoolYearState {
  currentYear: string | null;
  setCurrentYear: (year: string) => void;
  isHydrated: boolean; // État pour suivre l'hydratation
  setIsHydrated: () => void;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());


// Store Zustand pour gérer l'année scolaire actuelle
export const useSchoolYearStore = create<SchoolYearState>()(
  persist(
    (set) => ({
      currentYear: null,
      isHydrated: false,
      setCurrentYear: (year) => set({ currentYear: year }),
      setIsHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "school-year-storage",
      onRehydrateStorage: () => (state) => {
        if (state) state.setIsHydrated(); // Marque l'hydratation comme terminée
      },
    }
  )
);

// Hook pour récupérer les années scolaires
export function useSchoolYears() {
  const { data, error, isLoading, mutate } = useSWR<{schoolYears: SchoolYear[]}>("/api/school-years", fetcher);

  // Debugging : Ajout d'un log pour voir les données reçues
  return {
    schoolYears: data, // Retourne les années scolaires ou un tableau vide
    isLoading,
    isError: !!error,
    mutate,
  };
}
