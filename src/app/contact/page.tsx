"use client";

import { useState } from 'react';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        setSubmitted(true);
    };

    return (
        <div className="container mx-auto min-h-screen bg-gray-50 p-6 flex items-center justify-center">
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-screen-lg"> {/* Increase the max-width to screen-lg or more */}
                {/* Contact Form */}
                <div className="bg-white p-8 rounded-md shadow-lg w-full md:w-1/2 flex-grow"> {/* Removed max-w-lg */}
                    {submitted ? (
                        <p className="text-green-600 text-lg text-center">Thank you for your message!</p>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    rows={5}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                        </form>
                    )}
                </div>

                {/* Contact Details */}
                <div className="bg-white p-8 rounded-md shadow-lg w-full md:w-1/2 flex-grow"> {/* Removed max-w-lg */}
                    <h2 className="text-2xl font-bold mb-6">Our Contact Details</h2>
                    <ul className="space-y-4 text-gray-700">
                        <li>
                            <strong>Address:</strong>
                            <p>1234 Main Street,<br />New York, NY 10001</p>
                        </li>
                        <li>
                            <strong>Phone:</strong>
                            <p>+1 (555) 123-4567</p>
                        </li>
                        <li>
                            <strong>Email:</strong>
                            <p>contact@example.com</p>
                        </li>
                        <li>
                            <strong>Business Hours:</strong>
                            <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                            <p>Saturday - Sunday: Closed</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
