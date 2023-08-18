"use client";

import { getLocalStorage } from "@/const";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const routes = useRouter();
  const token = getLocalStorage();

  useEffect(() => {
    if (token) {
      routes.push("/dashboard");
    } else {
      routes.push("/login");
    }
  }, [token,routes]);
}
