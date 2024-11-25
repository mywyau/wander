class AppConfig {

  static get urlLocalHost(): string {
    return process.env.NEXT_PUBLIC_LOCAL_CASHEW_HOST || "";
  }

  static get urlLocalPort(): string {
    return process.env.NEXT_PUBLIC_LOCAL_CASHEW_POST || "";
  }

  static get urlContainerHost(): string {
    return process.env.NEXT_PUBLIC_CONTAINER_CASHEW_HOST || "";
  }

  static get urlContainerPort(): string {
    return process.env.NEXT_PUBLIC_CONTAINER_CASHEW_POST || "";
  }

  static get useDockerUrl(): boolean {
    return process.env.NEXT_PUBLIC_USE_DOCKER_URL === "true";
  }

  static get baseUrl(): string {
    return this.useDockerUrl
      ? `${this.urlContainerHost}${this.urlContainerPort}`
      : `${this.urlLocalHost}${this.urlLocalPort}`;
  }
}

export default AppConfig;
