// components/AddressForm.tsx
import React from 'react';

interface AddressFormProps {
  workspaceData: any; // Adjust according to your Workspace type
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ workspaceData, handleChange }) => (
  <div className="border-b pb-4">
    <h3 className="text-xl font-semibold mb-2">Address</h3>
    <input
      type="text"
      id="street"
      placeholder="Street Address"
      value={workspaceData.street}
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
      required
    />
    <input
      type="text"
      id="city"
      placeholder="City"
      value={workspaceData.city}
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
      required
    />
    <input
      type="text"
      id="state"
      placeholder="State"
      value={workspaceData.state}
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
      required
    />
    <input
      type="text"
      id="postcode"
      placeholder="Postcode"
      value={workspaceData.postcode}
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md"
      required
    />
  </div>
);

export default AddressForm;
