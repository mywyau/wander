import SignUpConnector from "../../../../../app/wanderer/signup/SignUpConnector";

global.fetch = jest.fn();

describe("SignUpConnector", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test("should return success when the API responds with 200", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
        });

        const response = await SignUpConnector.register(
            {
                userId: "user_123",
                username: "testuser",
                email: "test@example.com",
                password: "password",
                role: "Wanderer",
                createdAt: "2023-01-01T00:00:00",
                updatedAt: "2023-01-01T00:00:00",
            }
        );

        expect(response.success).toBe(true);
    });

    test("should return error data when the API responds with an error", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({
                emailErrors: ["Invalid email"],
                message: "Validation error",
            }),
        });

        const response = await SignUpConnector.register(
            {
                userId: "user_123",
                username: "testuser",
                email: "test@example.com",
                password: "password",
                role: "Wanderer",
                createdAt: "2023-01-01T00:00:00",
                updatedAt: "2023-01-01T00:00:00",
            }
        );

        expect(response.success).toBe(false);
        expect(response.errorData?.emailErrors).toContain("Invalid email");
    });
});
