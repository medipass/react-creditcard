import React, { Component } from 'react';
import PropTypes from 'prop-types';
import payment from 'payment';
import classNames from 'classnames';
import padEnd from 'lodash/padEnd';
import times from 'lodash/times';

import images from './card-images';

const cardType = payment.fns.cardType;

export class Card extends Component {
  state = { type: 'unknown', length: 16 }

  componentDidMount = () => {
    this.updateType(this.props);
  }

  componentWillReceiveProps = nextProps => {
    this.updateType(nextProps);
  }

  displayClassName = base => {
    const { focused } = this.props;
    let classNames = [`react-credit-card__${base}`, 'react-credit-card__display'];

    if (focused === base) {
      classNames = [...classNames, 'react-credit-card--focused'];
    }

    return classNames.join(' ');
  }

  formatCVC = cvc => padEnd(cvc, 3, '•')

  formatExpiry = expiry => {
    let formattedExpiry = expiry;
    if (!formattedExpiry) {
      return '••/••';
    }

    const maxLength = 6;
    if (formattedExpiry.match(/\//)) {
      formattedExpiry = formattedExpiry.replace('/', '');
    }
    if (!formattedExpiry.match(/^[0-9]*$/)) {
      return '••/••';
    }

    formattedExpiry = padEnd(formattedExpiry, 4, '•');
    formattedExpiry = `${expiry.slice(0, 2)}/${expiry.slice(2, maxLength)}`;

    return formattedExpiry;
  }

  formatName = name => {
    const { namePlaceholder } = this.props;
    if (namePlaceholder && !name) {
      return namePlaceholder;
    }
    return name;
  }

  formatNumber = number => {
    const { length: maxLength, type } = this.state;
    let formattedNumber = number;

    if (number && number.length > maxLength) {
      formattedNumber = number.slice(0, maxLength);
    }

    formattedNumber = padEnd(formattedNumber, maxLength, '•');

    if (type === 'amex') {
      formattedNumber = `${formattedNumber.substring(0, 4)} ${formattedNumber.substring(4, 10)} ${formattedNumber.substring(10)}`;
    } else {
      const amountOfSpaces = Math.ceil(maxLength / 4);
      times(amountOfSpaces, i => {
        const spaceIndex = ((i * 4) + i);
        formattedNumber = `${formattedNumber.slice(0, spaceIndex)} ${formattedNumber.slice(spaceIndex)}`;
      });
    }

    return formattedNumber;
  }

  updateType = props => {
    const type = props.type || cardType(props.number);
    if (!props.number) {
      this.setState({ type: 'unknown' });
    }

    if (type) {
      if (type === 'amex') {
        this.setState({ length: 15 });
      }
      return this.setState({ type, length: 16 });
    }
    return this.setState({ type: 'unknown', length: 16 });
  }

  render = () => {
    const { hideName, backDescriptionText, expiry, expiryBeforeText, expiryAfterText, focused, cvc, name, number } = this.props;
    const { type } = this.state;
    const isAmex = (type === 'amex');
    return (
      <div className="react-credit-card__container">
        <div className={classNames('react-credit-card', type ? `react-credit-card--${type}` : '', (focused === 'cvc' && !isAmex) ? 'react-credit-card--flipped' : '')}>
          <div className="react-credit-card__front">
            <div className="react-credit-card__lower">
              <div className="react-credit-card__shiny"/>
              <img
                src={images[type]}
                className={classNames('react-credit-card__logo', `react-credit-card--${type}`)}
                />
              {
                isAmex &&
                  <div className={this.displayClassName('cvc_front')}>{this.formatCVC(cvc)}</div>
              }
              <div className={this.displayClassName('number')}>{this.formatNumber(number)}</div>
              {!hideName && <div className={this.displayClassName('name')}>{this.formatName(name)}</div>}
              <div
                className={this.displayClassName('expiry')}
                data-before={expiryBeforeText}
                data-after={expiryAfterText}
                >
                {this.formatExpiry(expiry)}
              </div>
            </div>
          </div>
          <div className="react-credit-card__back">
            <div className="react-credit-card__bar"/>
            <div className={this.displayClassName('cvc')}>{this.formatCVC(cvc)}</div>
            <div className="react-credit-card__shiny" data-after={backDescriptionText}/>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  hideName: PropTypes.bool,
  number: PropTypes.string,
  cvc: PropTypes.string,
  name: PropTypes.string,
  expiry: PropTypes.string,
  focused: PropTypes.string,
  namePlaceholder: PropTypes.string,
  expiryBeforeText: PropTypes.string,
  expiryAfterText: PropTypes.string,
  backDescriptionText: PropTypes.string
};

Card.defaultProps = {
  hideName: false,
  number: null,
  cvc: null,
  name: null,
  expiry: null,
  focused: null,
  namePlaceholder: 'FULL NAME',
  expiryBeforeText: 'month/year',
  expiryAfterText: 'valid thru',
  backDescriptionText: null,
  type: null
};

export default Card;
