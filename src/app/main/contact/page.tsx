"use client";

import { useState } from 'react';
import toast from 'react-hot-toast'; // ✅ Importing Toaster
import { createClient } from '@/lib/client';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.Name || !formData.Email || !formData.Message) {
      toast.error('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from('Message_Form')
        .insert([
          {
            Name: formData.Name,
            Email: formData.Email,
            Message: formData.Message,
          },
        ]);

      if (error) {
        console.error('Supabase error:', error.message || error.details);
        toast.error('Failed to send message. Please try again.');
      } else {
        toast.success('Message sent successfully! We will respond soon.');
        setFormData({ Name: '', Email: '', Message: '' });
      }
    } catch (err) {
      console.error('Submission error:', err);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-5 bg-teal-700 text-white p-5 rounded-lg">
  
    <h2 className="text-2xl font-bold mb-5">Contact Us</h2>
      <div className="mb-6 text-left">
        <h3 className="text-xl mb-2">Get in Touch</h3>
        <p className="mb-1">
          <strong>Phone:</strong> +9230003657852
        </p>
        <p className="mb-1">
          <strong>Email:</strong> info@quicktech.com
        </p>
        <p className="mb-1">
          <strong>Address:</strong> Gill Colony Near Hazaray Shah Muhalla, Mirpur Mathelo
        </p>
      </div>

      <h3 className="text-xl mb-4">Send a Message</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4 text-left">
          <label htmlFor="name" className="block mb-1 font-bold">
            Name:
          </label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            className="w-full p-2 rounded text-black bg-white"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4 text-left">
          <label htmlFor="email" className="block mb-1 font-bold">
            Email:
          </label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            className="w-full p-2 rounded text-black bg-white"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4 text-left">
          <label htmlFor="message" className="block mb-1 font-bold">
            Message:
          </label>
          <textarea
            id="Message"
            name="Message"
            value={formData.Message}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 rounded text-black bg-white"
            required
            disabled={isSubmitting}
          ></textarea>
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-white text-teal-900 font-bold py-3 rounded hover:bg-yellow-400 transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
