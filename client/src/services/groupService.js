import {
  collection,
  addDoc,
  Timestamp,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase";

export const addGroupToUser = async (uid, groupId) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    groups: arrayUnion(groupId),
  });
};

export const createGroup = async (name, ownerUid) => {
  try {
    const docRef = await addDoc(collection(db, "groups"), {
      name,
      owner: ownerUid,
      members: [ownerUid],
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error al crear el grupo:", error);
    throw error;
  }
};
