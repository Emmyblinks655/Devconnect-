/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getDocFromServer,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Connection test as required by firebase integration
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or initializing.');
    }
  }
}
testConnection();

export interface DevUserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isSeller: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Google Sign In
export async function signInWithGoogleAuth(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // Sync profile document in Firestore
  try {
    const userDocRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userDocRef);
    if (!snap.exists()) {
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || user.email?.split('@')[0] || 'Developer',
        photoURL: user.photoURL || '',
        isSeller: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.error('Failed to sync user document:', err);
  }

  return user;
}

// Email & Password Sign Up
export async function registerWithEmail(email: string, pass: string, name: string): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, pass);
  const user = result.user;

  if (name.trim()) {
    try {
      await updateProfile(user, { displayName: name.trim() });
    } catch {
      // Ignore profile update error
    }
  }

  try {
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email || '',
      displayName: name.trim() || user.email?.split('@')[0] || 'Developer',
      photoURL: user.photoURL || '',
      isSeller: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Failed to set user document:', err);
  }

  return user;
}

// Email & Password Sign In
export async function loginWithEmail(email: string, pass: string): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, pass);
  return result.user;
}

// Sign Out
export async function logOutUser(): Promise<void> {
  await signOut(auth);
}

// Fetch user profile from Firestore or fallback
export async function fetchUserProfile(uid: string): Promise<DevUserProfile | null> {
  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data() as DevUserProfile;
    }
  } catch (err) {
    console.error('Error fetching profile:', err);
  }
  return null;
}

// Toggle seller status
export async function setSellerPrivilege(uid: string, isSeller: boolean): Promise<void> {
  try {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      isSeller,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Error updating seller status:', err);
  }
}

export { onAuthStateChanged };
