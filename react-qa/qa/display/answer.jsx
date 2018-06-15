import React from 'react';
import PropTypes from 'prop-types';
import * as Showdown from "showdown";
import ReactMde from "react-mde";
import "./answer.scss";

export class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.converter = new Showdown.Converter({tables: false, simplifiedAutoLink: true});
    this.state = Answer.getDerivedStateFromProps(props, {});
    this.events = {
      onChangeBody: (e) => this.onChangeBody(e),
      onChangeTitle: (e) => this.onChangeTitle(e)
    };
  }

  onChangeBody(mdeState) {
    this.setState({mdeState});
  }

  onChangeTitle(event) {
    this.setState({title: event.target.value});
  }

  static getDerivedStateFromProps(props, state) {
    props = props || {};
    if (!state.id) {
      return {
        id: props.answerId,
        title: props.title,
        mdeState: {
          markdown: props.body
        }
      };
    }
    return null;
  }

  render() {
    return <React.Fragment>
      <div className="component--Answer">
        {this.props.edit ? this.renderEdit() : ""}
        {this.props.edit ? "" : this.renderView()}
      </div>
    </React.Fragment>;
  }

  renderEdit() {
    return <div className="edit">
      <input value={this.state.title} onChange={this.events.onChangeTitle}/>
      <div className="mde">
        {this.props.test ? "" : <ReactMde
          onChange={this.events.onChangeBody}
          editorState={this.state.mdeState}
          layout="tabbed"
          generateMarkdownPreview={(markdown) => Promise.resolve(this.converter.makeHtml(markdown))}/>}
      </div>
    </div>;
  }

  renderView() {
    let rendered = this.converter.makeHtml(this.props.body);
    return <div>
      <h1>{this.state.title}</h1>
      {this.props.test ? "" : <div dangerouslySetInnerHTML={{__html: rendered}}/>}
    </div>;
  }
}

Answer.propTypes = {
  // Is this question in edit mode?
  edit: PropTypes.bool,

  // The id of this question
  answerId: PropTypes.string.isRequired,

  // What is the raw title of this question?
  title: PropTypes.string.isRequired,

  // What is the raw markdown for this question?
  body: PropTypes.string.isRequired,

  // Special rendering for test runs
  test: PropTypes.bool,
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