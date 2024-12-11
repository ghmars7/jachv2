import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR("/api/users", fetcher);

  return {
    users: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useUser(id: string) {
  const { data, error, isLoading, mutate } = useSWR(id ? `/api/users/${id}` : null, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
}
