/* /visa — application steps and country pricing. */

export const visaSteps = [
  { title: "Choose Destination", text: "Pick the country you're travelling to and the visa type you need.", icon: "compass" },
  { title: "Submit Documents", text: "Upload your passport and required documents securely online.", icon: "passport" },
  { title: "We Process It", text: "Our experts review and submit your application to the embassy.", icon: "shield" },
  { title: "Get Approved", text: "Receive your approved visa straight to your inbox on time.", icon: "ticket" },
];


export const visaCountries: {
  country: string;
  flag: string;
  processing: string;
  price: number;
  type: string;
}[] = [
  { country: "United States", flag: "🇺🇸", processing: "10–15 days", price: 160, type: "Tourist B1/B2" },
  { country: "United Kingdom", flag: "🇬🇧", processing: "15–20 days", price: 140, type: "Standard Visitor" },
  { country: "Canada", flag: "🇨🇦", processing: "12–18 days", price: 130, type: "Visitor Visa" },
  { country: "Schengen (EU)", flag: "🇪🇺", processing: "10–14 days", price: 120, type: "Tourist Schengen" },
  { country: "Australia", flag: "🇦🇺", processing: "14–20 days", price: 150, type: "Visitor 600" },
  { country: "United Arab Emirates", flag: "🇦🇪", processing: "3–5 days", price: 100, type: "Tourist 30 days" },
  { country: "Japan", flag: "🇯🇵", processing: "5–8 days", price: 90, type: "Tourist Visa" },
  { country: "Singapore", flag: "🇸🇬", processing: "3–5 days", price: 80, type: "Tourist Visa" },
];
