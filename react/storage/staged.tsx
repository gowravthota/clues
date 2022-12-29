import AsyncStorage from '@react-native-async-storage/async-storage'
import React from "react"

// Map out stage
const getStaged = async () => {
  try {
    const l = await AsyncStorage.getItem('staged')
    return l
  } catch(error) {
    console.log('error', error)
  }
}

const setStaged = async (staged: string) => {
  try {
    await AsyncStorage.setItem('staged', `${staged}`)
  } catch(error) {
    console.log('error', error)
  }
}

// cheap way of saving
const useStaged = () => {
  const [staged, setIsStaged] = React.useState("f".repeat(100))
  React.useEffect(() => {
    getStaged()
    .then(res => {
      if (typeof res === 'string') {
        setIsStaged(res)
      }
    })
    .catch(err => {
      console.log('error', err)
    })
  }, [])
  
  // take in level and update stage
  const updateStaged = (num: number) => {
    if (num != -1) {
      const temp = staged.substring(0, num - 1) + "t" + staged.substring(num)
      setIsStaged(temp)
      setStaged(temp)
    }
  }

  return { staged, updateStaged}
}

export default useStaged
