'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { createClient } from '@/lib/client';

interface AdmitCardData {
  fullName: string;
  fatherName: string;
  City: string;
  Qualification: string;
  course: string;
  Birth: number;
  CNIC: number;
  Picture: string;
  id: number;
  imageUrl: string;
  testDate?: string;
  testTime?: string;
  institute?: string;
  testVenue?: string;
  campus?: string;
  rollNumber?: string;
}

const GenerateCard = () => {
  const [CNIC, setCNIC] = useState('');
  const [Name, setName] = useState('');
  const [admitData, setAdmitData] = useState<AdmitCardData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = Name.trim();
    const trimmedCNIC = CNIC.trim();

    if (!trimmedName || !trimmedCNIC) {
      setError('Both fields are required!');
      return;
    }

    if (trimmedCNIC.length !== 13) {
      setError('CNIC must be exactly 13 digits.');
      return;
    }

    setError('');
    setLoading(true);
    const supabase = createClient();

    const { data, error } = await supabase
      .from('Admission_Table')
      .select('*')
      .eq('CNIC', trimmedCNIC)
      .ilike('fullName', `%${trimmedName}%`)
      .single();

    setLoading(false);

    if (error || !data) {
      toast.error('No record found.');
    } else {
      toast.success('Submitted Successfully');
      setAdmitData(data);
    }
  };

  const handlePrint = () => {
    const printContents = document.getElementById('print-area')?.innerHTML;
    if (!printContents) return;

    const printWindow = window.open('', '', 'height=800,width=800');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Admit Card</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              background-color: #ffffff;
            }
            .print-container {
              max-width: 800px;
              margin: auto;
              padding: 30px;
              border-radius: 10px;
              background-color: #fff;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .print-header {
              background-color: #006e6d;
              color: white;
              text-align: center;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            .print-content {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              gap: 20px;
            }
            .info-left, .info-right {
              width: 48%;
            }
            .student-image img {
              width: 120px;
              height: 120px;
              border-radius: 50%;
              margin-bottom: 16px;
            }
            .details-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            .details-table th, .details-table td {
              padding: 10px;
              border: 1px solid #ccc;
              text-align: left;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${printContents}
          </div>
          <script>
            window.onload = function () {
              window.print();
              window.onafterprint = () => window.close();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <section className="max-w-4xl mx-auto my-8 p-6 bg-white border border-teal-800 rounded-lg shadow-lg">
      <Toaster toastOptions={{ className: 'no-print' }} />

      {/* Form Section (Hidden in print) */}
      <form onSubmit={handleSubmit} className="mb-6 no-print flex flex-wrap gap-4">
        <input
          type="text"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
          className="border p-2 flex-1 min-w-[200px]"
        />
        <input
          type="text"
          value={CNIC}
          onChange={(e) => setCNIC(e.target.value)}
          placeholder="Enter CNIC"
          className="border p-2 flex-1 min-w-[200px]"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
        {error && <p className="text-red-600 w-full">{error}</p>}
      </form>

      {/* Admit Card Printable Section */}
      {admitData && (
        <div id="print-area" className="print-container">
          {/* Header */}
          <div className="print-header flex justify-between items-center rounded-t-md">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
              Admit Card - Entry Test 2025
            </h2>
            <div className="relative h-16 w-16">
              <Image
                src="/Logo-.png"
                alt="Academy Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="print-content flex flex-col sm:flex-row gap-6 border-b border-gray-200 p-4">
            <div className="student-image relative bg-gray-200 border border-teal-800 rounded-md">
              {admitData.imageUrl && (
                <Image
                  src={admitData.imageUrl}
                  alt="Student"
                  fill
                  className="object-cover rounded-md"
                />
              )}
            </div>
            <div className="flex-1">
              <p className="mb-2"><strong>Name:</strong> {admitData.fullName}</p>
              <p className="mb-2"><strong>Father:</strong> {admitData.fatherName}</p>
              <p className="mb-2"><strong>CNIC:</strong> {admitData.CNIC}</p>
              <p className="mb-2"><strong>Course:</strong> {admitData.course}</p>
              <p className="mb-2"><strong>Campus:</strong> {admitData.campus || 'N/A'}</p>
              <p className="mb-2"><strong>Roll Number:</strong> QT-00{admitData.id || 'N/A'}</p>
            </div>
          </div>

          {/* Test Details Table */}
          <table className="details-table my-6 text-sm">
            <thead>
              <tr>
                <th colSpan={2} className="text-left p-3">Test Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 font-semibold border">Date</td>
                <td className="p-3 border">{admitData.testDate || '25 May, 2025'}</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold border">Time</td>
                <td className="p-3 border">{admitData.testTime || '10:00 AM'}</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold border">Institute</td>
                <td className="p-3 border">Quick Tech Institute of Information Technology</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold border">Venue</td>
                <td className="p-3 border">
                  Quick Tech Institute of Information Technology, Gill Colony, Near Hazaray Shah Muhalla, Mirpur Mathelo
                </td>
              </tr>
            </tbody>
          </table>

          {/* Instructions */}
          <div className="text-sm">
            <p className="font-bold mb-2">Instructions:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Arrive at least 30 minutes before the test.</li>
              <li>Bring this admit card and a valid CNIC / B-Form.</li>
              <li>Electronic devices are not allowed in the exam hall.</li>
              <li className="text-red-600 font-bold">
                Note: This admit card is mandatory for entry to the test center.
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Print Button (Hidden in print) */}
      {admitData && (
        <div className="mt-6 flex justify-end no-print">
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Print Slip
          </button>
        </div>
      )}
    </section>
  );
};

export default GenerateCard;
   
