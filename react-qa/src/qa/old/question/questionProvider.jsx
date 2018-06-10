import ReactMde, {ReactMdeTypes} from "react-mde";
import * as Showdown from "showdown";
import React from 'react';
import PropTypes from 'prop-types';
import {Question} from "./question";
import {QuestionService} from "../services/questionService";
import {Deferred} from "../common/deferred";


export class QuestionProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.questionId,
      resolved: false,
      resolving: false,
      error: null
    };
    this.tagProvider = {
      onSuggestTag: (partial) => {
      },
      onCreateTag: (tag) => {
      }
    };
    this.questionProvider = {
      onSave: (state) => {
      }
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.id !== props.questionId) {
      return {
        id: props.questionId,
        model: null,
        resolved: false,
        resolving: false,
        error: null
      };
    }
    return null;
  }

  componentDidUpdate() {
    if (!this.state.resolving && !this.state.resolved) {
      this.triggerAsyncStateUpdate();
    }
  }

  render() {
    return <React.Fragment>
      <Deferred resolved={this.state.resolved} error={this.state.error}>
        <Question questionProvider={this.questionProvider}
                  tagProvider={this.tagProvider}
                  title={this.state.title}
                  body={this.state.body}
                  tags={this.state.tags}/>
      </Deferred>;
    </React.Fragment>;
  }

  triggerAsyncStateUpdate() {
    setTimeout(() => {
      this.setState({resolving: true}, () => {
        try {
          this.props.service.getQuestion(this.state.id).then((model) => {
            if (model.id !== this.state.id) return;
            this.setState({model: model, resolving: false, resolved: true});
          }, (error) => {
            this.setState({error: error});
          });
        } catch (error) {
          this.setState({error: error});
        }
      });
    });
  }
}

QuestionProvider.propTypes = {
  questionId: PropTypes.string.isRequired,
  questionService: PropTypes.instanceOf(QuestionService).isRequired,
  tagService: PropTypes.instanceOf(TagService).isRequired
};