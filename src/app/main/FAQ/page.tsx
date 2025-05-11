"use client";

import { useState } from 'react';

const faqs = [
  {
    question: 'What courses are offered at Quick Tech Institute Of Information Technology?',
    answer:
      'We offer a variety of courses including DIT (01 Year), CIT (06 Months), OAT (03 Months), and Graphic Designing (06 Months). Each course is designed to provide practical, industry-relevant skills.',
  },
  {
    question: 'How can I apply for admission?',
    answer:
      'You can apply by filling out the online Admission Form on our website. After submission, you will receive details about the entry test, which is scheduled for 25 May 2025.',
  },
  {
    question: 'What are the requirements for the entry test?',
    answer:
      'You must bring your Admit Card and a valid CNIC/B-Form to the test center. Arrive at least 30 minutes early, and note that electronic devices are not allowed in the exam hall.',
  },
  {
    question: 'Are there any special offers for students?',
    answer:
      'Yes, we offer free laptops to top position holders! Apply by 25 May 2025 to be eligible. Contact us at +9230003657852 for more details.',
  },
  {
    question: 'How can I contact the academy?',
    answer:
      'You can reach us by phone at +9230003657852, email at info@quicktech.com, or visit us at Gill Colony Near Hazaray Shah Muhalla, Mirpur Mathelo. You can also use the Contact form on our website.',
  },
  {
    question: 'What campuses are available?',
    answer:
      'We have campuses in Mirpur Mathelo and waiting. You can select your preferred campus when filling out the Admission Form.',
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto my-5 bg-teal-700 text-white p-5 rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-teal-600">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left py-3 flex justify-between items-center focus:outline-none"
            >
              <span className="text-lg font-semibold">{faq.question}</span>
              <span className="text-xl">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div className="pb-3 text-left">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;