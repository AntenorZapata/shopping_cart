import React, { Component } from 'react';
import Header from '../components/Header';
import { addToCart, addReview, loadReview } from '../actions/postActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BtnsQuantity from '../components/BtnsQuantity';
import StarRating from '../components/StarRatings';
import FormRating from '../components/FormRating';
import { isObject } from 'lodash';

class Details extends Component {
  constructor(props) {
    super(props);
    this.handleRating = this.handleRating.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      show: false,
      item: {},
      showCart: false,
      reload: true,
      starValue: 0,
      email: '',
      avaliation: '',
    };
  }

  componentDidMount() {
    if (this.props.currItem) {
      this.setState({ show: true });
      this.setState({ item: this.props.currItem });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { item, email, avaliation, starValue } = this.state;
    this.props.addReview(item.id, email, avaliation, starValue);
  }

  handleAddToCart(id) {
    this.props.addToCart(id);
    this.setState({ showCart: true });
  }

  handleItemCart(id) {
    const item = this.props.cart.find((item) => item.id === id);
    return item;
  }

  handleRating(value) {
    console.log(value);
    this.setState({ starValue: value });
  }

  handleValue(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleLoadReview(item) {}

  handleShowDivReviews(rating, id) {
    return (
      <div>
        {rating
          .filter((elem) => elem.id === id)
          .map((i, index) => (
            <div key={index}>
              <StarRating starValue={i.rating} />
              <p>{i.email}</p>
            </div>
          ))}
      </div>
    );
  }

  handleShowRating() {
    const { starValue } = this.state;
    return (
      <div>
        <StarRating
          bool={true}
          handleRating={this.handleRating}
          starValue={starValue}
        />
        <FormRating
          handleValue={this.handleValue}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }

  render() {
    const { show, item, showCart } = this.state;
    const { rating } = this.props;

    return (
      <div>
        <Header />
        <div className="details-container">
          <div className="details">
            {!show ? (
              <div className="no-selected-product">
                Nenhum produto selecionado.
              </div>
            ) : (
              <div className="details-content">
                <div className="left-content">
                  <div className="popup-left-content">
                    <ul>
                      <li>
                        <div className="content-popup">
                          <p>
                            Aglumas imagens estão com baixa resolução por conta
                            do tamanho dos arquivos fornecidos pela API.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <img src={item.thumbnail} alt="" />
                </div>
                <div className="right-content">
                  <div className="item-details-title">
                    <h1>{item.title.split(0, 1)}</h1>
                  </div>
                  <div className="item-details">
                    <h4 className="condition">
                      Condição:
                      {item.condition === 'new' ? ' Novo' : 'usado'}
                    </h4>
                    <div className="details-description">
                      <h3>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Iste voluptatem quos delectus amet voluptatibus est rem
                        praesentium vel ea sunt suscipit recusandae nulla
                      </h3>
                    </div>
                    <div className="details-price">
                      <h4>
                        {item.price.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </h4>
                    </div>
                  </div>
                  <div className="available-quantity">
                    Estoque:
                    <span
                      style={{
                        color: item.available_quantity > 10 ? 'green' : 'red',
                      }}
                    >
                      {item.available_quantity}
                    </span>
                  </div>
                  <div className="btn-details-add">
                    <button
                      className="btn-add"
                      type="button"
                      onClick={() => this.handleAddToCart(item.id)}
                    >
                      Adicionar
                    </button>
                    {showCart ? (
                      <div>
                        <div className="btns-details-cart">
                          <BtnsQuantity
                            product={this.handleItemCart(item.id)}
                          />
                        </div>
                        <Link to="/cart">ver carrinho</Link>
                      </div>
                    ) : null}
                  </div>
                  <Link to="/products">Voltar</Link>
                </div>
              </div>
            )}
          </div>
          <div className="show-review">
            {this.handleShowRating()}
            {rating.length ? this.handleShowDivReviews(rating, item.id) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currItem: state.shop.currItem,
  cart: state.shop.cart,
  rating: state.shop.rating,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
    loadReview: (id) => dispatch(loadReview(id)),
    addReview: (id, email, msg, starValue) =>
      dispatch(addReview(id, email, msg, starValue)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
