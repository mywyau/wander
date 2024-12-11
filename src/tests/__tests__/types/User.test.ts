// __tests__/apiResponse.test.ts
import { User } from "@/app/user/account/profile/types/User";

describe("API Response Validation", () => {
  it("should match hardcoded JSON structure for User object after JSON.stringify", () => {
    // Mocked User object
    const user: User = {
      userId: "user_1",
      userLoginDetails: {
        id: 1,
        userId: "user_1",
        username: "testUser",
        passwordHash: "hashed_password",
        email: "test@example.com",
        role: "Wanderer",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      },
      userPersonalDetails: {
        userId: "user_1",
        firstName: "Test",
        lastName: "User",
        contactNumber: "1234567890",
        email: "test@example.com",
        company: "TestCompany",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      },
      userAddress: {
        userId: "user_1",
        street: "123 Main St",
        city: "Anytown",
        country: "USA",
        county: "SomeCounty",
        postcode: "12345",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      },
      role: "Wanderer",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-02T00:00:00Z",
    };

    // Expected JSON output
    const expectedJson = JSON.stringify({
      userId: "user_1",
      userLoginDetails: {
        id: 1,
        userId: "user_1",
        username: "testUser",
        passwordHash: "hashed_password",
        email: "test@example.com",
        role: "Wanderer",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      },
      userPersonalDetails: {
        userId: "user_1",
        firstName: "Test",
        lastName: "User",
        contactNumber: "1234567890",
        email: "test@example.com",
        company: "TestCompany",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      },
      userAddress: {
        userId: "user_1",
        street: "123 Main St",
        city: "Anytown",
        country: "USA",
        county: "SomeCounty",
        postcode: "12345",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      },
      role: "Wanderer",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-02T00:00:00Z",
    });

    const actualJson = JSON.stringify(user);

    // Validate JSON.stringify output
    expect(actualJson).toBe(expectedJson);
  });

  it("should parse JSON response to a valid User object using res.json()", async () => {
    // Mocked JSON response from API
    const mockApiResponse = `{
      "userId": "user_1",
      "userLoginDetails": {
        "id": 1,
        "userId": "user_1",
        "username": "testUser",
        "passwordHash": "hashed_password",
        "email": "test@example.com",
        "role": "Wanderer",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-02T00:00:00Z"
      },
      "userPersonalDetails": {
        "userId": "user_1",
        "firstName": "Test",
        "lastName": "User",
        "contactNumber": "1234567890",
        "email": "test@example.com",
        "company": "TestCompany",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-02T00:00:00Z"
      },
      "userAddress": {
        "userId": "user_1",
        "street": "123 Main St",
        "city": "Anytown",
        "country": "USA",
        "county": "SomeCounty",
        "postcode": "12345",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-02T00:00:00Z"
      },
      "role": "Wanderer",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-02T00:00:00Z"
    }`;

    // Mock fetch call
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(JSON.parse(mockApiResponse)),
      })
    ) as jest.Mock;

    // Simulate API call
    const res = await fetch("/mock-api");
    const data: User = await res.json();

    // Expected User object
    const expectedUser: User = {
      userId: "user_1",
      userLoginDetails: {
        id: 1,
        userId: "user_1",
        username: "testUser",
        passwordHash: "hashed_password",
        email: "test@example.com",
        role: "Wanderer",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      },
      userPersonalDetails: {
        userId: "user_1",
        firstName: "Test",
        lastName: "User",
        contactNumber: "1234567890",
        email: "test@example.com",
        company: "TestCompany",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      },
      userAddress: {
        userId: "user_1",
        street: "123 Main St",
        city: "Anytown",
        country: "USA",
        county: "SomeCounty",
        postcode: "12345",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      },
      role: "Wanderer",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-02T00:00:00Z",
    };

    // Validate parsed object
    expect(data).toEqual(expectedUser);
  });
});
