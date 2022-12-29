import AsyncStorage from '@react-native-async-storage/async-storage'
import React from "react"

// Map out stage
const getStage = async () => {
  try {
    const l = await AsyncStorage.getItem('stage')
    return l
  } catch(error) {
    console.log('error', error)
  }
}

const setStage= async (stage: string) => {
  try {
    await AsyncStorage.setItem('stage', `${stage}`)
  } catch(error) {
    console.log('error', error)
  }
}

// cheap way of saving
const useStage = () => {
  const [stage, setIsStage] = React.useState("0".repeat(100))
  React.useEffect(() => {
    getStage()
    .then(res => {
      if (typeof res === 'string') {
        setIsStage(res)
      }
    })
    .catch(err => {
      console.log('error', err)
    })
  }, [])
  
  // take in level and update stage
  const updateStage = (num: number, count: number) => {
    const temp = stage.substring(0, num - 1) + String(count) + stage.substring(num)
    setIsStage(temp)
    setStage(temp)
  }

  return { stage, updateStage, setStage}
}

export default useStage
