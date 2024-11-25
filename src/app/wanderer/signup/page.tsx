
import AppConfig from "../../../config/AppConfig"; // Adjust the path as needed
import WandererSignup from "./WandererSignup";

export default async function WandererSignupPage() {
  // Determine the backend URL dynamically on the server
  const baseUrl = AppConfig.baseUrl

  return <WandererSignup />;
}
