import { generateName } from "./generateName";
import { getRandomItem } from "./getRandomItem";
import type { Contact, FinancialProduct, FinancialProductType } from "./types";

const streets = ['High Street', 'Station Road', 'Church Lane', 'London Road', 'Victoria Avenue'];
const cities = ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool'];
const emailDomains = ['example.co.uk', 'mail.co.uk', 'testmail.uk', 'fakemail.com'];


const generateEmail = (first: string, last: string): string => {
  const domain = getRandomItem(emailDomains);
  const rand = Math.floor(Math.random() * 1000);
  return `${first.toLowerCase()}.${last.toLowerCase()}${rand}@${domain}`;
};

const generatePhoneNumber = (): string => {
  const number = Math.floor(700000000 + Math.random() * 100000000); // UK mobile range
  return `07${number}`;
};

const generateAddress = (): string => {
  const number = Math.floor(Math.random() * 100) + 1;
  const street = getRandomItem(streets);
  const city = getRandomItem(cities);
  const postcode = `SW${Math.floor(Math.random() * 20) + 1} ${Math.floor(Math.random() * 9)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
  return `${number} ${street}, ${city}, ${postcode}`;
};

const generateFinancialProducts = (): FinancialProduct[] => {
    const productTypes: FinancialProductType[] = ['ISA', 'GIA', 'Pension', 'Current Account'];
    const selected = productTypes.filter(() => Math.random() < 0.75);
    // Guarantee at least one product
    const finalSelection = selected.length > 0
      ? selected
      : [getRandomItem(productTypes)];
  
    return finalSelection.map(type => ({
      type,
      balance: parseFloat((Math.random() * 50000 + 100).toFixed(2)),
    }));
  };
const createContact = (): Contact => {
  const {first, last} = generateName();

  return {
    name: `${first} ${last}`,
    email: generateEmail(first, last),
    phone: generatePhoneNumber(),
    address: generateAddress(),
    financialProducts: generateFinancialProducts(),
  };
};

export const createContacts = (count: number): Contact[] => {
  return Array.from({ length: count }, () => createContact());
};