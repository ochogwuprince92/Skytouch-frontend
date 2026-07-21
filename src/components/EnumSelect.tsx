interface EnumSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function EnumSelect({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  className = '',
  disabled = false,
}: EnumSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary ${className}`}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

// Industry options
export const INDUSTRY_OPTIONS = [
  { value: 'TECHNOLOGY', label: 'Technology' },
  { value: 'FINANCE', label: 'Finance' },
  { value: 'HEALTHCARE', label: 'Healthcare' },
  { value: 'EDUCATION', label: 'Education' },
  { value: 'RETAIL', label: 'Retail' },
  { value: 'MANUFACTURING', label: 'Manufacturing' },
  { value: 'CONSTRUCTION', label: 'Construction' },
  { value: 'TRANSPORTATION', label: 'Transportation' },
  { value: 'AGRICULTURE', label: 'Agriculture' },
  { value: 'ENERGY', label: 'Energy' },
  { value: 'TELECOMMUNICATIONS', label: 'Telecommunications' },
  { value: 'MEDIA', label: 'Media' },
  { value: 'HOSPITALITY', label: 'Hospitality' },
  { value: 'REAL_ESTATE', label: 'Real Estate' },
  { value: 'LEGAL', label: 'Legal' },
  { value: 'CONSULTING', label: 'Consulting' },
  { value: 'GOVERNMENT', label: 'Government' },
  { value: 'NON_PROFIT', label: 'Non-Profit' },
  { value: 'AUTOMOTIVE', label: 'Automotive' },
  { value: 'PHARMACEUTICALS', label: 'Pharmaceuticals' },
  { value: 'OTHER', label: 'Other' },
];

// Qualification options
export const QUALIFICATION_OPTIONS = [
  { value: 'HIGH_SCHOOL', label: 'High School' },
  { value: 'DIPLOMA', label: 'Diploma' },
  { value: 'BACHELOR_DEGREE', label: "Bachelor's Degree" },
  { value: 'MASTER_DEGREE', label: "Master's Degree" },
  { value: 'DOCTORATE', label: 'Doctorate' },
  { value: 'PROFESSIONAL_CERTIFICATION', label: 'Professional Certification' },
  { value: 'VOCATIONAL_TRAINING', label: 'Vocational Training' },
  { value: 'OTHER', label: 'Other' },
];

// Job Role options
export const JOB_ROLE_OPTIONS = [
  { value: 'SOFTWARE_ENGINEER', label: 'Software Engineer' },
  { value: 'DATA_SCIENTIST', label: 'Data Scientist' },
  { value: 'PRODUCT_MANAGER', label: 'Product Manager' },
  { value: 'PROJECT_MANAGER', label: 'Project Manager' },
  { value: 'BUSINESS_ANALYST', label: 'Business Analyst' },
  { value: 'MARKETING_MANAGER', label: 'Marketing Manager' },
  { value: 'SALES_MANAGER', label: 'Sales Manager' },
  { value: 'HUMAN_RESOURCES', label: 'Human Resources' },
  { value: 'FINANCIAL_ANALYST', label: 'Financial Analyst' },
  { value: 'ACCOUNTANT', label: 'Accountant' },
  { value: 'LAWYER', label: 'Lawyer' },
  { value: 'DOCTOR', label: 'Doctor' },
  { value: 'NURSE', label: 'Nurse' },
  { value: 'TEACHER', label: 'Teacher' },
  { value: 'ENGINEER', label: 'Engineer' },
  { value: 'ARCHITECT', label: 'Architect' },
  { value: 'DESIGNER', label: 'Designer' },
  { value: 'WRITER', label: 'Writer' },
  { value: 'CONSULTANT', label: 'Consultant' },
  { value: 'EXECUTIVE', label: 'Executive' },
  { value: 'ADMINISTRATIVE', label: 'Administrative' },
  { value: 'CUSTOMER_SERVICE', label: 'Customer Service' },
  { value: 'OPERATIONS_MANAGER', label: 'Operations Manager' },
  { value: 'RESEARCHER', label: 'Researcher' },
  { value: 'ANALYST', label: 'Analyst' },
  { value: 'DEVELOPER', label: 'Developer' },
  { value: 'MANAGER', label: 'Manager' },
  { value: 'DIRECTOR', label: 'Director' },
  { value: 'SPECIALIST', label: 'Specialist' },
  { value: 'COORDINATOR', label: 'Coordinator' },
  { value: 'ASSISTANT', label: 'Assistant' },
  { value: 'OTHER', label: 'Other' },
];

// Gender options
export const GENDER_OPTIONS = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' },
  { value: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' },
];
