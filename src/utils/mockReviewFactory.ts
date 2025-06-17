import { generateId } from "./generateId";
import { generateName } from "./generateName";
import { getRandomSubset } from "./getRandomItem";
import type { Contact, Review } from "./types";

  // Sample goal and recommendation data
  const sampleGoals = [
    "Retiring early",
    "Paying for children's tuition",
    "Saving to invest",
    "Buying a second home",
    "Financial independence",
    "Reducing tax liabilities"
  ];
  
  const sampleRecommendations = [
    "Open an ISA",
    "Transfer to a pension",
    "Make regular contributions",
    "Consolidate accounts",
    "Increase monthly savings",
    "Speak to a financial adviser"
  ];

  const generatePastDate = (): string => {
    const now = new Date();
    const past = new Date(now);
    past.setDate(now.getDate() - Math.floor(Math.random() * 730)); // up to 2 years ago
    return past.toISOString().split('T')[0];
  };
      
  const createReview = (contacts:Contact[]): Review => {
    const {first, last} = generateName();
  
    return {
      id: generateId(),
      date: generatePastDate(),
      reviewer: `${first} ${last}`,
      contacts,
      goals: getRandomSubset(sampleGoals, 1),
      recommendations: getRandomSubset(sampleRecommendations, 1)
    };
  };
  
  // Factory function to create multiple reviews
  export const createReviews = (count: number): Review[] =>
    Array.from({ length: count }, createReview);

  