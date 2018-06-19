import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../glyphs/spinner';
import Stop from '../glyphs/stop';
import './liveSearch.scss';

function LoadingIndicator() {
  return (
    <div className="loading">
      <Spinner size={16} />
      <Stop size={16} />
    </div>
  );
}

export default function LiveSearch(props) {
  return (
    <div className="component--LiveSearch">
      <div>
        <input type="text" />
        {props.loading ? <LoadingIndicator /> : ''}
      </div>
      <div className="results" />
    </div>
  );
}

LiveSearch.propTypes = {
  // Are we busy loading stuff?
  loading: PropTypes.bool.isRequired,
};

/* Template.propTypes = {
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

  // Children
  children: PropTypes.node.isRequired,
}; */
