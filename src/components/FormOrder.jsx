import React, { Component } from 'react';

export default class FormOrder extends Component {
  constructor(props) {
    super(props);
    this.handlePayment = this.handlePayment.bind(this);

    this.state = {
      show: true,
    };
  }

  handlePayment() {
    this.setState({ show: true });
  }

  render() {
    const { show } = this.state;
    const { state } = this.props;

    return (
      <div className="checkout-right-content">
        <div className="order">
          <div className="cred-card-option">
            <button onClick={this.handlePayment} type="button">
              Cartão de Crédito
            </button>
          </div>
          {/* <div className="paypal-option">
            <a href="https://www.paypal.com/br/home">Paypal</a>
          </div> */}
        </div>
        <div className="payment-content">
          {show ? (
            <div>
              <div className="credit-cart">
                {/* <label htmlFor="card">Cartão de crédito</label> */}
                <input
                  required
                  type="text"
                  id="card"
                  defaultValue={state.credCard}
                  placeholder="Número do cartão"
                />
              </div>
              <div className="first-last-order">
                <div className="first-name">
                  {/* <label htmlFor="first-name">Nome</label> */}
                  <input
                    required
                    type="text"
                    id="first-name"
                    defaultValue={state.name}
                    placeholder="Nome"

                  />
                </div>
                <div className="last-name">
                  {/* <label htmlFor="last-name">Sobrenome</label> */}
                  <input
                    required
                    type="text"
                    id="last-name"
                    defaultValue={state.lastName}
                    placeholder="Sobrenome"

                  />
                </div>
              </div>
              <div className="first-last-order">
                <div className="date">
                  {/* <label htmlFor="date">Vencimento</label> */}
                  <input
                    required
                    type="date"
                    id="date"
                    defaultValue={state.date}
                    placeholder="Validade"

                  />
                </div>
                <div className="security">
                  {/* <label htmlFor="security">Cc</label> */}
                  <input
                    required
                    type="text"
                    id="security"
                    defaultValue={state.cc}
                    placeholder="Cc"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
