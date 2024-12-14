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

  test('should use container URL when USE_DOCKER_URL is "true"', () => {
    process.env.USE_DOCKER_URL = "true";
    process.env.CONTAINER_CASHEW_HOST = "cashew:";
    process.env.CONTAINER_CASHEW_PORT = "8080";

    expect(AppConfig.useDockerCashew).toBe(true);
    expect(AppConfig.baseCashewUrl(true)).toBe("cashew:8080");
  });

  test('should use localhost URL when isContainer is "false"', () => {

    process.env.USE_DOCKER_URL = "false";
    process.env.LOCAL_CASHEW_HOST = "localhost:";
    process.env.LOCAL_CASHEW_PORT = "8080";

    expect(AppConfig.useDockerCashew).toBe(false);
    expect(AppConfig.baseCashewUrl(false)).toBe("localhost:8080");
  });

  test('should fall back to empty strings when environment variables are not set', () => {
    delete process.env.USE_DOCKER_URL;
    delete process.env.LOCAL_CASHEW_HOST;
    delete process.env.LOCAL_CASHEW_PORT;
    delete process.env.CONTAINER_CASHEW_HOST;
    delete process.env.CONTAINER_CASHEW_PORT;

    expect(AppConfig.useDockerCashew).toBe(false); // Default to false

    expect(AppConfig.baseCashewUrl(false)).toBe(""); // Empty since no host/port are set
  });

  test('should handle mixed configurations correctly', () => {

    process.env.USE_DOCKER_URL = "true";

    process.env.LOCAL_CASHEW_HOST = "localhost:";
    process.env.LOCAL_CASHEW_PORT = "3000";

    process.env.CONTAINER_CASHEW_HOST = "cashew:";
    process.env.CONTAINER_CASHEW_PORT = "8080";

    expect(AppConfig.useDockerCashew).toBe(true);
    expect(AppConfig.baseCashewUrl(true)).toBe("cashew:8080");


    process.env.USE_DOCKER_URL = "false";
    expect(AppConfig.baseCashewUrl(false)).toBe("localhost:3000");
  });


  test('pistachio configs should be correct', () => {

    process.env.LOCAL_PISITACHIO_HOST = "localhost:";
    process.env.LOCAL_PISITACHIO_PORT = "1010";

    process.env.CONTAINER_PISITACHIO_HOST = "pistachio:";
    process.env.CONTAINER_PISITACHIO_PORT = "1010";

    expect(AppConfig.useDockerCashew).toBe(true);
    expect(AppConfig.basePistachioUrl(true)).toBe("pistachio:1010");
    expect(AppConfig.basePistachioUrl(false)).toBe("localhost:1010");
  });


  test('peanut configs should be correct', () => {

    process.env.LOCAL_PEANUT_HOST = "localhost:";
    process.env.LOCAL_PEANUT_PORT = "1011";

    process.env.CONTAINER_PEANUT_HOST = "peanut:";
    process.env.CONTAINER_PEANUT_PORT = "1011";

    expect(AppConfig.useDockerCashew).toBe(true);
    expect(AppConfig.basePeanutUrl(true)).toBe("peanut:1011");
    expect(AppConfig.basePeanutUrl(false)).toBe("localhost:1011");
  });
});
