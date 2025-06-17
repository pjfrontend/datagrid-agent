import { generateId } from "./generateId";
import { createContacts } from "./mockContactFactory";
import { createReviews } from "./mockReviewFactory";
import type { Contact, FinancialAccount, Review } from "./types";

  const createFinancialAccount = (
    contacts: Contact[],
    reviews: Review[]
  ): FinancialAccount => {
    const names = contacts.map((x)=>x.name)
    const formattedNames = names.length > 1
    ? `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}`
    : names[0] || '';
    return {
      id: generateId(),
      name: formattedNames,
      contacts,
      reviews,
    };
  };
  
  export const createFinancialAccounts = (
    count: number
  ): FinancialAccount[] => {
    const accounts: FinancialAccount[] = [];
  
    for (let i = 0; i < count; i++) {
      const numberOfContacts = (i % 2) + 1; 
      const sampleContacts: Contact[] = createContacts(numberOfContacts);

      const sampleReviews: Review[] =  createReviews(3)
  
      accounts.push(createFinancialAccount(sampleContacts, sampleReviews));
    }
  
    return accounts;
  };
  

  