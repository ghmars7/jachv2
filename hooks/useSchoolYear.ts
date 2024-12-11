"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useSWR from 'swr'; 
import { SchoolYear } from '@/types/index';

interface SchoolYearState {
  currentYear: string | null;
  setCurrentYear: (year: string) => void;
  isHydrated: boolean; // New state to track hydration
  setIsHydrated: () => void;
}

export const useSchoolYearStore = create<SchoolYearState>()(
  persist(
    (set) => ({
      currentYear: null,
      isHydrated: false,
      setCurrentYear: (year) => set({ currentYear: year }),
      setIsHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'school-year-storage',
      onRehydrateStorage: () => (state) => {
        if (state) state.setIsHydrated(); // Set `isHydrated` when storage is ready
      },
    }
  )
);

export function useSchoolYears() {
  const { data, error, isLoading, mutate } = useSWR<SchoolYear[]>(
    '/api/school-years'
  );

  return {
    schoolYears: data,
    isLoading,
    isError: error,
    mutate,
  };
}
