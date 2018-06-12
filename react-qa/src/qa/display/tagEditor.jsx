import React from 'react';
import PropTypes from 'prop-types';
import "./tagEditor.scss";
import {TagList} from "./tagList";
import Autocomplete from 'react-autocomplete';

export class TagEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
      canAddTag: false
    };
    this.events = {
      onClickTag: this.noOp,
      onRemoveTag: (tag) => this.onRemoveTag(tag),
      onUpdatePartialValue: (e) => this.onUpdatePartialValue(e),
      onSelectedSuggestion: (e) => this.onSelectedSuggestion(e)
    };
  }

  noOp() {
  }

  onRemoveTag(tag) {
    const newTags = this.props.tags.filter(i => i.toLocaleLowerCase() !== tag.toLocaleLowerCase());
    this.props.onChangeTags(newTags);
  }

  onUpdatePartialValue(event) {
    this.setState({value: event.target.value});
    this.props.onSuggestTags(event.target.value).then((suggestions) => {
      this.setState({
        suggestions: suggestions
      });
    });
  }

  onSelectedSuggestion(value) {
    const canAdd = this.props.tags.find(i => i.toLocaleLowerCase() === value.toLocaleLowerCase()) == null;
    if (canAdd) {
      const tags = this.props.tags.slice(0);
      tags.push(value);
      this.props.onChangeTags(tags);
    }
    this.setState({
      value: '',
      suggestions: [],
    });
  }

  render() {
    return <div className="component--TagEditor">
      <TagList tags={this.props.tags}
               edit={true}
               onClickTag={this.events.onClickTag}
               onRemoveTag={this.events.onRemoveTag}/>
      <Autocomplete
        items={this.state.suggestions}
        shouldItemRender={() => true}
        getItemValue={item => item}
        renderItem={TagEditor.renderDropdownItem}
        value={this.state.value}
        onChange={this.events.onUpdatePartialValue}
        onSelect={this.events.onSelectedSuggestion}
      />
    </div>;
  }

  static renderDropdownItem(item, highlighted) {
    const classes = ['suggestion'];
    if (highlighted) {
      classes.push('selected');
    }
    return (<div className={classes.join(' ')} key={item}>
      {item}
    </div>);
  }
}

TagEditor.propTypes = {
  // An array of tags as strings
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,

  // Get suggestions for partial tag input
  onSuggestTags: PropTypes.func.isRequired,

  // Update the list of tags bound to this instance
  onChangeTags: PropTypes.func.isRequired,
};

/*Template.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Anything that can be rendered: numbers, strings, elements or an array
  // (or fragment) containing these types.
  optionalNode: PropTypes.node,

  // A React element.
  optionalElement: PropTypes.element,

  // You can also declare that a prop is an instance of a class. This uses
  // JS's instanceof operator.
  optionalMessage: PropTypes.instanceOf(TemplateProp),

  // You can ensure that your prop is limited to specific values by treating
  // it as an enum.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(TemplateProp)
  ]),

  // An array of a certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // An object with property values of a certain type
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // An object taking on a particular shape
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.
  requiredFunc: PropTypes.func.isRequired,

  // A value of any data type
  requiredAny: PropTypes.any.isRequired,
};*/