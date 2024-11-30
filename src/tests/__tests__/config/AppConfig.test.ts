import AppConfig from '@/config/AppConfig';

describe('AppConfig', () => {
    
  const originalEnv = process.env;

  // Before each test, reset the process.env
  beforeEach(() => {
    process.env = { ...originalEnv }; // Create a fresh copy of process.env
  });

  afterEach(() => {
    process.env = originalEnv; // Restore original process.env after each test
  });

  test('should use container URL when NEXT_PUBLIC_USE_DOCKER_URL is "true"', () => {
    process.env.NEXT_PUBLIC_USE_DOCKER_URL = "true";
    process.env.NEXT_PUBLIC_CONTAINER_CASHEW_HOST = "cashew-app:";
    process.env.NEXT_PUBLIC_CONTAINER_CASHEW_POST = "8080";

    expect(AppConfig.useDockerUrl).toBe(true);
    expect(AppConfig.baseUrl).toBe("cashew-app:8080");
  });

  test('should use local URL when NEXT_PUBLIC_USE_DOCKER_URL is "false"', () => {
    process.env.NEXT_PUBLIC_USE_DOCKER_URL = "false";
    process.env.NEXT_PUBLIC_LOCAL_CASHEW_HOST = "localhost:";
    process.env.NEXT_PUBLIC_LOCAL_CASHEW_POST = "8080";

    expect(AppConfig.useDockerUrl).toBe(false);
    expect(AppConfig.baseUrl).toBe("localhost:8080");
  });


  test('should fall back to empty strings when environment variables are not set', () => {
    delete process.env.NEXT_PUBLIC_USE_DOCKER_URL;
    delete process.env.NEXT_PUBLIC_LOCAL_CASHEW_HOST;
    delete process.env.NEXT_PUBLIC_LOCAL_CASHEW_POST;
    delete process.env.NEXT_PUBLIC_CONTAINER_CASHEW_HOST;
    delete process.env.NEXT_PUBLIC_CONTAINER_CASHEW_POST;

    expect(AppConfig.useDockerUrl).toBe(false); // Default to false
    expect(AppConfig.baseUrl).toBe(""); // Empty since no host/port are set
  });

  test('should handle mixed configurations correctly', () => {

    process.env.NEXT_PUBLIC_USE_DOCKER_URL = "true";

    process.env.NEXT_PUBLIC_LOCAL_CASHEW_HOST = "localhost:";
    process.env.NEXT_PUBLIC_LOCAL_CASHEW_POST = "3000";

    process.env.NEXT_PUBLIC_CONTAINER_CASHEW_HOST = "cashew-app:";
    process.env.NEXT_PUBLIC_CONTAINER_CASHEW_POST = "8080";

    expect(AppConfig.useDockerUrl).toBe(true);
    expect(AppConfig.baseUrl).toBe("cashew-app:8080");


    process.env.NEXT_PUBLIC_USE_DOCKER_URL = "false";
    expect(AppConfig.baseUrl).toBe("localhost:3000");
  });
});
