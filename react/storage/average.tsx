import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react"

const getScore = async () => {
  try {
    const l = await AsyncStorage.getItem('total');
    return l;
  } catch(error) {
    console.log('error', error);
  };
};

const setScore = async (num: string) => {
  try {
    await AsyncStorage.setItem('total', `${num}`);
  } catch(error) {
    console.log('error', error);
  };
};

const useTotal = () => {
  const [total, setIsScore] = React.useState('0');
  
  React.useEffect(() => {
    getScore()
    .then(res => {
      if (typeof res === 'string') {
        setIsScore(String(parseInt(res)));
      }
    })
    .catch(err => {
      console.log('error', err);
    });
  }, []);

  const addScore = (num: number) => {
    setIsScore(String(parseInt(total) + num));
    setScore(String(parseInt(total) + num))
  };

  return { total, addScore };
};
export default useTotal;