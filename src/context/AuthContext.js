import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail 
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove, 
  onSnapshot 
} from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, username) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: username });
    
    await setDoc(doc(db, "users", userCredential.user.uid), {
      likedCities: [] 
    });
    
    setCurrentUser({ ...userCredential.user, displayName: username });
  };
  
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const toggleCityLike = async (cityName) => {
    if (!currentUser) return;
    const userRef = doc(db, "users", currentUser.uid);
    
    const isLiked = userData?.likedCities?.includes(cityName);

    if (isLiked) {
      await updateDoc(userRef, {
        likedCities: arrayRemove(cityName)
      });
    } else {
      await updateDoc(userRef, {
        likedCities: arrayUnion(cityName)
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      const unsub = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
            setDoc(userRef, { likedCities: [] });
        }
      });
      return unsub;
    } else {
      setUserData(null);
    }
  }, [currentUser]);

  const value = {
    currentUser,
    userData, 
    signup,
    login,
    logout,
    resetPassword,
    toggleCityLike
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};