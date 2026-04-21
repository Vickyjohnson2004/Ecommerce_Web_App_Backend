// import { Redirect } from "expo-router";
// import * as SecureStore from "expo-secure-store";
// import { useEffect, useState } from "react";
// import { ActivityIndicator, View } from "react-native";

// export default function Index() {
//   const [loading, setLoading] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = await SecureStore.getItemAsync("auth_token");

//       setIsLoggedIn(!!token);
//       setLoading(false);
//     };

//     checkAuth();
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator />
//       </View>
//     );
//   }

//   // ✅ LOGGED IN → go app
//   if (isLoggedIn) {
//     // return <Redirect href="/(tabs)" />;
//   }

//   // ❌ NOT LOGGED IN → go login
//   return <Redirect href="../components/login" />;
// }

import { View, Text } from 'react-native'
import React from 'react'

const index = () => {
  return (
    <View>
      <Text>index working</Text>
    </View>
  )
}

export default index