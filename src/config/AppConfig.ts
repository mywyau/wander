class AppConfig {

  static get useDockerCashew(): boolean {
    return process.env.USE_DOCKER_URL === "true";
  }

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

  static get pistachioLocalHost(): string {
    return process.env.LOCAL_PISTACHIO_HOST || "";
  }

  static get pistachioLocalPort(): string {
    return process.env.LOCAL_PISTACHIO_PORT || "";
  }

  static get pistachioContainerHost(): string {
    return process.env.CONTAINER_PISTACHIO_HOST || "";
  }

  static get pistachioContainerPort(): string {
    return process.env.CONTAINER_PISTACHIO_PORT || "";
  }

  static get peanutLocalHost(): string {
    return process.env.LOCAL_PEANUT_HOST || "";
  }

  static get peanutLocalPort(): string {
    return process.env.LOCAL_PEANUT_PORT || "";
  }  
  
  static get peanutContainerHost(): string {
    return process.env.CONTAINER_PEANUT_HOST || "";
  }
  
  static get peanutContainerPort(): string {
    return process.env.CONTAINER_PEANUT_PORT || "";
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

  static basePistachioUrl(isContainer: boolean): string {
    return isContainer
      ? `${this.pistachioContainerHost}${this.pistachioContainerPort}`
      : `${this.pistachioLocalHost}${this.pistachioLocalPort}`;
  }

  static basePeanutUrl(isContainer: boolean): string {
    return isContainer
      ? `${this.peanutContainerHost}${this.peanutContainerPort}`
      : `${this.peanutLocalHost}${this.peanutLocalPort}`;
  }

  static getReggieUrl(isContainer: boolean): string {
    return isContainer
      ? `${this.reggieContainerHost}${this.reggieContainerPort}`
      : `${this.reggieLocalHost}${this.reggieLocalPort}`;
  }

}

export default AppConfig;
