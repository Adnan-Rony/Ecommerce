import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    category: "Delivery",
    question: "ডেলিভারি কতদিনে পাবো?",
    answer:
      "ঢাকার ভেতরে ১-২ দিন এবং ঢাকার বাইরে ২-৪ দিনের মধ্যে ডেলিভারি দেওয়া হয়। সব ডেলিভারি সম্পূর্ণ বিনামূল্যে।",
    icon: "🚚",
  },
  {
    category: "Payment",
    question: "কীভাবে পেমেন্ট করবো?",
    answer:
      "আমরা শুধুমাত্র Cash on Delivery (COD) গ্রহণ করি। পণ্য হাতে পেয়ে টাকা দিন — কোনো অগ্রিম পেমেন্ট নেই।",
    icon: "💰",
  },
  {
    category: "Return",
    question: "পণ্য ফেরত দেওয়া যাবে?",
    answer:
      "হ্যাঁ, পণ্য ডেলিভারির ৭ দিনের মধ্যে ফেরত দেওয়া যাবে — যদি পণ্যটি defective বা wrong হয়। আমাদের WhatsApp এ যোগাযোগ করুন।",
    icon: "🔄",
  },
  {
    category: "Order",
    question: "অর্ডার ট্র্যাক করবো কীভাবে?",
    answer:
      "আমাদের Track Order পেজে গিয়ে আপনার phone number দিন — আপনার সব অর্ডারের status দেখতে পাবেন।",
    icon: "📦",
  },
  {
    category: "Product",
    question: "পণ্য কি আসল/অরিজিনাল?",
    answer:
      "হ্যাঁ, আমাদের সব পণ্য ১০০% অরিজিনাল এবং যাচাইকৃত। প্রতিটি পণ্য আমরা নিজেরা চেক করে পাঠাই।",
    icon: "✅",
  },
  {
    category: "Order",
    question: "অ্যাকাউন্ট ছাড়া অর্ডার করা যাবে?",
    answer:
      "হ্যাঁ! আমাদের ওয়েবসাইটে অ্যাকাউন্ট ছাড়াই পণ্য কার্টে যোগ করে অর্ডার দেওয়া যায়। শুধু নাম, ফোন নম্বর এবং ঠিকানা দিলেই হবে।",
    icon: "👤",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-4 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaQuestionCircle className="text-2xl text-blue-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800">FAQ</h2>
          <p className="text-gray-500 mt-2 text-sm">
            আপনার মনে যা প্রশ্ন আসছে — এখানে উত্তর পাবেন
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-sm border transition-all duration-200 overflow-hidden ${
                openIndex === index
                  ? "border-blue-200 shadow-md"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="flex items-center justify-between w-full p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{faq.icon}</span>
                  <div>
                    <span className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
                      {faq.category}
                    </span>
                    <p className="text-gray-800 font-semibold text-sm mt-0.5">
                      {faq.question}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    openIndex === index ? "bg-blue-600" : "bg-gray-100"
                  }`}
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openIndex === index
                        ? "rotate-180 text-white"
                        : "text-gray-500"
                    }`}
                  />
                </div>
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-300 ${
                  openIndex === index ? "max-h-40" : "max-h-0"
                } overflow-hidden`}
              >
                <div className="px-5 pb-5 pl-14">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 bg-gradient-to-r from-[#0f2d6e] to-[#1d4c9e] rounded-2xl p-6 text-center">
          <p className="text-white font-semibold text-lg mb-2">
            আরো প্রশ্ন আছে?
          </p>
          <p className="text-blue-200 text-sm mb-4">
            আমাদের WhatsApp এ সরাসরি যোগাযোগ করুন
          </p>

          <a
            href="https://wa.me/8801618094828"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2.5 rounded-xl transition text-sm shadow-md"
          >
            💬 WhatsApp এ Message করুন
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
