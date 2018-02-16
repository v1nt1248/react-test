import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.setState(this.props);
  }

  render() {
    return (
      <div class="Select">
        {this.state}
      </div>
    )
  }

}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object)
};

export default Select;
