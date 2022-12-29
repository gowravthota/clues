import React from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import styles from './Style'
import BackgroundAnimation from "./Anim"
import { StatusBar } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import useStage from "./storage/stage"

function StartScreen({ navigation, route }: any) {
  const { stagerefresh } = route?.params || {}
  const { stage, setStage } = useStage()
  const currentStage = stagerefresh ? stagerefresh : stage

  //clear data modal
  const [modalVisible1, setModalVisible1] = React.useState(false)
  const showModal1 = () => {
    setModalVisible1(true)
  }
  const hideModal1 = () => {
    setModalVisible1(false)
  }

  //guide modal
  const [modalVisible2, setModalVisible2] = React.useState(false)
  const showModal2 = () => {
    setModalVisible2(true)
  }
  const hideModal2 = () => {
    setModalVisible2(false)
  }

  // clear data
  const clearAsync = async () => {
    await AsyncStorage.clear()
    setStage("0".repeat(100))
    hideModal1()
  }

  React.useEffect(() => {
    const getCurrentStage = async () => {
      try {
        const current = await AsyncStorage.getItem('stage') || ""
        setStage(current)
      } catch(error) {
        console.log('error', error)
      }
    }
    getCurrentStage()
  }, [currentStage])

  return (
    <View style={styles.start}>
      <StatusBar backgroundColor="black" />
      <BackgroundAnimation></BackgroundAnimation>
      <Text style={styles.title}>{ "✐  CLUES  ✄"}</Text>

      <TouchableOpacity onPress={() => { navigation.navigate("Main", { stagerefresh: currentStage })}}>
        <View style={styles.menu}>
          <Text style={[styles.menuButtons, {  borderColor: 'green',  borderWidth: 2, color: 'white'}]}>PLAY ☞</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { navigation.navigate('Select')}}>
        <View style={styles.menu}>
          <Text style={[styles.menuButtons, {  borderColor: 'blue',  borderWidth: 2, color: 'white'}]}>LEVELS ☝︎</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={ showModal2 }>
        <View style={styles.menu}>
          <Text style={[styles.menuButtons, {  borderColor: 'purple',  borderWidth: 2, color: 'white'}]}>GUIDE ✌︎</Text>
        </View>
      </TouchableOpacity>

      <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
        <Text style={{ color: 'white', fontSize: 10 }}>1.0.1</Text>
      </View>

      <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
        <TouchableOpacity onPress={showModal1}>
          <Text style={{ color: 'white', fontSize: 40 }}>✍︎</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={hideModal1}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', backgroundColor: 'black', padding: 20, borderRadius: 20, borderColor: 'red', borderWidth: 2,  }}>
            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>
              Are you sure you want to reset your progress?
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={clearAsync}>
                <Text style={{ color: 'white', marginTop: 20, marginRight: 20, fontSize: 20, }}>YES</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={hideModal1}>
                <Text style={{ color: 'white', marginTop: 20, marginLeft: 10, fontSize: 20, }}>NO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={hideModal2}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', backgroundColor: 'black', padding: 20, borderRadius: 20, borderColor: 'purple', borderWidth: 2, }}>
            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', marginBottom: 30, }}>
              Welcome to Clues!
            </Text>
            <Text style={{ color: 'white', fontSize: 15, textAlign: "left", marginBottom: 10, }}>
              ➣ 🆂🅺🆈 Guess the correct word with the given clues. Each clue describes or relates to the correct word.
            </Text>
            <Text style={{ color: 'white', fontSize: 15, textAlign: "left", marginBottom: 10, }}>
              ➣ ☞ blue ☜ The first clue is always visible and for every wrong guess another clue pops up!
            </Text>
            <Text style={{ color: 'white', fontSize: 15, textAlign: "left" }}>
              ➣ Levels can be redone when completed, but levels in progress will be saved at the most recent clue!
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={hideModal2}>
                <Text style={{ color: 'white', marginTop: 20, marginRight: 20, fontSize: 40, }}>☞</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  )
}

export default StartScreen