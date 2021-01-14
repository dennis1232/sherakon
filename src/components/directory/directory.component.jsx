import React from 'react'
import MenuItem from './../menu-item/menu-item.component';

import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from './../../redux/directory/directory.selectors';
import { connect } from 'react-redux';

import './directory.style.scss'

const Directory = ({sections}) => (
  <div className="directory-menu">
    {sections.map(({ id, ...props }) => (
      <MenuItem key={id} {...props}></MenuItem>
      ))}
  </div>
)
 const mapStateToProps =createStructuredSelector({
  sections:selectDirectorySections
})
export default connect(mapStateToProps)(Directory)
