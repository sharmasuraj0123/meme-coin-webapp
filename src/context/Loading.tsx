import React, { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
  isLoading: boolean;
  spinnerText: string;
  setLoading: (loading: boolean, text?: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [spinnerText, setSpinnerText] = useState("");

  const setLoading = (loading: boolean, text: string = "") => {
    setIsLoading(loading);
    setSpinnerText(text);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, spinnerText, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
