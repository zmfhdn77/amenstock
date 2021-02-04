import AsyncStorage from "@react-native-community/async-storage";

const isEmpty = function (value) {
    if (value === '' || value === null || value === undefined || (value !== null && typeof value === 'object' && !Object.keys(value).length)) {
      return true;
    } else {
      return false;
    }
  };
  
  // AsyncStorage get 함수 모듈
  export const getItemFromAsync = (storageName) => {
    if (isEmpty(storageName)) {
      throw Error('Storage Name is empty');
    }
    
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(storageName, (err, result) => {
        if (err) {
          reject(err);
        }
        
        if (result === null) {
          resolve(null);
        }
        
        resolve(JSON.parse(result));
      });
    });
  };
  
  // AsyncStorage set 함수 모듈
  export const setItemToAsync = (storageName, item) => {
    if (isEmpty(storageName)) {
      throw Error('Storage Name is empty');
    }

    return new Promise((resolve, reject) => {
      AsyncStorage.setItem(storageName, JSON.stringify(item), (error) => {
        if (error) {
          reject(error);
        }
        
        resolve('입력 성공');
      });
    });
  };

export function getDummy() {
  const fakeData = {
    totalMoney : 10000,
    data : 
    [
        {
            name : "삼성전자",
            roundCount : 2,
            round : 
            [
                {
                    firstBuy: 60,
                    secondBuy: 50,
                    firstChecked: true,
                    secondChecked: true,
                    firstSell : 100,
                    secondSell : 20
                },
                {
                    firstBuy : 120,
                    secondBuy : 0,
                    firstChecked: true,
                    secondChecked: false,
                    firstSell : 50,
                    secondSell : 0
                }
            ]
        }
    ]
  }
  
  return fakeData;
}