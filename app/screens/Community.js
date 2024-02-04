import { View, Text, StyleSheet, Alert, Button, TextInput } from "react-native";
import { React } from "react";

function Community() {
  return (
    <View style={styles.container}>
      <Text>Community</Text>
    </View>
  );
}

export default Community;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
