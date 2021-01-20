import React from 'react'
import { Route } from 'react-router-dom';

import CollectionOverview from './../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
import { firestore, convertCollectionsSnapShotToMap } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { updateCollections } from './../../redux/shop/shop.actions';
import WithSpinner from './../../components/with-spinner/with-spinner.component';
const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)
class ShopPage extends React.Component {

    unsubscribeFromSnapshot = null
  state ={
      loading:true
    }
  
    componentDidMount() {
        const { updateCollections } = this.props
        const collectionRef = firestore.collection('collections');
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionMap = convertCollectionsSnapShotToMap(snapshot)
            updateCollections(collectionMap)
            this.setState({loading:false})
        })
    }


    render() {
        const { match } = this.props;
        const {loading} = this.state 
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props)=><CollectionOverviewWithSpinner isLoading={loading} {...props}/>} />
                <Route path={`${match.path}/:collectionId`} 
                render={(props)=><CollectionPageWithSpinner isLoading={loading} {...props}/>}
                 />
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage)