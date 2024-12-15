import React from "react";
import TextInput from "../components/TextInput";
import NumberInput from "../components/NumberInput";
import TextArea from "../components/TextArea";
import SelectField from "../components/SelectInputField";
import AmenitiesCheckbox from "../components/AmenitiesCheckbox";
import OpeningHours from "../components/OpeningHours";

const OfficeSpecsForm = ({ formData, onChange, onNumberChange, onAvailabilityCheckboxChange, onAmenitiesCheckboxChange, errors }) => (
  <div className="space-y-4">
    <TextInput
      type="text"
      id="officeName"
      name="officeSpecs.officeName"
      label="Office Name"
      value={formData.officeSpecs?.officeName || ""}
      onChange={onChange}
      placeholder="Enter the office name"
      error={errors.officeName}
    />

    <TextArea
      id="description"
      name="officeSpecs.description"
      label="Description"
      value={formData.officeSpecs?.description || ""}
      onChange={onChange}
      placeholder="Enter a description of the office"
      error={errors.description}
    />

    <SelectField
      id="officeType"
      name="officeSpecs.officeType"
      label="Office Type"
      value={formData.officeSpecs?.officeType || ""}
      onChange={onChange}
      options={[
        { value: "ExecutiveOffice", label: "Executive Office" },
        { value: "OpenPlanOffice", label: "Open-plan Office" },
        { value: "PrivateOffice", label: "Private Office" },
      ]}
      error={errors.officeType}
    />

    <NumberInput
      id="numberOfFloors"
      name="officeSpecs.numberOfFloors"
      label="Number of Floors"
      value={formData.officeSpecs?.numberOfFloors || 0}
      onChange={onNumberChange}
      min={1}
      placeholder="Enter the number of floors"
      error={errors.numberOfFloors}
    />

    <NumberInput
      id="totalDesks"
      name="officeSpecs.totalDesks"
      label="Total Desks"
      value={formData.officeSpecs?.totalDesks || 0}
      onChange={onNumberChange}
      min={1}
      placeholder="Enter the total number of desks"
      error={errors.totalDesks}
    />

    <NumberInput
      id="capacity"
      name="officeSpecs.capacity"
      label="Capacity"
      value={formData.officeSpecs?.capacity || 0}
      onChange={onNumberChange}
      min={1}
      placeholder="Enter the capacity"
      error={errors.capacity}
    />

    <OpeningHours
      days={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]}
      selectedDays={formData.officeSpecs?.availability?.days || []}
      startTime={formData.officeSpecs?.availability?.startTime || ""}
      endTime={formData.officeSpecs?.availability?.endTime || ""}
      onDayChange={(e) => onAvailabilityCheckboxChange(e, "officeSpecs.availability.days")}
      onTimeChange={onChange}
      errors={{
        startTime: errors.startTime,
        endTime: errors.endTime,
      }}
    />

    <AmenitiesCheckbox
      amenities={["Wi-Fi", "Power Outlets", "Monitor", "Coffee", "Air Conditioning"]}
      selectedAmenities={formData.officeSpecs?.amenities || []}
      onChange={(e) => onAmenitiesCheckboxChange(e, "officeSpecs.amenities")}
    />

    <TextArea
      id="rules"
      name="officeSpecs.rules"
      label="Office Rules"
      value={formData.officeSpecs?.rules || ""}
      onChange={onChange}
      placeholder="Enter any rules for the office"
      error={errors.rules}
    />
  </div>
);

export default OfficeSpecsForm;
