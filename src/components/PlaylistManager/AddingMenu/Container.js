import React, { Component } from 'react';
import { connect } from 'react-redux';
import naturalCmp from 'natural-compare';
import values from 'object-values';

import AddingMenu from './';

const byName = (a, b) => naturalCmp(a.name.toLowerCase(), b.name.toLowerCase());

const mapStateToProps = state => ({
  playlists: values(state.playlists.playlists).sort(byName)
});

@connect(mapStateToProps)
export default class AddingMenuContainer extends Component {
  render() {
    return <AddingMenu {...this.props} />;
  }
}
