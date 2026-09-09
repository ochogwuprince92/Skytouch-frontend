import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">About Us</h1>
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <p className="text-slate-600 text-lg">
            Coming soon. Learn more about SkyTouch Jobs and our mission to connect job seekers with great opportunities.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
