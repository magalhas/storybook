import PropTypes from 'prop-types';
import React, { Component } from 'react';
import pick from 'lodash.pick';
import Header from './header';
import Stories from './stories_tree';
import TextFilter from './text_filter';

const scrollStyle = {
  height: 'calc(100vh - 105px)',
  marginTop: 10,
  overflow: 'auto',
};

const mainStyle = {
  padding: '10px 0 10px 10px',
};

const storyProps = [
  'storiesHierarchy',
  'selectedKind',
  'selectedHierarchy',
  'selectedStory',
  'onSelectStory',
  'storyFilter',
  'sidebarAnimations',
];

// eslint-disable-next-line react/prefer-stateless-function
class LeftPanel extends Component {
  render() {
    const {
      name,
      onStoryFilter,
      openShortcutsHelp,
      storiesHierarchy,
      storyFilter,
      url,
    } = this.props;

    return (
      <div style={mainStyle}>
        <Header name={name} url={url} openShortcutsHelp={openShortcutsHelp} />
        <TextFilter
          text={storyFilter}
          onClear={() => onStoryFilter('')}
          onChange={text => onStoryFilter(text)}
        />
        <div style={scrollStyle}>
          {storiesHierarchy ? <Stories {...pick(this.props, storyProps)} /> : null}
        </div>
      </div>
    );
  }
}

LeftPanel.defaultProps = {
  storiesHierarchy: null,
  storyFilter: null,
  onStoryFilter: () => {},
  openShortcutsHelp: null,
  name: '',
  url: '',
};

LeftPanel.propTypes = {
  storiesHierarchy: PropTypes.shape({
    namespaces: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    map: PropTypes.object,
  }),
  storyFilter: PropTypes.string,
  onStoryFilter: PropTypes.func,

  openShortcutsHelp: PropTypes.func,
  name: PropTypes.string,
  url: PropTypes.string,
};

export default LeftPanel;
