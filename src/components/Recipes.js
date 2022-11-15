import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Keyboard,
} from "react-native";

export default function Recipes({ navigation, ...props }) {
  const [searchRecipe, setsearchRecipe] = useState();

  function favoriteRecipe(index) {
    let newArray = [...props.recipes];
    let movedRecipe = newArray.splice(index, 1);
    props.setRecipes(newArray);
    props.setMoveToBin(movedRecipe);

    let bin = [movedRecipe, ...props.moveToBin];
    props.setMoveToBin(bin);

    AsyncStorage.setItem("storedRecipes", JSON.stringify(newArray))
      .then(() => {
        props.setRecipes(newArray);
      })
      .catch((error) => console.log(error));

    AsyncStorage.setItem("favoritedRecipes", JSON.stringify(bin))
      .then(() => {
        props.setMoveToBin(bin);
      })
      .catch((error) => console.log(error));
  }

  function search() {
    if (searchRecipe === "") {
      Alert.alert("coloque um nome, uma letra de alguma receita :)");
    } else if (searchRecipe !== "") {
      props.recipes.forEach((item, index) => {
        if (item.includes(searchRecipe)) {
          let searchItem = [...props.recipes];
          let firstArray = searchItem[0];
          let index = [...props.recipes].indexOf(item);
          searchItem[0] = item;
          searchItem[index] = firstArray;
          props.setRecipes(searchItem);
        }
      });
    }
    setsearchRecipe("");
    Keyboard.dismiss();
  }

  function clearAllRecipes() {
    let emptyArray = [...props.recipes];
    let deletedComArray = [...props.moveToBin];
    emptyArray.forEach((item, index) => {
      deletedComArray.push(item);
    });
    emptyArray = [];
    props.setRecipes(emptyArray);
    props.setMoveToBin(deletedComArray);

    AsyncStorage.setItem("storedRecipes", JSON.stringify(emptyArray))
      .then(() => {
        props.setRecipes(emptyArray);
      })
      .catch((error) => console.log(error));

    AsyncStorage.setItem("favoritedRecipes", JSON.stringify(deletedComArray))
      .then(() => {
        props.setMoveToBin(deletedComArray);
      })
      .catch((error) => console.log(error));
  }

  return (
    <View style={styles.notesContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Lariquinhas</Text>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[styles.button, { marginLeft: 40 }]}
            onPress={() => navigation.navigate("FavRecipes")}
          >
            <Text style={{ marginLeft: 14, fontSize: 20, color: "#ffffff" }}>
              ★
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => navigation.navigate("AddRecipes")}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 35,
                fontWeight: "bold",
                marginLeft: 14,
                marginBottom: 3,
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <Text>receitas para acabar com a sua larica</Text> */}
      {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 18, color: "#B1303B" }}>
          Total de Receitas:{" "}
        </Text>
      </View> */}
      <View style={styles.divider}></View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="procure as receitas aqui :)"
          placeholderTextColor={"#B1303B"}
          style={[styles.input, { borderWidth: 1 }]}
          value={searchRecipe}
          onChangeText={(text) => setsearchRecipe(text)}
        />
        <TouchableOpacity
          style={[styles.searchButton, { width: 60 }]}
          onPress={() => search()}
        >
          <Text style={{ fontSize: 14, color: "#fff", fontWeight: "bold" }}>
            search
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.searchButton}
          onPress={() => clearAllRecipes()}
        >
          <Text style={styles.searchButtonText}>clear</Text>
        </TouchableOpacity> */}
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {props.recipes.length === 0 ? (
          <View style={styles.emptyNoteContainer}>
            <Text style={styles.emptyNoteText}>nada por aqui :(</Text>
          </View>
        ) : (
          props.recipes.map((item, index) => (
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
                <TouchableOpacity onPress={() => favoriteRecipe(index)}>
                  <Text style={styles.delete}>☆</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.dateContainer}>
                <Text>{props.date}</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("EditRecipes", {
                      i: index,
                      n: item,
                    })
                  }
                >
                  <Text style={styles.delete}>editar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  notesContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
    marginBottom: 70,
    opacity: 0.9,
  },
  heading: {
    fontSize: 40,
    fontWeight: "700",
    color: "#B1303B",
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: "#F4A233",
    marginTop: 12,
    marginBottom: 5,
  },
  item: {
    marginBottom: 20,
    padding: 15,
    color: "black",
    opacity: 0.8,
    marginTop: 10,
    elevation: 5,
    backgroundColor: "white",
    borderColor: "#F4A233",
    borderWidth: 2,
    borderRadius: 5,
    borderLeftWidth: 15,
  },
  index: {
    fontSize: 18,
    fontWeight: "600",
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#B1303B",
    width: 50,
    borderRadius: 100,
    justifyContent: "center",
    marginLeft: 10,
    height: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 32,
    fontWeight: 800,
  },
  scrollView: {
    marginBottom: 70,
  },
  note: {
    flexDirection: "row",
    width: "75%",
  },
  text: {
    fontSize: 17,
    alignSelf: "center",
    marginLeft: 5,
  },
  delete: {
    color: "#B1303B",
    fontWeight: "700",
    fontSize: 17,
  },
  input: {
    height: 40,
    paddingHorizontal: 20,
    width: "83%",
    fontSize: 15,
    color: "black",
    fontWeight: "600",
    opacity: 0.8,
    elevation: 5,
    backgroundColor: "white",
    borderColor: "#B1303B",
    borderRadius: 9,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  searchButton: {
    backgroundColor: "#B1303B",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    borderRadius: 5,
    height: 40,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  emptyNoteContainer: {
    alignItems: "center",
    marginTop: 240,
  },
  emptyNoteText: {
    color: "#B1303B",
    fontWeight: "600",
    fontSize: 15,
  },
  dateContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
