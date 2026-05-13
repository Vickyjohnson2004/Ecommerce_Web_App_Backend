import { useState } from "react";
import { Alert } from "react-native";

function useSocialAuth() {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);

  const handleSocialAuth = async (
    _strategy: "oauth_google" | "oauth_apple",
  ) => {
    setLoadingStrategy(null);
    Alert.alert(
      "Unsupported",
      "Social auth is disabled. Use email/password login.",
    );
  };

  return { loadingStrategy, handleSocialAuth };
}

export default useSocialAuth;
