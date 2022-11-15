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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FavRecipes({ navigation, ...props }) {
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

            AsyncStorage.setItem("favoritedRecipes", JSON.stringify(emptyArray))
              .then(() => {
                props.setMoveToBin(emptyArray);
              })
              .catch((error) => console.log(error));
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

    AsyncStorage.setItem("storedRecipes", JSON.stringify(recipes))
      .then(() => {
        props.setRecipes(recipes);
      })
      .catch((error) => console.log(error));

    AsyncStorage.setItem("favoritedRecipes", JSON.stringify([]))
      .then(() => {
        props.setMoveToBin([]);
      })
      .catch((error) => console.log(error));
  }

  function undoRecipe(index) {
    let getBack = props.moveToBin[index];
    let array = [getBack, ...props.recipes];
    props.setRecipes(array);

    let newArray = [...props.moveToBin];
    newArray.splice(index, 1);
    props.setMoveToBin(newArray);

    AsyncStorage.setItem("storedRecipes", JSON.stringify(array))
      .then(() => {
        props.setRecipes(array);
      })
      .catch((error) => console.log(error));

    // AsyncStorage.setItem("favoritedRecipes", () => {
    //   return;
    // });
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

          AsyncStorage.setItem("favoritedRecipes", JSON.stringify(newArray))
            .then(() => {
              props.setMoveToBin(newArray);
            })
            .catch((error) => console.log(error));
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

            <TouchableOpacity
              style={style.emptyButton}
              onPress={() => emptyBin()}
            >
              <Text style={style.emptyButtonText}>empty</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider}></View>
          <Text
            style={{
              fontSize: 20,
              color: "black",
              fontWeight: "bold",
              marginTop: 3,
            }}
          >
            receitinhas favoritas ♥️
          </Text>

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
