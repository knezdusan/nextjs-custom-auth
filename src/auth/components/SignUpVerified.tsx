"use client";

import { TAuth } from "@/lib/def";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createAuthSession } from "../session";

export type SignupVerifiedProps = {
  authPayload: TAuth;
};

export default function SignupVerified({ authPayload }: SignupVerifiedProps) {
  const { name, email, role, clientId, company, hostname, status } = authPayload;

  const router = useRouter();
  const [error, setError] = useState(false);

  useEffect(() => {
    const createSession = async () => {
      const success = await createAuthSession({
        name,
        email,
        role,
        clientId,
        company,
        hostname,
        status,
      });

      if (!success) {
        setError(true); // Set error state instead of returning JSX
        return;
      }

      // Redirect to dashboard after successful session creation
      router.push("/dashboard");
    };

    createSession();
  }, [name, email, role, clientId, company, hostname, status, router]);

  if (error) {
    return <p>Signup verification failed</p>;
  }

  return <div>Signup verified. Redirecting...</div>;
}
