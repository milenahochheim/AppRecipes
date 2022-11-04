import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styles } from "./AddRecipes";

export default function EditRecipes({ route, ...props }) {
  const { i, n } = route.params;
  const [newEdit, setNewEdit] = useState(n);

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ padding: 20, justifyContent: "space-around" }}>
          <TextInput style={[styles.input]} placeholder="digite aqui :)" />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>editar</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
