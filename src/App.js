import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(eachCart => eachCart.id !== id)
    this.setState({
      cartList: updatedCartList,
    })
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          return {...eachCartItem, quantity: eachCartItem.quantity - 1}
        }
        return eachCartItem
      }),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          return {...eachCartItem, quantity: eachCartItem.quantity + 1}
        }
        return eachCartItem
      }),
    }))
  }

  incrementCartItemQuantity1 = product => {
    const {id, quantity} = product
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          return {...eachCartItem, quantity: eachCartItem.quantity + quantity}
        }
        return eachCartItem
      }),
    }))
  }

  removeAllCartItems = () => {
    this.setState({
      cartList: [],
    })
  }

  addCartItem = product => {
    const {cartList} = this.state
    const {id} = product

    if (cartList.length > 0) {
      cartList.forEach(eachCartListItem => {
        if (eachCartListItem.id !== id) {
          this.setState(prevState => ({
            cartList: [...prevState.cartList, product],
          }))
        } else {
          this.incrementCartItemQuantity1(product)
        }
      })
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App