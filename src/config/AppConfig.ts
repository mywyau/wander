

class AppConfig {
    // Boolean flag to determine if Docker URL should be used
    static useDockerUrl: boolean = process.env.NEXT_PUBLIC_USE_DOCKER_URL === "true";
  
    // Host and port information for local and container setups
    static urlLocalHost: string = process.env.NEXT_PUBLIC_LOCAL_CASHEW_HOST || "";
    static urlLocalPort: string = process.env.NEXT_PUBLIC_LOCAL_CASHEW_POST || "";
    static urlContainerHost: string = process.env.NEXT_PUBLIC_CONTAINER_CASHEW_HOST || "";
    static urlContainerPort: string = process.env.NEXT_PUBLIC_CONTAINER_CASHEW_POST || "";
  
    // Base URL logic based on useDockerUrl
    static get baseUrl(): string {
      return this.useDockerUrl
        ? `${this.urlLocalHost}${this.urlLocalPort}`
        : `${this.urlContainerHost}${this.urlContainerPort}`;
    }
  }
  
  export default AppConfig;
  