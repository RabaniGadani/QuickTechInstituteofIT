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
      .ilike('fullName', %${trimmedName}%)
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
    const printStyle = 
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f0f0f0;
        }
        .print-container {
          max-width: 100%;
          padding: 30px;
          background-color: #ffffff;
          margin: 0 auto;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          page-break-before: always;
        }
        .print-header {
          background-color: #006e6d;
          color: #fff;
          text-align: center;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
        }
        .print-header h2 {
          margin: 0;
          font-size: 28px;
        }
        .print-header img {
          height: 60px;
          margin-top: 10px;
        }
        .print-content {
          display: flex;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 30px;
        }
        .print-content .info-left,
        .print-content .info-right {
          width: 48%;
        }
        .student-image {
          width: 150px;
          height: 150px;
          background-color: #f4f4f4;
          border-radius: 50%;
          margin-bottom: 20px;
          overflow: hidden;
        }
        .student-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .details-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
        }
        .details-table th,
        .details-table td {
          padding: 12px;
          text-align: left;
          border: 1px solid #ddd;
        }
        .details-table th {
          background-color: #006e6d;
          color: #fff;
        }
        .footer {
          text-align: center;
          font-size: 14px;
          color: #666;
        }
        .footer .instructions {
          font-size: 12px;
          margin-top: 20px;
        }
        @media print {
          body {
            background-color: #fff;
            margin: 0;
            padding: 0;
          }
          .print-container {
            box-shadow: none;
            border-radius: 0;
          }
        }
      </style>
    ;

    const printArea = document.getElementById('print-area');
    if (!printArea) return;

    const original = document.body.innerHTML;
    document.body.innerHTML = printArea.innerHTML + printStyle;
    window.print();
    document.body.innerHTML = original;
  };

  return (
    <section className="max-w-4xl mx-auto my-8 p-6 bg-white border border-teal-800 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={CNIC}
          onChange={(e) => setCNIC(e.target.value)}
          placeholder="Enter CNIC"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Submit
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>

      {admitData && (
        <div id="print-area">
          {/* Header */}
          <div className="bg-teal-800 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-bold">Admit Card - Entry Test 2025</h2>
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
          <div className="p-6 flex flex-col sm:flex-row gap-6 border-b border-gray-200">
            <div className="relative w-24 h-24 bg-gray-200 border border-teal-800 rounded-md flex-shrink-0">
              {admitData.imageUrl && (
                <Image
                  src={admitData.imageUrl}
                  alt="Student"
                  fill
                  className="object-cover rounded-md"
                />
              )}
            </div>
            <div className="flex-1 text-left">
              <p className="mb-2"><span className="font-semibold">Name:</span> {admitData.fullName}</p>
              <p className="mb-2"><span className="font-semibold">Father:</span> {admitData.fatherName}</p>
              <p className="font-semibold">CNIC:</span> {admitData.CNIC}</p>
              <p className="mb-2"><span className="font-semibold">Course:</span> {admitData.course}</p>
              <p className="mb-2"><span className="font-semibold">Campus:</span> {admitData.campus || 'N/A'}</p>
              <p className="mb-2"><span className="font-semibold">Roll Number:</span>QT-00{admitData.id || 'N/A'}</p>
            </div>
          </div>

          {/* Test Details */}
          <table className="w-full border-collapse my-6 text-sm">
            <thead>
              <tr>
                <th colSpan={2} className="bg-teal-800 text-white p-3 text-left">Test Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-teal-800 p-3 font-semibold">Date</td>
                <td className="border border-teal-800 p-3">{admitData.testDate || '25 May, 2025 '}</td>
              </tr>
              <tr>
                <td className="border border-teal-800 p-3 font-semibold">Time</td>
                <td className="border border-teal-800 p-3">{admitData.testTime || '10:00 Am'}</td>
              </tr>
              <tr>
                <td className="border border-teal-800 p-3 font-semibold">Institute</td>
                <td className="border border-teal-800 p-3">{'Quick Tech Institiute of Information Technology'}</td>
              </tr>
              <tr>
                <td className="border border-teal-800 p-3 font-semibold">Venue</td>
                <td className="border border-teal-800 p-3">{'Quick Tech Institiute of Information Technology, Gill Colony Near Hazaray Shah Muhalla, Mirpur Mathelo'}</td>
              </tr>
            </tbody>
          </table>

          {/* Instructions */}
          <div className="text-left text-sm">
            <p className="font-bold mb-2">Instructions:</p>
            <p className="mb-1">- Arrive at least 30 minutes before the test.</p>
            <p className="mb-1">- Bring this admit card and a valid CNIC /B-Form.</p>
            <p className="mb-1">- Electronic devices are not allowed in the exam hall.</p>
            <p className="text-red-600 font-bold">
              Note: This admit card is mandatory for entry to the test center.
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handlePrint}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Print Slip
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default GenerateCard;
