class AppConfig {

  static get cashewLocalHost(): string {
    return process.env.LOCAL_CASHEW_HOST || "";
  }

  static get cashewLocalPort(): string {
    return process.env.LOCAL_CASHEW_PORT || "";
  }

  static get cashewContainerHost(): string {
    return process.env.CONTAINER_CASHEW_HOST || "";
  }

  static get cashewContainerPort(): string {
    return process.env.CONTAINER_CASHEW_PORT || "";
  }

  static get useDockerCashew(): boolean {
    return process.env.NEXT_PUBLIC_USE_DOCKER_CASHEW === "true";
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


  static baseCashewUrl(isContainer: boolean): string {
    return isContainer
      ? `${this.cashewContainerHost}${this.cashewContainerPort}`
      : `${this.cashewLocalHost}${this.cashewLocalPort}`;
  }

  static getReggieUrl(isContainer: boolean): string {
    return isContainer
      ? `${this.reggieContainerHost}${this.reggieContainerPort}`
      : `${this.reggieLocalHost}${this.reggieLocalPort}`;
  }

}

export default AppConfig;
