"use client";

import { TAuth } from "@/lib/def";
import { createAuthSessionAction } from "../actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export type FormSignupVerifiedProps = {
  authPayload: TAuth;
};

export default function FormSignupVerified(authPayload: FormSignupVerifiedProps) {
  const { name, email, role, clientId, company, hostname, status } = authPayload.authPayload;

  const router = useRouter();

  useEffect(() => {
    const createSession = async () => {
      const createAuthSession = await createAuthSessionAction({
        name,
        email,
        role,
        clientId,
        company,
        hostname,
        status,
      });

      if (!createAuthSession) {
        return <p>Signup verification failed</p>;
      }

      router.push("/dashboard");
    };

    createSession();
  }, [name, email, role, clientId, company, hostname, status, router]);

  return <div>Signup verified</div>;
}
