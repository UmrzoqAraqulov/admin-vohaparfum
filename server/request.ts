"use client";

import { getLocalStorage } from "@/const";
import axios, { AxiosInstance } from "axios";
// import { getCookie } from "cookies-next";
const token = getLocalStorage();

export const request: AxiosInstance = axios.create({
  baseURL: "https://ap-vodiy-parfum-backend.up.railway.app/api/v1/",
  timeout: 10000,
  headers: {
    Authorization: token ? `Bearer ${token}` : null,
  },
});
