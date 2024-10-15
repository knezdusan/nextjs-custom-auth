"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export default function ButtonSubmit({ children, styles }: { children: React.ReactNode; styles?: string }) {
  // useFormStatus

  const { pending } = useFormStatus();

  return (
    <>
      <Button type="submit" className={`min-w-56 ${styles}`} disabled={pending}>
        {pending ? "Submitting..." : children}
      </Button>
    </>
  );
}
