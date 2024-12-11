class AppConfig {

  static get urlLocalHost(): string {
    return process.env.LOCAL_CASHEW_HOST || "";
  }

  static get urlLocalPort(): string {
    return process.env.LOCAL_CASHEW_PORT || "";
  }

  static get urlContainerHost(): string {
    return process.env.CONTAINER_CASHEW_HOST || "";
  }

  static get urlContainerPort(): string {
    return process.env.CONTAINER_CASHEW_PORT || "";
  }

  static get useDockerUrl(): boolean {
    return process.env.NEXT_PUBLIC_USE_DOCKER_URL === "true";
  }


  static get reggieLocalHost(): string {
    return process.env.LOCAL_REGGIE_HOST || "";
  }

  static get reggieLocalPort(): string {
    return process.env.LOCAL_REGGIE_PORT || "";
  }

  static get reggieContainerHost(): string {
    return process.env.CONTAINER_REGGIE_HOST || "";
  }

  static get reggieContainerPort(): string {
    return process.env.CONTAINER_REGGIE_PORT || "";
  }


  static get baseUrl(): string {
    return this.useDockerUrl
      ? `${this.urlContainerHost}${this.urlContainerPort}`
      : `${this.urlLocalHost}${this.urlLocalPort}`;
  }

  static getReggieUrl(isContainer: boolean): string {
    return isContainer
      ? `${this.reggieContainerHost}${this.reggieContainerPort}`
      : `${this.reggieLocalHost}${this.reggieLocalPort}`;
  }  

}

export default AppConfig;
