"use client";

export const setToLocalStorage = (key: string, token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, token);
  }
};

export const getFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

export const removeFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
