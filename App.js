import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Recipes from "./src/components/Recipes";
import AddRecipes from "./src/components/AddRecipes";
import FavRecipes from "./src/components/FavRecipes";
import EditRecipes from "./src/components/EditRecipes";

const Stack = createNativeStackNavigator();

export default function App() {
  const [recipe, setRecipe] = useState();
  const [recipes, setRecipes] = useState([]);
  const [date, setDate] = useState(new Date().toUTCString());
  const [moveToBin, setMoveToBin] = useState([]);

  function handleRecipe() {
    let newRecipe = recipe;
    let newRecipes = [newRecipe, ...recipes];
    setRecipes(newRecipes);
    setRecipe("");
  }

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
