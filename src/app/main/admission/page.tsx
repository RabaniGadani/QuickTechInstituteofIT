'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast'; // ✅ Importing Toaster
import { createClient } from '@/lib/client';

const AdmissionForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submittedCNIC, setSubmittedCNIC] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData.entries());

    const {
      fullName,
      fatherName,
      email,
      phone,
      parentPhone,
      address,
      CNIC,
      dob,
      campus,
      course,
      previousSchool,
      qualification,
    } = formEntries;

    const { data: existingUser, error: userError } = await supabase
      .from("Admission_Table")
      .select("*")
      .eq("CNIC", CNIC);

    if (userError) {
      toast.error("Error checking existing user. Please try again.");
      console.error(userError);
      setLoading(false);
      return;
    }

    if (existingUser && existingUser.length > 0) {
      toast.error("A user with this CNIC already exists.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("Admission_Table").insert([
      {
        fullName,
        fatherName,
        email,
        phone,
        parentPhone,
        address,
        CNIC,
        dob,
        campus,
        course,
        previousSchool,
        qualification,
      },
    ]);

    if (insertError) {
      toast.error("Failed to submit form. Please check your details or contact support.");
      console.error(insertError);
    } else {
      toast.success("Application submitted successfully!");
      setSubmittedCNIC(CNIC as string);
    }

    setLoading(false);
  };

  return (
    <section className="bg-white min-h-screen py-10">
      {/* ✅ Toaster for Toast Notifications */}
      

      <div className="flex items-center justify-center">
        <div className="bg-teal-900 p-8 rounded-lg shadow-lg w-full max-w-4xl border border-white">
          <div className="flex justify-center mb-6">
            <div className="relative w-[90px] h-[70px]">
              <Image
                src="/Logo-.png"
                alt="School Logo"
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Admission Form
          </h2>

          {submittedCNIC ? (
            <div className="text-center space-y-4">
              <p className="text-green-300 font-semibold">
                Your application has been submitted successfully!
              </p>
              <Link
                href="/main/admitCard"
                target="_blank"
                className="inline-block mt-4 px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition"
              >
                Download Admit Card
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Form Fields */}
                <div>
                  <label className="block mb-2 text-sm font-semibold">Full Name: *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    className="w-full p-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">Father Name: *</label>
                  <input
                    type="text"
                    name="fatherName"
                    required
                    className="w-full p-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter your father's name"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">Email: *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full p-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">Phone Number: *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full p-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">Parents' Phone: *</label>
                  <input
                    type="tel"
                    name="parentPhone"
                    required
                    className="w-full p-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter parent phone number"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">Address: *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    className="w-full p-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter your address"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">CNIC: *</label>
                  <input
                    type="text"
                    name="CNIC"
                    required
                    maxLength={13}
                    className="w-full p-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter CNIC number"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">Date of Birth: *</label>
                  <input
                    type="date"
                    name="dob"
                    required
                    className="w-full p-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">Campus: *</label>
                  <select
                    name="campus"
                    required
                    className="w-full p-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">-- Select a Campus --</option>
                    <option value="Mirpur Mathelo Campus">Mirpur Mathelo Campus</option>
                    <option value="Sukkur Campus">Sukkur Campus</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">Course: *</label>
                  <select
                    name="course"
                    required
                    className="w-full p-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">-- Select a Course --</option>
                    <option value="DIT">DIT (01 Year)</option>
                    <option value="CIT">CIT (06 Months)</option>
                    <option value="OAT">OAT (03 Months)</option>
                    <option value="Graphic Designing">Graphic Designing</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">Previous School/College: *</label>
                  <input
                    type="text"
                    name="previousSchool"
                    required
                    className="w-full p-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter previous school/college"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">Highest Qualification: *</label>
                  <input
                    type="text"
                    name="qualification"
                    required
                    className="w-full p-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter your qualification"
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link 
                  href="/main/admitCard" 
                  className="text-white hover:text-teal-500 font-medium"
                >
                  Download Admit Card
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-teal-900 py-3 font-semibold rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdmissionForm;
