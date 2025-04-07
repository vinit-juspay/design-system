import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names or class value arrays and merges Tailwind CSS classes
 * This utility helps prevent class conflicts and duplication
 * 
 * @param {...ClassValue[]} inputs - Class names or class values to be combined
 * @returns {string} A string of merged and optimized class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 