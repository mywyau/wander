class AppConfig {
  static get useDockerCashew(): boolean {
    return process.env.NEXT_PUBLIC_USE_DOCKER_URL === "true";
  }

  static get cashewLocalHost(): string {
    return process.env.NEXT_PUBLIC_LOCAL_CASHEW_HOST || "";
  }

  static get cashewLocalPort(): string {
    return process.env.NEXT_PUBLIC_LOCAL_CASHEW_PORT || "";
  }

  static get cashewContainerHost(): string {
    return process.env.NEXT_PUBLIC_TRAEFIK_CASHEW_HOST || "";
  }

  static get cashewContainerPort(): string {
    return process.env.NEXT_PUBLIC_TRAEFIK_CASHEW_PORT || "";
  }

  static get pistachioLocalHost(): string {
    return process.env.NEXT_PUBLIC_LOCAL_PISTACHIO_HOST || "";
  }

  static get pistachioLocalPort(): string {
    return process.env.NEXT_PUBLIC_LOCAL_PISTACHIO_PORT || "";
  }

  static get pistachioContainerHost(): string {
    return process.env.NEXT_PUBLIC_TRAEFIK_PISTACHIO_HOST || "";
  }

  static get pistachioContainerPort(): string {
    return process.env.NEXT_PUBLIC_TRAEFIK_PISTACHIO_PORT || "";
  }

  static get peanutLocalHost(): string {
    return process.env.NEXT_PUBLIC_LOCAL_PEANUT_HOST || "";
  }

  static get peanutLocalPort(): string {
    return process.env.NEXT_PUBLIC_LOCAL_PEANUT_PORT || "";
  }

  static get peanutContainerHost(): string {
    return process.env.NEXT_PUBLIC_TRAEFIK_PEANUT_HOST || "";
  }

  static get peanutContainerPort(): string {
    return process.env.NEXT_PUBLIC_TRAEFIK_PEANUT_PORT || "";
  }

  static get reggieLocalHost(): string {
    return process.env.NEXT_PUBLIC_LOCAL_REGGIE_HOST || "";
  }

  static get reggieLocalPort(): string {
    return process.env.NEXT_PUBLIC_LOCAL_REGGIE_PORT || "";
  }

  static get reggieContainerHost(): string {
    return process.env.NEXT_PUBLIC_TRAEFIK_REGGIE_HOST || "";
  }

  static get reggieContainerPort(): string {
    return process.env.NEXT_PUBLIC_TRAEFIK_REGGIE_PORT || "";
  }

  static baseCashewUrl(isTraefik: boolean): string {
    return isTraefik
      ? `${this.cashewContainerHost}${this.cashewContainerPort}`
      : `${this.cashewLocalHost}${this.cashewLocalPort}`;
  }

  static basePistachioUrl(isTraefik: boolean): string {
    return isTraefik
      ? `${this.pistachioContainerHost}${this.pistachioContainerPort}`
      : `${this.pistachioLocalHost}${this.pistachioLocalPort}`;
  }

  static basePeanutUrl(isTraefik: boolean): string {
    return isTraefik
      ? `${this.peanutContainerHost}${this.peanutContainerPort}`
      : `${this.peanutLocalHost}${this.peanutLocalPort}`;
  }

  static getReggieUrl(isTraefik: boolean): string {
    return isTraefik
      ? `${this.reggieContainerHost}${this.reggieContainerPort}`
      : `${this.reggieLocalHost}${this.reggieLocalPort}`;
  }
}

export default AppConfig;
