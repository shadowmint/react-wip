import React from 'react';
import PropTypes from 'prop-types';
import * as Showdown from "showdown";
import ReactMde from "react-mde";
import 'react-mde/lib/styles/scss/react-mde-all.scss';
import './question.scss';
import {TagList} from "./tagList";
import {TagEditor} from "./tagEditor";

export class Question extends React.Component {
  constructor(props) {
    super(props);
    this.converter = new Showdown.Converter({tables: false, simplifiedAutoLink: true});
    this.state = Question.getDerivedStateFromProps(props, {});
    this.events = {
      onChangeBody: (e) => this.onChangeBody(e),
      onChangeTitle: (e) => this.onChangeTitle(e),
      onClickTag: (tag) => this.onClickTag(tag),
      onChangeTags: (tags) => this.onChangeTags(tags),
    };
  }

  onChangeTags(tags) {
    alert(tags);
  }

  onChangeBody(mdeState) {
    this.setState({mdeState});
  }

  onChangeTitle(event) {
    this.setState({title: event.target.value});
  }

  onClickTag(tag) {
    if (this.props.tagHandler && this.props.tagHandler.onTagClicked) {
      try {
        this.props.tagHandler.onTagClicked(tag);
      } catch (error) {
        // Consume silently.s
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    props = props || {};
    if (!state.id || state.id !== props.questionId) {
      return {
        id: props.questionId,
        title: props.title,
        tags: props.tags,
        mdeState: {
          markdown: props.body
        }
      };
    }
    return null;
  }

  render() {
    return <React.Fragment>
      <div className="component--Question">
        {this.props.edit ? this.renderEdit() : ""}
        {this.props.edit ? "" : this.renderView()}
      </div>
    </React.Fragment>;
  }

  renderEdit() {
    return <div className="edit">
      <input value={this.state.title} onChange={this.events.onChangeTitle}/>
      <TagEditor tags={this.state.tags}
                 onSuggestTags={this.props.tagHandler.onTagSuggest}
                 onInventNewTag={this.props.tagHandler.onTagInventNew}
                 onChangeTags={this.events.onChangeTags}/>
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
      <TagList tags={this.state.tags} onClickTag={this.events.onClickTag}/>
    </div>;
  }
}

Question.propTypes = {
  // Is this question in edit mode?
  edit: PropTypes.bool,

  // The id of this question
  questionId: PropTypes.string.isRequired,

  // What is the raw title of this question?
  title: PropTypes.string.isRequired,

  // What is the raw markdown for this question?
  body: PropTypes.string.isRequired,

  // What are the tags for this question?
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,

  // Special rendering for test runs
  test: PropTypes.bool,

  // Tag interactions handler
  tagHandler: PropTypes.shape({
    onTagClicked: PropTypes.func.isRequired,
    onTagSuggest: PropTypes.func.isRequired,
    onTagInventNew: PropTypes.func.isRequired,
  }).isRequired,
};