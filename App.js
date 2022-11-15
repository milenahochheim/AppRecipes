import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Recipes from "./src/components/Recipes";
import AddRecipes from "./src/components/AddRecipes";
import FavRecipes from "./src/components/FavRecipes";
import EditRecipes from "./src/components/EditRecipes";

const Stack = createNativeStackNavigator();

export default function App() {
  const [recipe, setRecipe] = useState();
  const [recipe2, setRecipe2] = useState();
  const [recipes, setRecipes] = useState([]);
  const [recipes2, setRecipes2] = useState([]);
  const [date, setDate] = useState(new Date().toUTCString());
  const [moveToBin, setMoveToBin] = useState([]);

  function handleRecipe() {
    let newRecipe = recipe;
    let newRecipes = [newRecipe, ...recipes];
    setRecipes(newRecipes);
    setRecipe("");

    AsyncStorage.setItem("storedRecipes", JSON.stringify(newRecipes))
      .then(() => {
        setRecipes(newRecipes);
      })
      .catch((error) => console.log(error));

    AsyncStorage.setItem("date", JSON.stringify(date)).then(() => {
      setDate(date);
    });
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = () => {
    AsyncStorage.getItem("storedRecipes")
      .then((data) => {
        if (data !== null) {
          setRecipes(JSON.parse(data));
        }
      })
      .catch((error) => console.log(error));

    AsyncStorage.getItem("favoritedRecipes")
      .then((data) => {
        if (data !== null) {
          setMoveToBin(JSON.parse(data));
        }
      })
      .catch((error) => console.log(error));

    AsyncStorage.getItem("date");
  };

  // function handleRecipe2() {
  //   let newRecipe2 = recipe2;
  //   let newRecipes2 = [newRecipe2, ...recipes2];
  //   setRecipes(newRecipes2);
  //   setRecipe2("");
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Recipes">
          {(props) => (
            <Recipes
              {...props}
              recipes={recipes}
              setRecipes={setRecipes}
              recipe={recipe}
              setRecipe={setRecipe}
              date={date}
              setDate={setDate}
              moveToBin={moveToBin}
              setMoveToBin={setMoveToBin}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="AddRecipes">
          {(props) => (
            <AddRecipes
              {...props}
              recipe={recipe}
              setRecipe={setRecipe}
              handleRecipe={handleRecipe}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="FavRecipes">
          {(props) => (
            <FavRecipes
              {...props}
              moveToBin={moveToBin}
              setMoveToBin={setMoveToBin}
              recipes={recipes}
              setRecipes={setRecipes}
              date={date}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="EditRecipes">
          {(props) => (
            <EditRecipes
              {...props}
              moveToBin={moveToBin}
              setMoveToBin={setMoveToBin}
              recipes={recipes}
              setRecipes={setRecipes}
              date={date}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
