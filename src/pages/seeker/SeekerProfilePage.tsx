import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Upload,
  Plus,
  Pencil,
  Trash2,
  FileText,
  CheckCircle2 } from
'lucide-react';
export function SeekerProfilePage() {
  const [activeTab, setActiveTab] = useState('personal');
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">My Profile</h1>
        <p className="text-slate-600">
          Manage your personal information, resume, and skills.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-md object-cover" />
            
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-sm hover:bg-primary-600 transition-colors border-2 border-white">
              <Pencil size={14} />
            </button>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">John Doe</h2>
            <p className="text-lg text-slate-600 mb-4">
              Senior Product Designer
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-slate-500">
              <span className="flex items-center">
                <MapPin size={16} className="mr-1.5" /> San Francisco, CA
              </span>
              <span className="flex items-center">
                <Mail size={16} className="mr-1.5" /> john.doe@example.com
              </span>
              <span className="flex items-center">
                <Phone size={16} className="mr-1.5" /> +1 (555) 123-4567
              </span>
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
              <Eye size={18} /> View Public Profile
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-200 px-6 sm:px-8">
          {['personal', 'resume', 'experience', 'education', 'skills'].map(
            (tab) =>
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
              
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>

          )}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {/* PERSONAL TAB */}
          {activeTab === 'personal' &&
          <div className="space-y-6 max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    First Name
                  </label>
                  <input
                  type="text"
                  defaultValue="John"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Last Name
                  </label>
                  <input
                  type="text"
                  defaultValue="Doe"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Professional Title
                  </label>
                  <input
                  type="text"
                  defaultValue="Senior Product Designer"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Location
                  </label>
                  <input
                  type="text"
                  defaultValue="San Francisco, CA"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Bio / Summary
                  </label>
                  <textarea
                  rows={4}
                  defaultValue="I am a passionate Product Designer with over 8 years of experience creating user-centric digital products. I specialize in design systems, interaction design, and user research."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                </textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Portfolio URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe size={18} className="text-slate-400" />
                    </div>
                    <input
                    type="url"
                    defaultValue="https://johndoe.design"
                    className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                  
                  </div>
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary-600 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          }

          {/* RESUME TAB */}
          {activeTab === 'resume' &&
          <div className="space-y-8 max-w-3xl">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-primary">
                  <Upload size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Upload your resume
                </h3>
                <p className="text-slate-500 text-sm mb-4">
                  PDF, DOCX, or RTF (Max 5MB)
                </p>
                <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                  Browse Files
                </button>
              </div>

              {/* Uploaded Resumes */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Your Resumes
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-50 text-primary rounded-lg flex items-center justify-center">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          John_Doe_Resume_2023.pdf
                        </p>
                        <p className="text-xs text-slate-500">
                          Uploaded 2 days ago • 1.2 MB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="hidden sm:flex items-center text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-md mr-2">
                        <CheckCircle2 size={12} className="mr-1" /> Default
                      </span>
                      <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                        <Pencil size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-danger transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

          {/* SKILLS TAB */}
          {activeTab === 'skills' &&
          <div className="max-w-3xl">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">
                  Your Skills
                </h3>
                <button className="text-primary font-semibold text-sm flex items-center hover:text-primary-600">
                  <Plus size={16} className="mr-1" /> Add Skill
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {[
              'UI Design',
              'UX Research',
              'Figma',
              'Prototyping',
              'Design Systems',
              'HTML/CSS',
              'User Testing',
              'Wireframing'].
              map((skill) =>
              <div
                key={skill}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium group">
                
                    {skill}
                    <button className="text-slate-400 hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={14} />
                    </button>
                  </div>
              )}
              </div>

              <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
                <h4 className="font-bold text-primary-900 mb-2">
                  AI Skill Suggestions
                </h4>
                <p className="text-sm text-primary-700 mb-4">
                  Based on your profile and resume, we recommend adding these
                  skills:
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Interaction Design', 'Agile', 'Product Strategy'].map(
                  (skill) =>
                  <button
                    key={skill}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white border border-primary-200 text-primary-700 hover:bg-primary hover:text-white rounded-lg text-sm font-medium transition-colors">
                    
                        <Plus size={14} /> {skill}
                      </button>

                )}
                </div>
              </div>
            </div>
          }

          {/* Placeholder for Experience/Education */}
          {(activeTab === 'experience' || activeTab === 'education') &&
          <div className="py-12 text-center max-w-3xl">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Briefcase size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                No {activeTab} added yet
              </h3>
              <p className="text-slate-500 mb-6">
                Add your {activeTab} to stand out to employers.
              </p>
              <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary-600 transition-colors inline-flex items-center gap-2">
                <Plus size={18} /> Add{' '}
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </button>
            </div>
          }
        </div>
      </div>
    </div>);

}
// Need to import Eye and X for the component above
import { Eye, X } from 'lucide-react';