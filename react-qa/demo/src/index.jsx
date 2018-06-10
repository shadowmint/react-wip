import {Question} from '../../src/qa/display/question';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

const mockTagHandler = {
  onTagClicked: (tag) => alert(tag),
  onTagSuggest: (partial) => {
    return Promise.resolve([partial, 'hello', 'world'])
  },
  onTagInventNew: (tag) => {
    return Promise.resolve(true);
  }
};

ReactDOM.render(
  <div>
    <div className="example">
      <Question title={"Hello"}
                body={"**body**"}
                questionId={'123'}
                tags={['one', 'twp']}
                edit={false}
                tagHandler={mockTagHandler}/>
    </div>
    <div className="example">
      <Question title={"Hello"}
                body={"**body**"}
                questionId={'123'}
                tags={['one', 'twp']}
                edit={true}
                tagHandler={mockTagHandler}/>
    </div>
  </div>,
  document.getElementById('root')
)
