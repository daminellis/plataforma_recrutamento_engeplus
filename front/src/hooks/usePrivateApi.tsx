/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "@/service/axios";
import { getToken } from "@/utils/getAuthLocalStorage";

export const usePrivateApi = <T,>(
  route: string,
  onTry?: (response: AxiosResponse<T>) => void,
  onCatch?: (error: AxiosError) => void
): {
  isLoading: boolean;
  error: AxiosError | null;
  data: T | null;
} => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [data, setData] = useState<T | null>(null);

  const tokenString = getToken();
  const token = tokenString ? tokenString : null;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token.token}`;
  }

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setError(null);

    api
      .get<T>(route)
      .then((response: AxiosResponse<T>) => {
        setData(response.data);
        if (onTry) onTry(response);
      })
      .catch((error: AxiosError) => {
        setError(error);

        if (error.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }

        if (onCatch) onCatch(error);

        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return { isLoading, error, data };
};
