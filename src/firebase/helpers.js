import firestore from '@react-native-firebase/firestore';

export const getAllDataFromDb = async collectionName => {
  return await firestore()
    .collection(collectionName)
    .get()
    .then(snapshot => {
      const newData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      return newData;
    });
};
