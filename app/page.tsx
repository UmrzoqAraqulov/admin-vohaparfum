"use client";

import { getLocalStorage } from "@/const";
import { useRouter } from "next/navigation";

export default function Home() {
  const routes = useRouter();
  const token = getLocalStorage();

  if (token) {
    routes.push("/dashboard");
  } else {
    routes.push("/login");
  }
}
