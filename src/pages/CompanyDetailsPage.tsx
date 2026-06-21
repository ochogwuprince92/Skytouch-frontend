import React, { useState } from 'react';
import {
  MapPin,
  Building2,
  Users,
  Star,
  ExternalLink,
  Plus,
  CheckCircle2,
  Clock,
  DollarSign,
  BookmarkPlus,
  Calendar,
  Heart,
  Coffee,
  Laptop,
  GraduationCap } from
'lucide-react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
// Mock Data
const companyData = {
  id: 1,
  name: 'TechNova',
  logo: 'TN',
  color: 'bg-blue-500',
  industry: 'Enterprise Software',
  location: 'Lagos, Nigeria & San Francisco, CA',
  size: '500-1000 employees',
  rating: 4.8,
  founded: '2015',
  followers: '45.2k',
  openJobs: 24,
  website: 'https://technova.example.com',
  coverImage:
  'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
  about:
  'TechNova is a leading provider of cloud-based enterprise software solutions empowering businesses across Africa and globally to scale. We build the infrastructure that powers modern commerce, enabling thousands of businesses to accept payments, manage operations, and grow their revenue. Our mission is to accelerate the digital economy through world-class engineering and design.',
  specialties: [
  'Fintech',
  'Cloud Infrastructure',
  'Payment Processing',
  'Enterprise Software',
  'B2B',
  'SaaS'],

  perks: [
  {
    icon: <Heart size={20} />,
    title: 'Comprehensive Healthcare',
    desc: 'Full medical, dental, and vision coverage for you and your dependents.'
  },
  {
    icon: <Laptop size={20} />,
    title: 'Remote-First Culture',
    desc: 'Work from anywhere with a generous home office stipend.'
  },
  {
    icon: <GraduationCap size={20} />,
    title: 'Learning Budget',
    desc: '$2,000 annual stipend for courses, conferences, and books.'
  },
  {
    icon: <Coffee size={20} />,
    title: 'Wellness Programs',
    desc: 'Monthly wellness allowance and free access to mental health resources.'
  }],

  gallery: [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],

  jobs: [
  {
    id: 101,
    title: 'Senior Frontend Engineer',
    type: 'Full-time',
    location: 'Lagos, Nigeria (Hybrid)',
    salary: '$80k - $120k',
    postedAt: '2 days ago',
    tags: ['React', 'TypeScript', 'Tailwind']
  },
  {
    id: 102,
    title: 'Product Manager',
    type: 'Full-time',
    location: 'Remote (EMEA)',
    salary: '$100k - $140k',
    postedAt: '1 week ago',
    tags: ['B2B', 'SaaS', 'Agile']
  },
  {
    id: 103,
    title: 'DevOps Engineer',
    type: 'Full-time',
    location: 'San Francisco, CA',
    salary: '$150k - $180k',
    postedAt: '3 days ago',
    tags: ['AWS', 'Kubernetes', 'CI/CD']
  }],

  reviews: [
  {
    id: 1,
    author: 'Current Employee, Engineering',
    rating: 5,
    date: 'Oct 2023',
    title: 'Amazing culture and challenging problems',
    content:
    'The engineering culture here is top-notch. We are solving real problems at scale. Leadership is transparent and truly cares about employee well-being.'
  },
  {
    id: 2,
    author: 'Former Employee, Product',
    rating: 4,
    date: 'Aug 2023',
    title: 'Great place to grow, fast-paced',
    content:
    'Learned a lot during my time here. The pace is very fast, which can be challenging but also rewarding. Benefits are excellent.'
  }]

};
export function CompanyDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isFollowing, setIsFollowing] = useState(false);
  // In a real app, fetch company data based on ID. Using mock data here.
  const company = companyData;
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Cover Banner */}
      <div className="h-64 md:h-80 w-full relative">
        <img
          src={company.coverImage}
          alt={`${company.name} office`}
          className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        {/* Company Header Card */}
        <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <div
                className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center text-white font-bold text-4xl md:text-5xl ${company.color} shadow-lg border-4 border-white shrink-0`}>
                
                {company.logo}
              </div>
              <div className="pb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  {company.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-slate-600 text-sm md:text-base">
                  <span className="flex items-center">
                    <Building2 size={18} className="mr-1.5 text-slate-400" />{' '}
                    {company.industry}
                  </span>
                  <span className="hidden md:inline text-slate-300">•</span>
                  <span className="flex items-center">
                    <Users size={18} className="mr-1.5 text-slate-400" />{' '}
                    {company.size}
                  </span>
                  <span className="hidden md:inline text-slate-300">•</span>
                  <span className="flex items-center">
                    <MapPin size={18} className="mr-1.5 text-slate-400" />{' '}
                    {company.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pb-2 w-full md:w-auto">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${isFollowing ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-primary text-white hover:bg-primary-600 shadow-soft'}`}>
                
                {isFollowing ? <CheckCircle2 size={20} /> : <Plus size={20} />}
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-6 py-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                
                <ExternalLink size={20} />
                Visit Website
              </a>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
            <div className="text-center md:text-left">
              <p className="text-slate-500 text-sm font-medium mb-1">
                Open Roles
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {company.openJobs}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-slate-500 text-sm font-medium mb-1">
                Followers
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {company.followers}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-slate-500 text-sm font-medium mb-1">Founded</p>
              <p className="text-2xl font-bold text-slate-900">
                {company.founded}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-slate-500 text-sm font-medium mb-1">Rating</p>
              <div className="flex items-center justify-center md:justify-start gap-1">
                <p className="text-2xl font-bold text-slate-900">
                  {company.rating}
                </p>
                <Star size={20} className="text-yellow-500 fill-yellow-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar mb-8 border-b border-slate-200">
          {['overview', 'jobs', 'reviews', 'life'].map((tab) =>
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 font-semibold text-sm md:text-base whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
            
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'jobs' &&
            <span className="ml-2 bg-primary-50 text-primary px-2 py-0.5 rounded-full text-xs">
                  {company.openJobs}
                </span>
            }
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' &&
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.3
              }}>
              
                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    About {company.name}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {company.about}
                  </p>

                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">
                      Specialties
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {company.specialties.map((spec) =>
                    <span
                      key={spec}
                      className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700 text-sm font-medium">
                      
                          {spec}
                        </span>
                    )}
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Perks & Benefits
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {company.perks.map((perk, i) =>
                  <div key={i} className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                          {perk.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1">
                            {perk.title}
                          </h4>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {perk.desc}
                          </p>
                        </div>
                      </div>
                  )}
                  </div>
                </section>

                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Office & Culture
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {company.gallery.map((img, i) =>
                  <img
                    key={i}
                    src={img}
                    alt="Office"
                    className="w-full h-48 object-cover rounded-xl hover:opacity-90 transition-opacity cursor-pointer" />

                  )}
                  </div>
                </section>
              </motion.div>
            }

            {/* JOBS TAB */}
            {activeTab === 'jobs' &&
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.3
              }}
              className="space-y-4">
              
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Open Roles
                  </h2>
                  <div className="flex gap-2">
                    <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 text-sm outline-none focus:border-primary">
                      <option>All Departments</option>
                      <option>Engineering</option>
                      <option>Product</option>
                    </select>
                  </div>
                </div>

                {company.jobs.map((job) =>
              <div
                key={job.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-card transition-all group">
                
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Link
                      to={`/jobs/${job.id}`}
                      className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                      
                          {job.title}
                        </Link>
                        <div className="flex flex-wrap gap-3 mt-3">
                          <div className="flex items-center text-sm text-slate-600">
                            <MapPin
                          size={14}
                          className="mr-1.5 text-slate-400" />
                        {' '}
                            {job.location}
                          </div>
                          <div className="flex items-center text-sm text-slate-600">
                            <Clock
                          size={14}
                          className="mr-1.5 text-slate-400" />
                        {' '}
                            {job.type}
                          </div>
                          <div className="flex items-center text-sm text-slate-600">
                            <DollarSign
                          size={14}
                          className="mr-1.5 text-slate-400" />
                        {' '}
                            {job.salary}
                          </div>
                        </div>
                      </div>
                      <button className="text-slate-400 hover:text-primary transition-colors p-2 hover:bg-primary-50 rounded-lg">
                        <BookmarkPlus size={20} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4">
                      <div className="flex gap-2">
                        {job.tags.map((tag) =>
                    <span
                      key={tag}
                      className="text-xs font-medium text-primary bg-primary-50 px-2.5 py-1 rounded-md">
                      
                            {tag}
                          </span>
                    )}
                      </div>
                      <span className="text-xs text-slate-400 font-medium">
                        {job.postedAt}
                      </span>
                    </div>
                  </div>
              )}
              </motion.div>
            }

            {/* REVIEWS TAB */}
            {activeTab === 'reviews' &&
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.3
              }}>
              
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8 flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-slate-900 mb-2">
                      {company.rating}
                    </div>
                    <div className="flex justify-center mb-1">
                      {[1, 2, 3, 4, 5].map((star) =>
                    <Star
                      key={star}
                      size={20}
                      className={
                      star <= Math.floor(company.rating) ?
                      'text-yellow-500 fill-yellow-500' :
                      'text-slate-200 fill-slate-200'
                      } />

                    )}
                    </div>
                    <div className="text-sm text-slate-500">
                      Based on 124 reviews
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) =>
                  <div
                    key={star}
                    className="flex items-center gap-3 text-sm">
                    
                        <span className="w-3">{star}</span>
                        <Star size={12} className="text-slate-400" />
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                        className="h-full bg-yellow-500 rounded-full"
                        style={{
                          width:
                          star === 5 ? '70%' : star === 4 ? '20%' : '5%'
                        }}>
                      </div>
                        </div>
                      </div>
                  )}
                  </div>
                </div>

                <div className="space-y-6">
                  {company.reviews.map((review) =>
                <div
                  key={review.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-slate-900 text-lg">
                            {review.title}
                          </h4>
                          <div className="text-sm text-slate-500 mt-1">
                            {review.author} • {review.date}
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) =>
                      <Star
                        key={star}
                        size={16}
                        className={
                        star <= review.rating ?
                        'text-yellow-500 fill-yellow-500' :
                        'text-slate-200 fill-slate-200'
                        } />

                      )}
                        </div>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {review.content}
                      </p>
                    </div>
                )}
                </div>
              </motion.div>
            }

            {/* LIFE TAB */}
            {activeTab === 'life' &&
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.3
              }}
              className="space-y-8">
              
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Life at {company.name}
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-8">
                    We believe that doing your best work requires a supportive,
                    inclusive, and dynamic environment. From our annual company
                    retreats to weekly tech talks and hackathons, we foster a
                    culture of continuous learning and collaboration.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Team collaboration"
                      className="w-full h-64 object-cover rounded-xl" />
                    
                      <h3 className="font-bold text-slate-900 text-lg">
                        Collaborative Environment
                      </h3>
                      <p className="text-slate-600 text-sm">
                        We work in cross-functional teams, ensuring everyone has
                        a voice in the product direction.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <img
                      src="https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Company event"
                      className="w-full h-64 object-cover rounded-xl" />
                    
                      <h3 className="font-bold text-slate-900 text-lg">
                        Annual Retreats
                      </h3>
                      <p className="text-slate-600 text-sm">
                        Once a year, we bring the entire global team together
                        for a week of planning, learning, and fun.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            }
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Company Details</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Building2
                    size={20}
                    className="text-slate-400 shrink-0 mt-0.5" />
                  
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Industry
                    </p>
                    <p className="text-sm text-slate-600">{company.industry}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Users size={20} className="text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Company Size
                    </p>
                    <p className="text-sm text-slate-600">{company.size}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin
                    size={20}
                    className="text-slate-400 shrink-0 mt-0.5" />
                  
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Headquarters
                    </p>
                    <p className="text-sm text-slate-600">{company.location}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar
                    size={20}
                    className="text-slate-400 shrink-0 mt-0.5" />
                  
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Founded
                    </p>
                    <p className="text-sm text-slate-600">{company.founded}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
              <h3 className="font-bold text-primary-900 mb-2">
                Want to work here?
              </h3>
              <p className="text-primary-700 text-sm mb-4">
                Get notified when {company.name} posts new roles that match your
                skills.
              </p>
              <button className="w-full bg-primary text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-primary-600 transition-colors shadow-soft">
                Create Job Alert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);

}