import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useSignup } from "@/hooks/useAuth";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

export default function SignupScreen() {
  const router = useRouter();
  const signup = useSignup();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    signup.mutate(
      { name, email, password, confirmPassword },
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
      <Text style={{ fontSize: 30, marginBottom: 20 }}>Sign Up</Text>

      <TextInput
        placeholder="Name"
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={setConfirmPassword}
        style={{ borderWidth: 1, padding: 10 }}
      />

      <Pressable
        onPress={handleSignup}
        style={{ backgroundColor: "black", padding: 15, marginTop: 20 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Create Account
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("../components/login")}
        style={{ marginTop: 15 }}
      >
        <Text style={{ textAlign: "center" }}>
          Already have an account? Login
        </Text>
      </Pressable>
    </View>
  );
}
