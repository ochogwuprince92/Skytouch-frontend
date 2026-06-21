import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Globe,
  Users,
  Camera,
  Plus,
  Trash2 } from
'lucide-react';
export function EmployerCompanyPage() {
  const [locations, setLocations] = useState([
  'San Francisco, CA',
  'London, UK']
  );
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Company Profile</h1>
          <p className="text-slate-500 mt-1">
            Manage your employer branding and company details.
          </p>
        </div>
        <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary-600 transition-colors shadow-soft">
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-slate-200 overflow-hidden">
        {/* Cover Image */}
        <div className="h-48 bg-slate-100 relative group">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
            alt="Cover"
            className="w-full h-full object-cover" />
          
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button className="bg-white text-slate-900 px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50">
              <Camera size={18} /> Change Cover
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* Logo */}
          <div className="flex items-end gap-6 -mt-16 mb-8 relative z-10">
            <div className="w-24 h-24 bg-white rounded-2xl shadow-soft border-4 border-white flex items-center justify-center relative group overflow-hidden">
              <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                TN
              </div>
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Camera size={20} className="text-white" />
              </div>
            </div>
          </div>

          <form className="space-y-8">
            {/* Basic Info */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    defaultValue="TechNova"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                  
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    defaultValue="Building the future of software."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                  
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    About Us
                  </label>
                  <textarea
                    rows={4}
                    defaultValue="TechNova is a leading software company..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none">
                  </textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Industry
                  </label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white">
                    <option>Technology</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Company Size
                  </label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white">
                    <option>1-50 employees</option>
                    <option>51-200 employees</option>
                    <option selected>201-500 employees</option>
                    <option>500+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <Globe
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18} />
                    
                    <input
                      type="url"
                      defaultValue="https://technova.example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                    
                  </div>
                </div>
              </div>
            </div>

            {/* Locations */}
            <div className="pt-8 border-t border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Locations</h3>
                <button
                  type="button"
                  className="text-primary font-bold text-sm flex items-center gap-1 hover:text-primary-600">
                  
                  <Plus size={16} /> Add Location
                </button>
              </div>
              <div className="space-y-3">
                {locations.map((loc, i) =>
                <div key={i} className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <MapPin
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18} />
                    
                      <input
                      type="text"
                      defaultValue={loc}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                    
                    </div>
                    <button
                    type="button"
                    className="p-2.5 text-slate-400 hover:text-danger hover:bg-danger-50 rounded-xl transition-colors">
                    
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>);

}