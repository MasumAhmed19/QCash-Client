import React from 'react'

const InfoItem = ({ icon, label, value, fullWidth = false }: { 
  icon: React.ReactNode;
  label: string; 
  value: string;
  fullWidth?: boolean;
}) => (
  <div className={`flex flex-col space-y-2 p-4 bg-gray-50 rounded-lg ${fullWidth ? 'md:col-span-2' : ''}`}>
    <div className="flex items-center gap-2 text-gray-600">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    <span className="text-gray-900 font-medium ml-6">{value}</span>
  </div>
);

export default InfoItem