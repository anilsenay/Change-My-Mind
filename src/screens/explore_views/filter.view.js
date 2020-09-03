import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { Colors } from "../../consts/colors";
import { categories } from "../../consts/filter_categories";

const FilterItem = ({ text, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.itemContainer, selected ? styles.selected : {}]}
      onPress={onPress}
    >
      <Text style={styles.symbolText}>{selected ? "✓" : "+"}</Text>
      <Text style={styles.itemText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default function Filter({ hideFilter }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortSelection, setSortSelection] = useState("started-new-to-old");

  // const { getAllDebates } = debatesHook();

  // const sortEvent = (order) => {
  //   getAllDebates(order);
  //   setSort(order);
  // };

  const categoriesWithAll = [{ name: "All" }, ...categories];

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        style={styles.scrollStyle}
        showsHorizontalScrollIndicator={false}
        data={categoriesWithAll}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <FilterItem
            text={item.name}
            selected={item.name === selectedCategory}
            onPress={() => setSelectedCategory(item.name)}
          />
        )}
        ListFooterComponent={<View style={{ marginLeft: 16 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGrey,
    marginBottom: 8,
  },
  scrollStyle: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 40,
    borderWidth: 1,
    backgroundColor: Colors.purple + "33",
    borderColor: Colors.purple + "44",
    paddingHorizontal: 16,
    marginRight: 16,
  },
  selected: {
    backgroundColor: Colors.purple + "99",
  },
  itemText: {
    textTransform: "uppercase",
    color: "white",
    fontWeight: "bold",
  },
  symbolText: {
    fontSize: 16,
    marginRight: 8,
    fontWeight: "bold",
    color: "white",
  },
});
