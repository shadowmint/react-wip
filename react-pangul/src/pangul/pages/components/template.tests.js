import {Template} from './askPage';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';

export function test_pass(test) {
  test.ok(true);
  test.done();
}

export function test_async(test) {
  setTimeout(() => {
    test.ok(true);
    test.done();
  }, 10);
}

export function test_render_component(test) {
  const testRenderer = TestRenderer.create(<Template id={'1'}/>);
  const testInstance = testRenderer.root;
  test.ok(testInstance.findByProps({id: '1'}));
  test.done();
}