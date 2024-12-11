import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useClasses() {
  const { data, error, isLoading, mutate } = useSWR("/api/classes", fetcher);

  return {
    classes: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useClass(id: string) {
  const { data, error, isLoading, mutate } = useSWR(id ? `/api/classes/${id}` : null, fetcher);

  return {
    class: data,
    isLoading,
    isError: error,
    mutate,
  };
}
