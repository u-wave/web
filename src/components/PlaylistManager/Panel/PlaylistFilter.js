import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@u-wave/react-translate';
import debounce from 'lodash/debounce';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/Search';

const enhance = translate();

class PlaylistFilter extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
  };

  state = {
    isOpen: false,
    value: '',
  };

  onFilter = debounce((value) => {
    const { onFilter } = this.props;

    onFilter(value);
  }, 200);

  handleClick = () => {
    const { isOpen: shouldClose } = this.state;
    const shouldOpen = !shouldClose;

    if (shouldClose) {
      this.clearFilter();
    }

    this.setState({
      isOpen: shouldOpen,
      value: '',
    }, () => {
      if (shouldOpen) {
        this.input.focus();
      }
    });
  };

  handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      this.setState(({ value }) => {
        // Clear input value if there is text.
        if (value) return { value: '' };
        // else close the input.
        return { value: '', isOpen: false };
      });
    }
  };

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({ value });
    this.onFilter(value);
  };

  refInput = (input) => {
    this.input = input;
  };

  clearFilter() {
    const { onFilter } = this.props;
    const { value } = this.state;

    if (value !== '') {
      onFilter('');
    }
  }

  render() {
    const { t } = this.props;
    const { isOpen, value } = this.state;

    return (
      <div className="PlaylistMediaFilter">
        <Tooltip title={t('playlists.filter')} placement="top">
          <IconButton
            className="PlaylistMeta-iconButton"
            onClick={this.handleClick}
          >
            <FilterIcon htmlColor={isOpen ? '#fff' : null} />
          </IconButton>
        </Tooltip>
        <input
          type="text"
          ref={this.refInput}
          className={cx('PlaylistMediaFilter-input', isOpen && 'is-open')}
          value={value}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default enhance(PlaylistFilter);
