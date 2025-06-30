import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How long does delivery take?",
    answer: "Delivery usually takes 2–3 business days depending on your location.",
  },
  {
    question: "Can I return a product?",
    answer: "Yes, you can return any product within 7 days of delivery.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept online card payments via Stripe and Cash on Delivery (COD).",
  },
  {
    question: "Is my payment secure?",
    answer: "Yes, we use industry-standard encryption and payment gateways like Stripe.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg shadow-sm bg-white">
            <button
              onClick={() => toggle(index)}
              className="flex items-center justify-between w-full p-4 text-left text-lg font-medium"
            >
              {faq.question}
              {openIndex === index ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
