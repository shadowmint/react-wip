import React from 'react'
import './tag.scss'

export class Tag extends React.Component {
  render() {
    return <div className="component--Tag">
      {this.props.name}
    </div>
  }
}
