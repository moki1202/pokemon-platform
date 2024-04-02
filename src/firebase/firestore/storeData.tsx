import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { getApp } from 'firebase/app';
import {app} from '@/src/firebase/config' 

const db = getFirestore(app);

// Function to store username in Firestore
const storeInFirestore = async (user: User, username: string, email: string) => {
  try {
    // Store username in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      username: username,
      email: email,
    });
    alert("Stored in firebase")
    console.log('Username stored successfully in Firestore');
  } catch (error) {
    alert(error);
  }
};

export default storeInFirestore;
