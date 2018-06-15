import ReactMde, {ReactMdeTypes} from "react-mde";
import * as Showdown from "showdown";
import React from 'react';
import {Tag} from "../common/tag";
import 'react-mde/lib/styles/scss/react-mde-all.scss';
import './question.scss';
import PropTypes from "prop-types";

export class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      saving: false,
      readonly: this.props.readonly,
      title: props.title,
      body: props.body,
      tags: props.tags,
      error: null,
    };
    this.events = {
      onEdit: () => this.onEdit(),
      onSave: () => this.onSave(),
      onCancel: () => this.onCancel()
    };
  }

  onEdit() {
    if (this.props.readonly) return;
    this.setState({
      edit: true
    });
    return false;
  }

  onSave() {
    if (this.props.readonly) return;
    this.setState({
      edit: false,
      saving: true,
      readonly: true
    });
    this.props.questionProvider.onSave({
      title: this.state.title,
      body: this.state.body,
      tags: this.state.tags
    }).then((error) => {
      if (error) {
        this.onError(error);
      }
      else {
        this.setState({
          edit: false,
          readonly: false
        });
      }
    }, (error) => {
      this.onError(error);
    });
  }

  onCancel() {
    this.setState({
      edit: false
    });
  }

  onError(error) {
    this.setState({
      readonly: false,
      error: error
    });
  }

  render() {
    return <div className="component--Question">
      {this.state.error ? <div className="error">{this.state.error.toString()}</div> : ""}
      <QTitle value={this.state.title} edit={this.state.edit}/>
      <QBody value={this.state.body} edit={this.state.edit}/>
      <QTags value={this.state.tags} edit={this.state.edit}/>
      {this.state.edit ? this.renderSaveMenu() : this.renderEditMenu()}
    </div>;
  }

  renderEditMenu() {
    return <React.Fragment>
      {this.props.readonly || this.state.readonly ? "" : <a href="#" onClick={this.events.onEdit}>Edit</a>}
    </React.Fragment>;
  }

  renderSaveMenu() {
    return <React.Fragment>
      <a href="#" onClick={this.events.onSave}>Save</a>
      <a href="#" onClick={this.events.onCancel}>Cancel</a>
    </React.Fragment>;
  }
}

Question.propTypes = {
  // Can this question be opened in edit-mode?
  readonly: PropTypes.bool.isRequired,

  // Question title
  title: PropTypes.string.isRequired,

  // Question body
  body: PropTypes.string.isRequired,

  // Question tags
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,

  // Tag related functions
  tagProvider: PropTypes.shape({

    // (partial) => Promise<{error: Exception, result: string[]}>
    onSuggestTag: PropTypes.func.isRequired,

    // (partial) => Promise<{error: Exception}>
    onCreateTag: PropTypes.func.isRequired,
  }).isRequired,

  // Question related functions
  questionProvider: PropTypes.shape({

    // (partial) => Promise<{error: Exception}>
    onSave: PropTypes.func.isRequired,
  }).isRequired
};

export class QTitle
  extends React
    .Component {
  constructor(props) {
    super(props);
    this.state = {value: props.value, initialValue: props.value};
    this.events = {
      onUpdate: (e) => this.onUpdate(e)
    };
  }

  onUpdate(e) {
    this.setState({
      value: e.target.value
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.initialValue) {
      return {
        value: props.value,
        initialValue: state.initialValue
      };
    }
    return state;
  }

  render() {
    return <React.Fragment>
      {this.props.edit ? this.renderEdit() : ""}
      {this.props.edit ? "" : this.renderView()}
    </React.Fragment>;
  }

  renderEdit() {
    return <input type="text" value={this.state.value} onChange={this.events.onUpdate}/>
  }

  renderView() {
    return <h1>{this.props.children}</h1>
  }
}

export class QBody extends React.Component {
  constructor() {
    super();
    this.converter = new Showdown.Converter({tables: true, simplifiedAutoLink: true});
    this.state = {mdeState: null};
    this.events = {
      handleValueChange: (e) => this.handleValueChange(e)
    };
  }

  handleValueChange(mdeState) {
    this.setState({mdeState});
  }

  render() {
    return <React.Fragment>
      {this.props.edit ? this.renderEdit() : ""}
      {this.props.edit ? "" : this.renderView()}
    </React.Fragment>;
  }

  renderEdit() {
    return <div>
      <ReactMde
        onChange={this.events.handleValueChange}
        editorState={this.state.mdeState}
        layout="tabbed"
        generateMarkdownPreview={(markdown) => Promise.resolve(this.converter.makeHtml(markdown))}
      />
    </div>;
  }

  renderView() {
    let rendered = this.converter.makeHtml(this.props.value);
    return <div dangerouslySetInnerHTML={{__html: rendered}}/>;
  }
}

export class QTags extends React.Component {
  render() {
    return <React.Fragment>
      {this.props.edit ? this.renderEdit() : ""}
      {this.props.edit ? "" : this.renderView()}
    </React.Fragment>;
  }

  renderEdit() {
    return <div>Tag editor here</div>;
  }

  renderView() {
    return this.props.value.map((i) => {
      return <Tag key={i} name={i}/>
    });
  }
}