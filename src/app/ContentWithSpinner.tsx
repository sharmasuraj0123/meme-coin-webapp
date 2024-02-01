// ContentWithSpinner.tsx

import React from "react";
import { useLoading } from "@/context/Loading";
import { Spinner } from "@/components/Spinner";

const ContentWithSpinner: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoading, spinnerText } = useLoading();

  return (
    <>
      {isLoading && <Spinner text={spinnerText} />}
      {children}
    </>
  );
};

export default ContentWithSpinner;
