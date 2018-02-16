import React, { Component } from 'react';
import PropTypes from 'prop-types';
import icon from './expand.png';
import './Select.scss';

class TSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.props.options,
      label: this.props.label,
      selected: this.props.options[0],
      isOpen: false
    };
  }

  openContent = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

  isSame = (item) => {
    return JSON.stringify(item) === JSON.stringify(this.state.selected);
  };

  select = (ev, data) => {
    if (this.isSame(data)) {
      this.setState({
        isOpen: false
      });
    } else {
      this.props.onSelect(data);
      this.setState({
        isOpen: false,
        selected: data
      });
    }
  };

  render() {
    return (
      <div className="select">
        <label>{this.state.label}</label>
        <div className={this.state.isOpen? 'select__body select__body--open' : 'select__body'}>
          {this.state.selected.name}
          <img src={icon}
               className={this.state.isOpen ? 'select__body-icon select__body-icon--open' : 'select__body-icon'}
               onClick={this.openContent}
               alt="icon" />
          <div className={this.state.isOpen ? 'select__body-content select__body-content--open' : 'select__body-content'}>
            {
              this.state.options.map((option, i) => (
                <div key={i}
                     className={this.isSame(option) ? 'select__body-content-item select__body-content-item--selected' : 'select__body-content-item'}
                     onClick={ev => this.select(ev, option)}>
                  {option.name}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }

}

TSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
  onSelect: PropTypes.func
};

TSelect.defaultProps = {
  options: [{
    name: '-'
  }],
  label: 'Заголовок',
  onSelect: () => {}
}


export default TSelect;
