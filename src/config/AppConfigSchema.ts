import { z } from "zod";

// Define the schema for service environments
const LocalOrContainerSchema = z.object({
  host: z.string().nonempty("Host is required"),
  port: z.number().int().min(1, "Port must be a positive integer"),
});

// Define the schema for Traefik (only a host, no port)
const TraefikSchema = z.object({
  host: z.string().nonempty("Host is required"),
});

// Define the schema for a service configuration
const ServiceSchema = z.object({
  local: LocalOrContainerSchema,
  traefik: TraefikSchema,
  container: LocalOrContainerSchema,
});

// Define the schema for the entire app configuration
export const AppConfigSchema = z.object({
  useTraefikUrl: z.boolean(),
  services: z.object({
    cashew: ServiceSchema,
    pistachio: ServiceSchema,
    peanut: ServiceSchema,
    wander: ServiceSchema,
    reggie: ServiceSchema,
  }),
});