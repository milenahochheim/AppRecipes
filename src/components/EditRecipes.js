import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "./AddRecipes";

export default function EditRecipes({ route, navigation, ...props }) {
  const { i, n } = route.params;
  const [newEdit, setNewEdit] = useState(n);

  function editRecipe() {
    let edited = [...props.recipes];
    edited[i] = newEdit;
    props.setRecipes(edited);

    navigation.navigate("Recipes");

    AsyncStorage.setItem("storedRecipes", JSON.stringify(edited))
      .then(() => {
        props.setRecipes(edited);
      })
      .catch((error) => console.log(error));
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ padding: 20, justifyContent: "space-around" }}>
          <TextInput
            style={[styles.input]}
            placeholder="digite aqui :)"
            value={newEdit.toString()}
            multiline={true}
            onChangeText={(text) => setNewEdit(text)}
          />
          <TouchableOpacity style={styles.button} onPress={() => editRecipe()}>
            <Text style={styles.buttonText}>editar</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
