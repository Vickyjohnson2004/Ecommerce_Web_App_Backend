import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/useAuth";

export default function AuthRoutesLayout() {
  const [token, setToken] = useState<string | null>(null);
  const [checkingToken, setCheckingToken] = useState(true);

  // 1. Load token from SecureStore
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("auth_token");
        setToken(storedToken);
      } catch (err) {
        console.log("Error loading token:", err);
        setToken(null);
      } finally {
        setCheckingToken(false);
      }
    };

    loadToken();
  }, []);

  // 2. Fetch user only if token exists (Axios interceptor handles auth)
  const { data, isLoading } = useCurrentUser();

  const loading = checkingToken || isLoading;

  // 3. Show loading UI while checking auth
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 4. NOT AUTHENTICATED → redirect to login
  if (!token || !data?.user) {
    return <Redirect href="../components/login" />;
  }

  // 5. AUTHENTICATED → allow access to Stack screens
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="../components/login" />
      <Stack.Screen name="../components/signup" />
    </Stack>
  );
}
