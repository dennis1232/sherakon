import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CollectionPreview from './../preview-collection/preview-collection.component';
import { selectCollectionsForPreview } from './../../redux/shop/shop.selectors';
import './collection-overview.style.scss'
const CollectionOverview = ({ collections }) => (
    <div className='collections-overview'>
        {
            collections.map(({ id, ...otherCollectionProps }) => (
                <CollectionPreview key={id} {...otherCollectionProps}></CollectionPreview>
            ))
        }
    </div>

)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})
export default connect(mapStateToProps)(CollectionOverview)