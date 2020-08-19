import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { Colors } from "../../consts/colors";
import { sortValues } from "../../consts/sort_values";

import filterHook from "../../hooks/filter.hook";

import Picker from "../../components/picker";
import Debate from "../../components/profile_debate";

export default function Debates() {
  const { useFilterState, setSort } = filterHook();
  const { sortSelection } = useFilterState();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Debates</Text>

      <Picker
        selectedValue={sortSelection}
        onValueChange={(e) => setSort(e)}
        data={sortValues}
      />

      <FlatList
        style={styles.debates}
        showsVerticalScrollIndicator={false}
        data={null}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Debate itemData={item} />}
        ListFooterComponent={<View style={{ marginBottom: 16 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 4,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
  },
  debates: {
    borderTopColor: Colors.lightGrey,
    borderTopWidth: 1,
  },
});
