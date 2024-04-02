import { getApp } from 'firebase/app';
import { getFirestore, doc,getDoc, getDocs, collection, query, where } from "firebase/firestore";

const app = getApp();
const db = getFirestore(app);

export const getByUsernameFromFirestore = async (username: string) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'users'), where('username', '==', username))
      );
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        // You can access the document data here
      });
    } catch (error) {
      console.error('Error getting documents:', error);
    }
  };
  
  export const getByEmailFromFirestore = async (email: string) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'users'), where('email', '==', email))
      );
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        // You can access the document data here
      });
    } catch (error) {
      console.error('Error getting documents:', error);
    }
  };
  

 export const checkUsernameExists = async (username: string) => {
    try {
      const userRef = doc(db, 'users', username);
      const userSnapshot = await getDoc(userRef);
      alert("Nothing wrogn")
      return userSnapshot.exists();
    } catch (error) {
      alert("Something wrogn")
      console.error("Error checking username existence:", error);
      throw error;
    }
  };
