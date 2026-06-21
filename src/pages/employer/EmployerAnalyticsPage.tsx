import React from 'react';
import { Eye, Users, Clock, TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell } from
'recharts';
const lineData = [
{
  name: 'Mon',
  applications: 12
},
{
  name: 'Tue',
  applications: 19
},
{
  name: 'Wed',
  applications: 15
},
{
  name: 'Thu',
  applications: 22
},
{
  name: 'Fri',
  applications: 28
},
{
  name: 'Sat',
  applications: 10
},
{
  name: 'Sun',
  applications: 8
}];

const sourceData = [
{
  name: 'Direct',
  value: 400
},
{
  name: 'LinkedIn',
  value: 300
},
{
  name: 'Indeed',
  value: 300
},
{
  name: 'Referral',
  value: 200
}];

const COLORS = ['#0F4C81', '#4A90E2', '#00C48C', '#F5A623'];
const funnelData = [
{
  name: 'Applied',
  value: 1000
},
{
  name: 'Screening',
  value: 400
},
{
  name: 'Interview',
  value: 150
},
{
  name: 'Offer',
  value: 20
},
{
  name: 'Hired',
  value: 15
}];

export function EmployerAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Analytics Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Track your hiring performance and job metrics.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
        {
          title: 'Total Job Views',
          value: '12,450',
          trend: '+15%',
          icon: <Eye size={24} />,
          color: 'text-primary',
          bg: 'bg-primary-50'
        },
        {
          title: 'Total Applications',
          value: '842',
          trend: '+8%',
          icon: <Users size={24} />,
          color: 'text-secondary',
          bg: 'bg-secondary/10'
        },
        {
          title: 'Avg Time to Hire',
          value: '18 Days',
          trend: '-2 days',
          icon: <Clock size={24} />,
          color: 'text-success',
          bg: 'bg-success/10'
        },
        {
          title: 'Conversion Rate',
          value: '6.8%',
          trend: '+1.2%',
          icon: <TrendingUp size={24} />,
          color: 'text-warning',
          bg: 'bg-warning/10'
        }].
        map((stat, i) =>
        <div
          key={i}
          className="bg-white p-6 rounded-2xl shadow-soft border border-slate-200">
          
            <div className="flex items-center justify-between mb-4">
              <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              
                {stat.icon}
              </div>
              <span className="text-sm font-bold text-success bg-success/10 px-2.5 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {stat.value}
            </p>
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications Over Time */}
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6">
            Applications (Last 7 Days)
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0" />
                
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#64748b'
                  }} />
                
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#64748b'
                  }} />
                
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} />
                
                <Line
                  type="monotone"
                  dataKey="applications"
                  stroke="#0F4C81"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: '#0F4C81'
                  }}
                  activeDot={{
                    r: 6
                  }} />
                
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Source Breakdown */}
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6">
            Application Sources
          </h3>
          <div className="h-72 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value">
                  
                  {sourceData.map((entry, index) =>
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]} />

                  )}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} />
                
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {sourceData.map((entry, index) =>
              <div key={index} className="flex items-center gap-2">
                  <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length]
                  }}>
                </div>
                  <span className="text-sm text-slate-600">{entry.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hiring Funnel */}
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-200 lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-900 mb-6">
            Hiring Pipeline Funnel
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={funnelData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}>
                
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#e2e8f0" />
                
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#64748b'
                  }} />
                
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#64748b',
                    fontWeight: 'bold'
                  }} />
                
                <Tooltip
                  cursor={{
                    fill: '#f8fafc'
                  }}
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} />
                
                <Bar
                  dataKey="value"
                  fill="#4A90E2"
                  radius={[0, 4, 4, 0]}
                  barSize={32} />
                
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>);

}