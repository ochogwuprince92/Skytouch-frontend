import { Link } from 'react-router-dom';
import { MessageSquare, ArrowRight } from 'lucide-react';

export function EmployerMessagesPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary flex items-center justify-center mx-auto mb-4">
          <MessageSquare size={28} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Candidate messages
        </h1>
        <p className="text-slate-600 mb-6">
          Messages are available on each application. Open a candidate from your
          ATS to chat, schedule interviews, and send offers.
        </p>
        <Link
          to="/employer/ats"
          className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-600 transition-colors">
          Go to applicant tracking
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
