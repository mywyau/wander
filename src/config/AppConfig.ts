import { z } from 'zod';
import rawConfig from '../config/server.config.json'; // Adjust the path as needed
import { AppConfigSchema } from './AppConfigSchema';

export type AppConfigType = z.infer<typeof AppConfigSchema>;

export const appConfig: AppConfigType = AppConfigSchema.parse(rawConfig);

export enum Environment {
  LOCAL = "LOCAL",
  TRAEFIK = "TRAEFIK",
  CONTAINER = "CONTAINER",
}

export enum Service {
  CASHEW = "CASHEW",
  PISTACHIO = "PISTACHIO",
  PEANUT = "PEANUT",
  WANDER = "WANDER",
  REGGIE = "REGGIE",
}

class AppConfig {

  private static config = appConfig;

  private static getHost(service: Service, environment: Environment): string {
    const serviceKey = service.toLowerCase() as keyof typeof this.config.services;
    const environmentKey = environment.toLowerCase() as keyof typeof this.config.services.cashew;

    const serviceConfig = this.config.services[serviceKey][environmentKey];

    if (!serviceConfig || !serviceConfig.host) {
      throw new Error(
        `Host is missing for service "${service}" in environment "${environment}". Check the configuration file.`
      );
    }

    return serviceConfig.host;
  }

  private static getPort(service: Service, environment: Environment): number | undefined {
    if (environment === Environment.TRAEFIK) {
      // Traefik does not have a port
      return undefined;
    }

    const serviceKey = service.toLowerCase() as keyof typeof this.config.services;
    const environmentKey = environment.toLowerCase() as keyof typeof this.config.services.cashew;

    const serviceConfig = this.config.services[serviceKey][environmentKey];

    if (!serviceConfig || serviceConfig.port === undefined) {
      throw new Error(
        `Port is missing for service "${service}" in environment "${environment}". Check the configuration file.`
      );
    }

    return serviceConfig.port;
  }

  private static getBaseUrl(service: Service, environment: Environment): string {
    const host = this.getHost(service, environment);
    const port = this.getPort(service, environment);

    // Return host only for Traefik (no port)
    return environment === Environment.TRAEFIK ? `${host}` : `${host}:${port}`;
  }

  static localOrTraefikBaseUrl(service: Service): string {
    const useTraefik = this.config.useTraefikUrl;
    const environment = useTraefik ? Environment.TRAEFIK : Environment.LOCAL;

    return this.getBaseUrl(service, environment);
  }

  static localOrContainerBaseUrl(service: Service): string {
    const useContainerHostAndPort = this.config.useContainerHostAndPort;
    const environment = useContainerHostAndPort ? Environment.CONTAINER : Environment.LOCAL;

    return this.getBaseUrl(service, environment);
  }

  static baseCashewUrl(): string {
    return this.localOrContainerBaseUrl(Service.CASHEW);
  }

  // Pistachio URLs
  static basePistachioUrl(): string {
    return this.localOrContainerBaseUrl(Service.PISTACHIO);
  }

  // Peanut URLs
  static basePeanutUrl(): string {
    return this.localOrContainerBaseUrl(Service.PEANUT);
  }

  // Reggie URLs
  static getReggieUrl(): string {
    return this.localOrTraefikBaseUrl(Service.REGGIE);
  }

  // Wander URLs
  static getWanderUrl(): string {
    return this.localOrTraefikBaseUrl(Service.WANDER);
  }
}

export { AppConfig };
