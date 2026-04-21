import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useLogin } from "@/hooks/useAuth";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const login = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login.mutate(
      { email, password },
      {
        onSuccess: async (res) => {
          await SecureStore.setItemAsync("auth_token", res.data.token);
          router.replace("/(tabs)");
        },
      },
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />

      <Pressable
        onPress={handleLogin}
        style={{ backgroundColor: "black", padding: 15 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("../components/signup")}
        style={{ marginTop: 15 }}
      >
        <Text style={{ textAlign: "center" }}>
          Don&apos;t have an account? Sign up
        </Text>
      </Pressable>
    </View>
  );
}
