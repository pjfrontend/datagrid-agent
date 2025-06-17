export const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/**
 * Random selection with at least 1
 * @param arr 
 * @param min 
 * @returns 
 */
export const getRandomSubset = (arr: string[], min: number = 1): string[] => {
    const shuffled = arr.slice().sort(() => Math.random() - 0.5);
    const count = Math.max(min, Math.floor(Math.random() * arr.length));
    return shuffled.slice(0, count);
};
