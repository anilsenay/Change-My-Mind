import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Collapsible from "react-native-collapsible";

import { Colors } from "../../consts/colors";
import { sortValues } from "../../consts/sort_values";

import Picker from "../../components/picker";

import filterHook from "../../hooks/filter.hook";

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
  const { useFilterState, setSort, updateCategory } = filterHook();
  const { categories, sortSelection } = useFilterState();

  return (
    <Collapsible collapsed={hideFilter}>
      <View style={styles.container}>
        <FlatList
          horizontal
          style={styles.scrollStyle}
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <FilterItem
              text={item.name}
              selected={item.isSelected}
              onPress={() => updateCategory(item.name)}
            />
          )}
          ListFooterComponent={<View style={{ marginLeft: 16 }} />}
        />
        <Picker
          selectedValue={sortSelection}
          onValueChange={(e) => setSort(e)}
          data={sortValues}
        />
      </View>
    </Collapsible>
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
