import AsyncStorage from '@react-native-async-storage/async-storage'
import React from "react"

// Store Total Levels Solved
const getSolved = async () => {
  try {
    const l = await AsyncStorage.getItem('solved')
    return l
  } catch(error) {
    console.log('error', error)
  }
}

const setSolved = async (solve: string) => {
  try {
    await AsyncStorage.setItem('solved', `${solve}`)
  } catch(error) {
    console.log('error', error)
  }
}

const useSolved = () => {
  const [solved, setIsSolved] = React.useState('0')
  React.useEffect(() => {
    getSolved()
    .then(res => {
      if (typeof res === 'string') {
        setIsSolved(String(parseInt(res)))
      }
    })
    .catch(err => {
      console.log('error', err)
    })
  }, [])
  
  const solvedUp = () => {
    setIsSolved(String(parseInt(solved) + 1))
    setSolved(String(parseInt(solved) + 1))
  }

  return { solved, solvedUp }
}

export default useSolved
