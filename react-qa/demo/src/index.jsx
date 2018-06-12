import {Question} from '../../src/qa/display/question';
import React from 'react';
import ReactDOM from 'react-dom';

export class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ['one', 'two']
    };
    this.tagHandler = {
      onTagClicked: (tag) => alert(tag),
      onTagSuggest: (partial) => {
        return Promise.resolve([partial, 'hello', 'world']);
      },
    };
  }

  render() {
    return (<div>
      <div className="example">
        <Question title={"Hello"}
                  body={"**body**"}
                  questionId={'123'}
                  tags={this.state.tags}
                  edit={false}
                  tagHandler={this.tagHandler}/>
      </div>
      <div className="example">
        <Question title={"Hello"}
                  body={"**body**"}
                  questionId={'123'}
                  tags={this.state.tags}
                  edit={true}
                  tagHandler={this.tagHandler}/>
      </div>
    </div>);
  }
}


ReactDOM.render(
  <div>
    <Demo/>
  </div>,
  document.getElementById('root')
)
