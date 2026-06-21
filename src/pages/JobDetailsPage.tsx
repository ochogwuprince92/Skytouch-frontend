import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  DollarSign,
  Building2,
  BookmarkPlus,
  Share2,
  ArrowLeft,
  CheckCircle2 } from
'lucide-react';
export function JobDetailsPage() {
  const { id } = useParams();
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/jobs"
          className="inline-flex items-center text-slate-500 hover:text-primary font-medium mb-6 transition-colors">
          
          <ArrowLeft size={16} className="mr-2" />
          Back to jobs
        </Link>

        {/* Job Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-blue-500 flex items-center justify-center text-white font-bold text-3xl shrink-0 shadow-soft">
                TN
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                  Senior Full Stack Engineer
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-4">
                  <div className="flex items-center font-medium text-primary">
                    <Building2 size={18} className="mr-1.5" />
                    TechNova
                  </div>
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-1.5 text-slate-400" />
                    San Francisco, CA (Hybrid)
                  </div>
                  <div className="flex items-center">
                    <Clock size={18} className="mr-1.5 text-slate-400" />
                    Posted 2 hours ago
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'AWS', 'TypeScript'].map((tag) =>
                  <span
                    key={tag}
                    className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                    
                      {tag}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 min-w-[200px]">
              <button className="w-full bg-primary hover:bg-primary-600 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-soft">
                Apply Now
              </button>
              <div className="flex gap-3">
                <button className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                  <BookmarkPlus size={18} />
                  Save
                </button>
                <button className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                About the Role
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600">
                <p className="mb-4">
                  TechNova is seeking a Senior Full Stack Engineer to join our
                  core product team. You will be responsible for designing,
                  building, and maintaining scalable web applications that serve
                  millions of users globally.
                </p>
                <p className="mb-4">
                  In this role, you will work closely with product managers,
                  designers, and other engineers to deliver high-quality
                  software. You should have a deep understanding of modern web
                  technologies, distributed systems, and best practices in
                  software engineering.
                </p>

                <h3 className="text-lg font-bold text-slate-900 mt-8 mb-4">
                  What You'll Do
                </h3>
                <ul className="space-y-2 mb-6 list-disc pl-5">
                  <li>
                    Architect and implement robust, scalable frontend and
                    backend systems using React, Node.js, and AWS.
                  </li>
                  <li>
                    Collaborate with cross-functional teams to define, design,
                    and ship new features.
                  </li>
                  <li>Write clean, maintainable, and well-tested code.</li>
                  <li>
                    Mentor junior engineers and contribute to technical
                    discussions and code reviews.
                  </li>
                  <li>
                    Optimize applications for maximum speed and scalability.
                  </li>
                </ul>

                <h3 className="text-lg font-bold text-slate-900 mt-8 mb-4">
                  What We're Looking For
                </h3>
                <ul className="space-y-2 mb-6 list-disc pl-5">
                  <li>
                    5+ years of professional experience in full-stack web
                    development.
                  </li>
                  <li>
                    Strong proficiency in JavaScript/TypeScript, React, and
                    Node.js.
                  </li>
                  <li>
                    Experience designing and building RESTful APIs and
                    microservices.
                  </li>
                  <li>
                    Familiarity with cloud platforms, preferably AWS (EC2, S3,
                    Lambda, DynamoDB).
                  </li>
                  <li>
                    Excellent problem-solving skills and a passion for learning
                    new technologies.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* Job Overview */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Job Overview
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary shrink-0">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Salary</p>
                    <p className="text-slate-900 font-semibold">
                      $150k - $200k / year
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">
                      Location
                    </p>
                    <p className="text-slate-900 font-semibold">
                      San Francisco, CA
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">
                      Job Type
                    </p>
                    <p className="text-slate-900 font-semibold">Full-time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary shrink-0">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">
                      Experience
                    </p>
                    <p className="text-slate-900 font-semibold">5+ years</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Benefits & Perks
              </h3>
              <ul className="space-y-3">
                {[
                'Comprehensive health, dental, and vision insurance',
                '401(k) matching up to 5%',
                'Unlimited PTO and flexible working hours',
                'Annual learning and development stipend',
                'Home office setup allowance'].
                map((benefit, i) =>
                <li
                  key={i}
                  className="flex items-start gap-2 text-slate-600 text-sm">
                  
                    <CheckCircle2
                    size={18}
                    className="text-success shrink-0 mt-0.5" />
                  
                    <span>{benefit}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* About Company */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
                  TN
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">TechNova</h3>
                  <a href="#" className="text-sm text-primary hover:underline">
                    View company profile
                  </a>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                TechNova is a leading provider of cloud-based enterprise
                software solutions. We are on a mission to empower businesses to
                operate more efficiently and scale faster.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Founded</p>
                  <p className="font-semibold text-slate-900">2015</p>
                </div>
                <div>
                  <p className="text-slate-500">Employees</p>
                  <p className="font-semibold text-slate-900">500-1000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}