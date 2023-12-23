// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let totalBillAllItem = 0
      cartList.forEach(eachCartList => {
        totalBillAllItem += eachCartList.price * eachCartList.quantity
      })

      return (
        <div className="cart-summary-container">
          <div>
            <h1 className="total-order">
              <span className="total-sum">Order Total: </span>Rs{' '}
              {totalBillAllItem}
              /-
            </h1>

            <p className="cart-item-in-summary">
              {cartList.length} Items in cart
            </p>
            <button className="checkout-button" type="button">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
