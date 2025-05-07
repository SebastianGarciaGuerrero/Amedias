// src/hooks/useAmedias.js
import { useContext } from "react";
import { amediasContext } from "../context/AmediasContext";

export function useAmedias() {
  return useContext(amediasContext);
}