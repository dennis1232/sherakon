import ShopActionTypes from './shop.types';


import { firestore,convertCollectionsSnapShotToMap } from './../../firebase/firebase.utils';




export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
})
export const fetchCollectionsSuccess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errMsg =>({
    type:ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload:errMsg
})


export const fetchCollectionsStartAsync = () => {
    return dispatch => {

        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());

        collectionRef.get().then(snapshot => {
            const collectionMap = convertCollectionsSnapShotToMap(snapshot)
            dispatch(fetchCollectionsSuccess(collectionMap))
        }).catch(err=>dispatch(fetchCollectionsFailure(err.message)))
    }

}



