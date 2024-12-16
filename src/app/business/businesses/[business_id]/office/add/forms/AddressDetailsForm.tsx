import TextInput from "../components/TextInput";

const AddressDetailsForm = ({ formData, onChange, errors }) => (
    <div className="space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
                type="text"
                id="buildingName"
                name="addressDetails.buildingName"
                label="Building Name"
                value={formData.addressDetails?.buildingName || ""}
                onChange={onChange}
                placeholder="Enter the building name"
                error={errors.buildingName}
            />

            <TextInput
                type="text"
                id="floorNumber"
                name="addressDetails.floorNumber"
                label="Floor Number"
                value={formData.addressDetails?.floorNumber || ""}
                onChange={onChange}
                placeholder="Enter the floor number"
                error={errors.floorNumber}
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Address Details Form (Single Column) */}
            <div className="space-y-4">
                <TextInput
                    type="text"
                    id="street"
                    name="addressDetails.street"
                    label="Street"
                    value={formData.addressDetails?.street || ""}
                    onChange={onChange}
                    placeholder="Enter the street name"
                    error={errors.street}
                />

                <TextInput
                    type="text"
                    id="city"
                    name="addressDetails.city"
                    label="City"
                    value={formData.addressDetails?.city || ""}
                    onChange={onChange}
                    placeholder="Enter the city"
                    error={errors.city}
                />

                <TextInput
                    type="text"
                    id="county"
                    name="addressDetails.county"
                    label="County"
                    value={formData.addressDetails?.county || ""}
                    onChange={onChange}
                    placeholder="Enter the county"
                    error={errors.county}
                />

                <TextInput
                    type="text"
                    id="country"
                    name="addressDetails.country"
                    label="Country"
                    value={formData.addressDetails?.country || ""}
                    onChange={onChange}
                    placeholder="Enter the country"
                    error={errors.country}
                />

                <TextInput
                    type="text"
                    id="postcode"
                    name="addressDetails.postcode"
                    label="Postcode"
                    value={formData.addressDetails?.postcode || ""}
                    onChange={onChange}
                    placeholder="Enter the postcode"
                    error={errors.postcode}
                />
            </div>

            {/* Map Placeholder */}
            <div className="flex items-center justify-center border border-gray-300 rounded-md bg-gray-100 h-96">
                <p className="text-gray-500">Map Placeholder</p>
            </div>
        </div>

    </div>
);

export default AddressDetailsForm;
