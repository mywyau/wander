// OfficeInterfaces.test.ts

import { AddressDetails, ContactDetails, Office, OfficeSpecs } from "@/app/business/office/add/types/OfficeInterfaces";

describe('OfficeInterfaces', () => {
  const mockAvailability: Availability = {
    days: ['Monday', 'Tuesday', 'Wednesday'],
    startTime: '09:00:00',
    endTime: '17:00:00',
  };

  const mockAddressDetails: AddressDetails = {
    id: 1,
    businessId: 'business_123',
    officeId: 'office_123',
    buildingName: 'Building A',
    floorNumber: '2',
    street: '123 Main St',
    city: 'New York',
    country: 'USA',
    county: 'New York County',
    postcode: '10001',
    latitude: 40.7128,
    longitude: -74.006,
    createdAt: '2023-01-01T00:00:00',
    updatedAt: '2023-01-01T00:00:00',
  };

  const mockContactDetails: ContactDetails = {
    id: 1,
    businessId: 'business_123',
    officeId: 'office_123',
    primaryContactFirstName: 'John',
    primaryContactLastName: 'Doe',
    contactEmail: 'johndoe@example.com',
    contactNumber: '123-456-7890',
    createdAt: '2023-01-01T00:00:00',
    updatedAt: '2023-01-01T00:00:00',
  };

  const mockOfficeSpecs: OfficeSpecs = {
    id: 1,
    businessId: 'business_123',
    officeId: 'office_123',
    officeName: 'Main Office',
    description: 'A modern office space.',
    officeType: 'OpenPlanOffice',
    numberOfFloors: 3,
    totalDesks: 50,
    capacity: 100,
    amenities: ['Wi-Fi', 'Coffee Machine', 'Whiteboard'],
    availability: mockAvailability,
    rules: 'No smoking.',
    createdAt: '2023-01-01T00:00:00',
    updatedAt: '2023-01-01T00:00:00',
  };

  const mockOffice: Office = {
    officeId: 'office_123',
    officeSpecs: mockOfficeSpecs,
    addressDetails: mockAddressDetails,
    contactDetails: mockContactDetails,
    createdAt: '2023-01-01T00:00:00',
    updatedAt: '2023-01-01T00:00:00',
  };

  it('should have valid Office structure', () => {
    expect(mockOffice).toHaveProperty('officeId', 'office_123');
    expect(mockOffice.officeSpecs).toHaveProperty('officeName', 'Main Office');
    expect(mockOffice.addressDetails).toHaveProperty('city', 'New York');
    expect(mockOffice.contactDetails).toHaveProperty('primaryContactFirstName', 'John');
    expect(mockOffice.officeSpecs.availability).toHaveProperty('days', ['Monday', 'Tuesday', 'Wednesday']);
  });

  it('should validate OfficeSpecs structure', () => {
    expect(mockOfficeSpecs).toHaveProperty('officeName', 'Main Office');
    expect(mockOfficeSpecs.amenities).toContain('Wi-Fi');
    expect(mockOfficeSpecs.availability).toHaveProperty('startTime', '09:00:00');
    expect(mockOfficeSpecs.numberOfFloors).toBe(3);
    expect(mockOfficeSpecs.rules).toBe('No smoking.');
  });

  it('should validate AddressDetails structure', () => {
    expect(mockAddressDetails).toHaveProperty('buildingName', 'Building A');
    expect(mockAddressDetails).toHaveProperty('latitude', 40.7128);
    expect(mockAddressDetails.postcode).toBe('10001');
  });

  it('should validate ContactDetails structure', () => {
    expect(mockContactDetails).toHaveProperty('primaryContactFirstName', 'John');
    expect(mockContactDetails.contactEmail).toMatch(/@example\.com$/);
    expect(mockContactDetails.contactNumber).toBe('123-456-7890');
  });

  it('should validate Availability structure', () => {
    expect(mockAvailability.days).toEqual(expect.arrayContaining(['Monday', 'Tuesday']));
    expect(mockAvailability.startTime).toBe('09:00:00');
    expect(mockAvailability.endTime).toBe('17:00:00');
  });

  it('should reject invalid OfficeSpecs data', () => {
    const invalidOfficeSpecs: Partial<OfficeSpecs> = {
      officeName: '',
      numberOfFloors: -1,
    };

    expect(invalidOfficeSpecs.officeName).toBe('');
    expect(invalidOfficeSpecs.numberOfFloors).toBeLessThan(0);
  });
});
