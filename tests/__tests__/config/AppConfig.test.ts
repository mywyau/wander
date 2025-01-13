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
    process.env.NEXT_PUBLIC_TRAEFIK_CASHEW_HOST = "cashew:";
    process.env.NEXT_PUBLIC_TRAEFIK_CASHEW_PORT = "8080";

    expect(AppConfig.useDockerCashew).toBe(true);
    expect(AppConfig.baseCashewUrl(true)).toBe("cashew:8080");
  });

  test('should use localhost URL when isContainer is "false"', () => {

    process.env.NEXT_PUBLIC_USE_DOCKER_URL = "false";
    process.env.NEXT_PUBLIC_LOCAL_CASHEW_HOST = "localhost:";
    process.env.NEXT_PUBLIC_LOCAL_CASHEW_PORT = "8080";

    expect(AppConfig.useDockerCashew).toBe(false);
    expect(AppConfig.baseCashewUrl(false)).toBe("localhost:8080");
  });

  test('should fall back to empty strings when environment variables are not set', () => {
    delete process.env.NEXT_PUBLIC_USE_DOCKER_URL;
    delete process.env.NEXT_PUBLIC_LOCAL_CASHEW_HOST;
    delete process.env.NEXT_PUBLIC_LOCAL_CASHEW_PORT;
    delete process.env.NEXT_PUBLIC_TRAEFIK_CASHEW_HOST;
    delete process.env.NEXT_PUBLIC_TRAEFIK_CASHEW_PORT;

    expect(AppConfig.useDockerCashew).toBe(false); 
    expect(AppConfig.baseCashewUrl(false)).toBe(""); 
  });

  test('should handle mixed configurations correctly', () => {

    process.env.NEXT_PUBLIC_USE_DOCKER_URL = "true";

    process.env.NEXT_PUBLIC_LOCAL_CASHEW_HOST = "localhost:";
    process.env.NEXT_PUBLIC_LOCAL_CASHEW_PORT = "3000";

    process.env.NEXT_PUBLIC_TRAEFIK_CASHEW_HOST = "cashew:";
    process.env.NEXT_PUBLIC_TRAEFIK_CASHEW_PORT = "8080";

    expect(AppConfig.useDockerCashew).toBe(true);
    expect(AppConfig.baseCashewUrl(true)).toBe("cashew:8080");


    process.env.NEXT_PUBLIC_USE_DOCKER_URL = "false";
    expect(AppConfig.baseCashewUrl(false)).toBe("localhost:3000");
  });


  test('pistachio configs should be correct', () => {

    process.env.NEXT_PUBLIC_LOCAL_PISITACHIO_HOST = "localhost:";
    process.env.NEXT_PUBLIC_LOCAL_PISITACHIO_PORT = "1011";

    process.env.NEXT_PUBLIC_TRAEFIK_PISITACHIO_HOST = "pistachio:";
    process.env.NEXT_PUBLIC_TRAEFIK_PISITACHIO_PORT = "1011";

    expect(AppConfig.useDockerCashew).toBe(true);
    expect(AppConfig.basePistachioUrl(true)).toBe("pistachio.localhost");
    expect(AppConfig.basePistachioUrl(false)).toBe("localhost:1011");
  });


  test('peanut configs should be correct', () => {

    process.env.NEXT_PUBLIC_LOCAL_PEANUT_HOST = "localhost:";
    process.env.NEXT_PUBLIC_LOCAL_PEANUT_PORT = "1012";

    process.env.NEXT_PUBLIC_TRAEFIK_PEANUT_HOST = "peanut:";
    process.env.NEXT_PUBLIC_TRAEFIK_PEANUT_PORT = "1012";

    expect(AppConfig.useDockerCashew).toBe(true);
    expect(AppConfig.basePeanutUrl(true)).toBe("peanut:1012");
    expect(AppConfig.basePeanutUrl(false)).toBe("localhost:1012");
  });
});
