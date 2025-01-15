// components/PriceForm.tsx
import { Workspace } from '@/app/models/Workspace';
import React from 'react';

interface PriceFormProps {
  workspaceData: any; // Adjust according to your Workspace type
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PriceForm: React.FC<PriceFormProps> = ({ workspaceData, handleChange }) => (
  <div className="border-b pb-4">
    <h3 className="text-xl font-semibold mb-2">Pricing</h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {["hourPrice", "dayPrice", "weekPrice", "monthPrice", "annualPrice"].map((priceType) => (
        <div key={priceType}>
          <label htmlFor={priceType} className="block text-sm font-medium text-gray-700 mb-1">
            {priceType.replace("Price", " Price").replace(/(\B[A-Z])/g, " $1")}
          </label>
          <input
            type="number"
            placeholder={`Price per ${priceType.replace("Price", "").toLowerCase()}`}
            value={workspaceData[priceType as keyof Workspace]}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
            min="0"
          />
        </div>
      ))}
    </div>
  </div>
);

export default PriceForm;
