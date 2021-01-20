import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyCKpkdqG0YvUU5Ni1xlc-APIrIQQ6OOA5Y",
    authDomain: "crwn-db-d5a49.firebaseapp.com",
    projectId: "crwn-db-d5a49",
    storageBucket: "crwn-db-d5a49.appspot.com",
    messagingSenderId: "395558420039",
    appId: "1:395558420039:web:395da296f7b68486befb62",
    measurementId: "G-R67E447BSM"
};

export const creatUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (err) {
            console.log('error creating user', err.massage);

        }
    }
    return userRef
}
export const addCollectionAndDoc = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj)
    });
   return await batch.commit()
}

export const convertCollectionsSnapShotToMap=(collections)=>{
     const transformedCollection = collections.docs.map(doc=>{
         const {title,items }=doc.data()
         return{
             routeName:encodeURI(title.toLowerCase()),
             id:doc.id,
             title,
             items
         }
     })
    return transformedCollection.reduce((acc,collection)=>{
         acc[collection.title.toLowerCase()]=collection;
         return acc
     },{})
     
}


firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();



const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase