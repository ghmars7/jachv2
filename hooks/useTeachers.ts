import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useTeachers() {
  const { data, error, isLoading, mutate } = useSWR("/api/teachers", fetcher);

  return {
    teachers: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useTeacher(id: string) {
  const { data, error, isLoading, mutate } = useSWR(id ? `/api/teachers/${id}` : null, fetcher);

  return {
    teacher: data,
    isLoading,
    isError: error,
    mutate,
  };
}
