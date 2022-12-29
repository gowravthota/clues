import AsyncStorage from '@react-native-async-storage/async-storage'
import React from "react"

// Store Level
const getLevel = async () => {
  try {
    const l = await AsyncStorage.getItem('lvl')
    return l
  } catch(error) {
    console.log('error', error)
  }
}

const setLevel = async (level: string) => {
  try {
    await AsyncStorage.setItem('lvl', `${level}`)
  } catch(error) {
    console.log('error', error)
  }
}

const useLevel = () => {
  const [level, setIsLevel] = React.useState('1')
  React.useEffect(() => {
    getLevel()
    .then(res => {
      if (typeof res === 'string') {
        setIsLevel(String(parseInt(res)))
      }
    })
    .catch(err => {
      console.log('error', err)
    })
  }, [])
  
  const levelUp = (num: number) => {
    setIsLevel(String(num))
    setLevel(String(num))
  }

  return { level, levelUp }
}

export default useLevel