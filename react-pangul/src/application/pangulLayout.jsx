import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import PangulHeader from '../elements/layout/pangulHeader';
import HomeSection from './sections/home/homeSection';
import {QuestionsSection} from './sections/questions/questionsSection';
import './pangulLayout.scss';

export class PangulLayout extends React.Component {
  render() {
    return (
      <div className="component--PangulLayout">
        <PangulHeader />
        <BrowserRouter>
          <div>
            <Route path="/" component={HomeSection} />
            <Route path="/questions" component={QuestionsSection} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
