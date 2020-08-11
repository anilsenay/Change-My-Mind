import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Picker,
  FlatList,
} from "react-native";

import { Colors } from "../../consts/colors";

import Collapsible from "react-native-collapsible";

import BackIcon from "../../components/icons/back";

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

const sortValues = [
  { label: "Started: New to Old", value: "started-new-to-old" },
  { label: "Started: Old to New", value: "started-old-to-new" },
  { label: "Updated: New to Old", value: "updated-new-to-old" },
  { label: "Updated: Old to New", value: "updated-old-to-new" },
  { label: "Votes: Most to Least", value: "votes-most-to-least" },
  { label: "Votes: Least to Most", value: "votes-least-to-most" },
  { label: "Popular: Most to Least", value: "popular-most-to-least" },
  { label: "Popular: Least to Most", value: "popular-lest-to-most" },
];

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
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sortSelection}
            style={styles.pickerStyle}
            onValueChange={(e) => setSort(e)}
          >
            {sortValues.map((item) => {
              return (
                <Picker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  color={Colors.grey}
                />
              );
            })}
          </Picker>
          <BackIcon
            width={20}
            height={20}
            fill={Colors.grey}
            style={styles.pickerIcon}
          />
        </View>
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
  pickerContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: Colors.grey + "88",
    flexDirection: "row",
    alignItems: "center",
  },
  pickerStyle: {
    height: 36,
    width: "100%",
    backgroundColor: Colors.purple + "11",
  },
  pickerIcon: {
    position: "absolute",
    right: 16,
    transform: [{ rotateZ: "270deg" }],
  },
});
