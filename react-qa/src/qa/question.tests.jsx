import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import {Question} from './question';

export function test_render_component(test) {
  const testRenderer = TestRenderer.create(
    <Question title={"Hello"}
              body={"**body**"}
              questionId={'123'}
              tags={['one', 'twp']}
              edit={false}
              test={true}/>);

  const state = testRenderer.toJSON();
  test.ok(state);

  test.done();
}

export function test_render_component_editmode(test) {
  const testRenderer = TestRenderer.create(
    <Question title={"Hello"}
              body={"**body**"}
              questionId={'123'}
              tags={['one', 'twp']}
              edit={true}
              test={true}/>);

  const state = testRenderer.toJSON();
  test.ok(state);

  test.done();
}