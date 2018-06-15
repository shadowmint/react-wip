import {Question} from '../../src/qa/display/question';
import React from 'react';
import ReactDOM from 'react-dom';
import {Answer} from "../../src/qa/display/answer";
import {Votes} from "../../src/qa/display/votes";

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
      <div className="example">
        <Answer title={"Hello"}
                body={"**body**"}
                answerId={'123'}
                edit={false}/>
      </div>
      <div className="example">
        <Answer title={"Hello"}
                body={"**body**"}
                answerId={'123'}
                edit={true}/>
      </div>
      <div className="example">
        <Votes votes={10}
               dataType="test"
               dataId="123">
          Hello world!
        </Votes>
      </div>

      <div className="example">
        <Votes votes={-220}
               dataType="test"
               dataId="123">
          <Answer title={"Hello"}
                  body={"**body**"}
                  answerId={'123'}
                  edit={false}/>
        </Votes>
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
