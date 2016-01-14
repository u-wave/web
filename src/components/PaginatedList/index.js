import React, { Component, PropTypes } from 'react';
import List from 'react-list';

const LOAD_MARGIN = 5;

export default class PaginatedList extends Component {
  static propTypes = {
    length: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    pageSize: PropTypes.number,
    items: PropTypes.array,

    onRequestPage: PropTypes.func
  };

  static defaultProps = {
    pageSize: 25
  };

  componentWillMount() {
    this.handleScrollB = ::this.handleScroll;
  }

  handleScroll(e) {
    const { itemHeight, pageSize, items, length, onRequestPage } = this.props;
    const scroller = e.target;

    const topScroll = scroller.scrollTop;
    const bottomScroll = topScroll + scroller.offsetHeight;

    let topItem = Math.floor(topScroll / itemHeight) - LOAD_MARGIN;
    let bottomItem = Math.ceil(bottomScroll / itemHeight) + LOAD_MARGIN;
    if (topItem < 0) topItem = 0;
    if (bottomItem >= length) bottomItem = length - 1;

    const almostVisibleItems = items.slice(topItem, bottomItem);

    const unloadedPages = almostVisibleItems.reduce((pages, item, idx) => {
      if (!item) {
        const p = Math.floor((idx + topItem) / pageSize);
        return pages.indexOf(p) > -1 ? pages : [ ...pages, p ];
      }
      return pages;
    }, []);

    unloadedPages.forEach(page =>
      onRequestPage(page)
    );
  }

  addScrollListener(list) {
    if (!list) return;
    const scroller = list.getScrollParent();
    scroller.removeEventListener('scroll', this.handleScrollB);
    if (this.props.onRequestPage) {
      scroller.addEventListener('scroll', this.handleScrollB);
    }
  }

  render() {
    return (
      <List
        ref={::this.addScrollListener}
        {...this.props}
      />
    );
  }
}
