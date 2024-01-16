import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function validateEmail(email: string) {
  const pattern = /^([a-z\d\.]*)@([a-z\d-]*)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
  return pattern.test(email);
}

export default async function fetcher(url: string, data?: unknown) {
  const options: RequestInit = {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${window.location.origin}/api/${url}`, options);
  const jsonData = await res.json();

  if (res.status > 399 || res.status < 200) {
    throw new Error(jsonData.message);
  }

  return jsonData;
}

export function randomNum(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
