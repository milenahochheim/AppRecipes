import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function AddRecipes({ navigation, ...props }) {
  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ padding: 20, justifyContent: "space-around" }}>
          <TextInput
            style={[styles.input]}
            placeholder="Adicione uma receita aqui :)"
            multiline={true}
            value={props.recipe}
            onChangeText={(text) => props.setRecipe(text)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (props.recipe === "") {
                Alert.alert("precisa digitar, por favor :)");
              } else {
                props.handleRecipe();
                navigation.navigate("Recipes");
              }
            }}
          >
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  button: {
    backgroundColor: "#B1303B",
    width: "40%",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    alignSelf: "flex-end",
    marginTop: 20,
  },
  input: {
    padding: 20,
    paddingTop: 20,
    paddingBottom: 240,
    width: "100%",
    fontSize: 16,
    color: "black",
    opacity: 0.8,
    backgroundColor: "white",
    borderColor: "#B1303B",
    borderWidth: 2,
    borderRadius: 5,
    height: 300,
  },
  addRecipeContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
