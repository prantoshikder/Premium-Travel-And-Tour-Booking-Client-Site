/* FAQ copy per money page — feeds both the on-page accordion and FAQPage schema. */

export type Faq = { question: string; answer: string };

export const tourFaqs: Faq[] = [
  {
    question: "What is included in a TravelPerk tour package?",
    answer:
      "Every package covers accommodation, guided sightseeing, airport transfers and the activities listed in the itinerary. Flights and travel insurance can be added during checkout.",
  },
  {
    question: "How far in advance should I book a tour?",
    answer:
      "Booking 4–8 weeks ahead gets you the best prices and the widest choice of dates. Popular beach and luxury tours in peak season often sell out 3 months in advance.",
  },
  {
    question: "Can I cancel or reschedule my tour?",
    answer:
      "Yes. Cancel free of charge within 24 hours of booking, and up to 14 days before departure for a full refund minus the deposit. Date changes are free once per booking.",
  },
  {
    question: "Are the tours suitable for families with children?",
    answer:
      "Most are. Tours marked Family are designed around shorter travel days and child-friendly activities, and children under 5 travel free on selected packages.",
  },
];

export const hotelFaqs: Faq[] = [
  {
    question: "Do I pay for the hotel now or at the property?",
    answer:
      "Both options exist. Many stays offer Pay at property, while discounted rates are prepaid at booking. The payment terms are shown before you confirm.",
  },
  {
    question: "Is breakfast included in the nightly price?",
    answer:
      "Breakfast is included wherever the room shows a Breakfast tag. Otherwise it can usually be added at check-in for a small fee.",
  },
  {
    question: "How does the best price guarantee work?",
    answer:
      "Find the same room, dates and conditions cheaper elsewhere within 24 hours of booking and we refund the difference to your original payment method.",
  },
  {
    question: "What time are check-in and check-out?",
    answer:
      "Standard check-in is 14:00 and check-out 12:00. Early check-in and late check-out are subject to availability and can be requested free of charge.",
  },
];

export const flightFaqs: Faq[] = [
  {
    question: "When is the cheapest time to book a flight?",
    answer:
      "For international routes, 6–10 weeks before departure is usually cheapest. Midweek departures and early-morning flights are typically 15–25% below weekend fares.",
  },
  {
    question: "Is baggage included in the fare shown?",
    answer:
      "Every fare includes one carry-on bag. Checked baggage is included on most full-service airlines and can be added to basic fares during checkout.",
  },
  {
    question: "Can I change or cancel my flight booking?",
    answer:
      "Cancel free within 24 hours of booking. After that, changes follow the airline's fare rules, which are displayed before payment.",
  },
  {
    question: "Do you charge a booking fee?",
    answer:
      "No. The price you see includes taxes and our service — there are no hidden fees added at the payment step.",
  },
];

export const activityFaqs: Faq[] = [
  {
    question: "Do I need to print my activity ticket?",
    answer:
      "No. Your e-ticket with a QR code arrives by email straight after payment and can be scanned from your phone at the meeting point.",
  },
  {
    question: "What happens if the weather is bad?",
    answer:
      "Weather-dependent activities such as cruises and paragliding are rescheduled free of charge, or refunded in full if no alternative date suits you.",
  },
  {
    question: "Are activities available for large groups?",
    answer:
      "Yes. Groups of 10 or more get a discounted rate and a dedicated coordinator — contact our team and we will arrange it.",
  },
];

export const visaFaqs: Faq[] = [
  {
    question: "How long does visa processing take?",
    answer:
      "It depends on the destination: 3–5 working days for the UAE and Singapore, and 10–20 working days for the US, UK, Canada and Schengen countries.",
  },
  {
    question: "What documents do I need to apply?",
    answer:
      "A passport valid for at least six months, recent photographs, proof of funds, travel itinerary and, where applicable, employment or study documents. We send a checklist for your exact destination.",
  },
  {
    question: "What happens if my visa is refused?",
    answer:
      "Our service fee is refunded on refusal for reasons within our control, and our advisers help you prepare a stronger reapplication. Embassy fees are non-refundable.",
  },
  {
    question: "Do you handle the embassy appointment as well?",
    answer:
      "Yes. We book the appointment slot, prepare the file and brief you for the interview where one is required.",
  },
];
