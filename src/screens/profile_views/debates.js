import React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";

import { Colors } from "../../consts/colors";
import { sortValues } from "../../consts/sort_values";

import filterHook from "../../hooks/filter.hook";

import Picker from "../../components/picker";
import Debate from "../../components/profile_debate";
import VsView from "../../components/vs_view";

import { getDebates } from "../../hooks/debate.hooks";

export default function Debates({ debates }) {
  const { useFilterState, setSort } = filterHook();
  const { sortSelection } = useFilterState();

  const { data } = debates.length > 0 ? getDebates(debates) : [];
  console.log(data);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Debates</Text>

      <Picker
        selectedValue={sortSelection}
        onValueChange={(e) => setSort(e)}
        data={sortValues}
      />
      <ScrollView style={styles.debates} showsVerticalScrollIndicator={false}>
        {data?.map((item) => {
          return <Debate key={item.id.toString()} itemData={item} />;
        })}
      </ScrollView>
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
    marginBottom: 10,
  },
});
