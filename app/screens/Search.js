import { View, Text, StyleSheet, Alert, Button, TextInput } from "react-native";
import { React } from "react";

function Search() {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
