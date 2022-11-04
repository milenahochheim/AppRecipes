import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { styles } from "./Recipes";

export default function FavRecipes({ ...props }) {
  function emptyBin() {
    Alert.alert(
      "deletar todas as receitas",
      "tem certeza de deletar todas as receitas permanentemente?",
      [
        {
          text: "No",
          onPress: () => console.log("No pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            let emptyArray = [...props.moveToBin];
            emptyArray = [];
            props.setMoveToBin(emptyArray);
          },
        },
      ]
    );
  }

  function undoAllRecipes() {
    let favRecipes = [...props.moveToBin];
    let recipes = [...props.recipes];
    favRecipes.forEach((item, index) => {
      recipes.push(item);
    });
    props.setMoveToBin([]);
    props.setRecipes(favRecipes);
  }

  function undoRecipe(index) {
    let getBack = props.moveToBin[index];
    let array = [getBack, ...props.recipes];
    props.setRecipes(array);

    let newArray = [...props.moveToBin];
    newArray.splice(index, 1);
    props.setMoveToBin(newArray);
  }

  function permanentlyDelete(index) {
    Alert.alert("deletar", "tem certeza que quer deletar essa receitinha?", [
      {
        text: "No",
        onPress: () => console.log("No pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          let newArray = [...props.moveToBin];
          newArray.splice(index, 1);
          props.setMoveToBin(newArray);
        },
      },
    ]);
  }

  return (
    <View>
      <ScrollView>
        <View style={styles.notesContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={style.emptyButton}
              onPress={() => undoAllRecipes()}
            >
              <Text style={style.emptyButtonText}>undo all</Text>
            </TouchableOpacity>

            <Text style={{ fontWeight: "700", fontSize: 18, color: "#B1303B" }}>
              Total:
            </Text>
            <TouchableOpacity
              style={style.emptyButton}
              onPress={() => emptyBin()}
            >
              <Text style={style.emptyButtonText}>empty</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider}></View>
          {props.moveToBin.length === 0 ? (
            <View style={styles.emptyNoteContainer}>
              <Text style={styles.emptyNoteText}>
                sem receitinhas por aqui :(
              </Text>
            </View>
          ) : (
            props.moveToBin.map((item, index) => (
              <View style={styles.item} key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.note}>
                    <Text style={styles.index}>{index + 1}.</Text>
                    <Text style={styles.text}>{item}</Text>
                  </View>
                  <TouchableOpacity onPress={() => undoRecipe(index)}>
                    <Text style={styles.delete}>★</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.dateContainer}>
                  <Text>{props.date} </Text>
                  <TouchableOpacity onPress={() => permanentlyDelete(index)}>
                    <Text style={styles.delete}>deletar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export const style = StyleSheet.create({
  emptyButton: {
    backgroundColor: "#B1303B",
    width: "25%",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    marginBottom: 5,
  },
  emptyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  notesContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
    marginBottom: 70,
    opacity: 0.9,
  },
});
