// if not logged in, redirect to login page
import { verifyAuthSession } from "@/auth/session";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  return {
    title: "Dashboard",
  };
}

export default async function Dashboard() {
  const authSession = await verifyAuthSession();
  if (!authSession) {
    redirect("/auth/sign-in");
  }

  return <div>Dashboard</div>;
}
