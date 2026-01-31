import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Format currency/points
export const formatPoints = (points: number) => {
    return new Intl.NumberFormat("en-US").format(points);
};
