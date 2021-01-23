import { takeLatest, call, put, all } from 'redux-saga/effects';
import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapShotToMap } from './../../firebase/firebase.utils';
import { fetchCollectionsFailure, fetchCollectionsSuccess } from './shop.actions';


export function* fetchCollectionsAsync() {
    yield console.log('I am fired');
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get()
        const collectionsMap = yield call(convertCollectionsSnapShotToMap, snapshot)
        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch (err) {
        yield put(fetchCollectionsFailure(err.msg))
    }
}



export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
}

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)])
}

