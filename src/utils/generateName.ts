import { getRandomItem } from "./getRandomItem";

const firstNames = ['Oliver', 'Amelia', 'George', 'Isla', 'Harry', 'Ava', 'Jack', 'Emily'];
const surnames = ['Smith', 'Jones', 'Taylor', 'Brown', 'Williams', 'Wilson', 'Johnson', 'Davies'];

export const generateName = ()=>{
    const first = getRandomItem(firstNames);
    const last = getRandomItem(surnames);

    return {first, last};
}