import React from "react"
import { ScrollView, View, TouchableOpacity, Text } from "react-native"
import styles from "./Style"
import useLevel from './storage/level';
import useSolved from "./storage/solved";
import useStaged from "./storage/staged";
import useStage from "./storage/stage"

export default function Blocks({ navigation }: any) {  
  // Level
  const { levelUp } = useLevel();
  // Solved
  const { solved } = useSolved();
  // Stage
  const { stage } = useStage()
  const { staged } = useStaged()
  // Total score
  //const { total } = useTotal()

  const navigateAndUpdate = (index: number) => {
    levelUp(index + 1);
    navigation.navigate("Main", { stagerefresh: stage });
  }

  //convert to stars
  // function convertRatingToStars(rating: number): string {
  //   const maxRating = 5
  //   let numFilledStars = Math.floor(rating / maxRating * 5)
  //   let numEmptyStars = maxRating - numFilledStars
  //   let halfStar = ""
  //   if (rating % 1 >= 0.5) {
  //     halfStar =  "✫"
  //     numEmptyStars--
  //   }
  //   return `${'★'.repeat(numFilledStars)}${halfStar}${'✩'.repeat(numEmptyStars)}`
  // }

  return (
    <ScrollView style={{backgroundColor: 'black'}}>

      <View style={{ flex: 0.05, flexDirection: 'row', marginBottom: 20 }}>
        <TouchableOpacity onPress={() => {{navigation.navigate('Start')}}}>
          <View style={styles.backButton}>
            <Text style={styles.backSymbol}>{"☜"}</Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.scoreContainer, {borderColor: 'white'}]}>
          <Text style={styles.star}>{solved + ":100"}</Text>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, justifyContent: "center", alignItems: "center" }}>
          {[...Array(100)].map((_, index) => {
            const isT = staged.charAt(index) === 't'
            const isActive = stage.charAt(index) !== '0'
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigateAndUpdate(index);
                }}
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: isT ? "green" : (isActive ? "blue" : "white"),
                  borderRadius: 10,
                  margin: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  marginLeft: 5,
                  marginRight: 5,
                }}>
                <Text style={{
                  backgroundColor: isT ? "green" : (isActive ? "blue" : "white"),
                  padding: 11,
                  borderRadius: 20,
                  fontWeight: "800",
                  fontSize: 15,
                }}>
                {index + 1}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

    </ScrollView>
  )
}

