/** @format */

import React, { useState } from "react"
import MyNavbar from "../Components/MyNavbar"
import Container from "react-bootstrap/Container"

import { useEffect } from "react"
import CartItems from "../Components/CartItems"

const CartPage = () => {
  const [cartItems, setCartItems] = useState(null)

  const getCartItems = async () => {
    try {
      let res = await fetch(
        `${process.env.REACT_APP_URL}/users/62f284a518f3387e1d9efc6d/cart`
      )
      let data = await res.json()
      //console.log(data)
      setCartItems(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCartItems()
  }, [])
  return (
    <div>
      <MyNavbar />
      <Container style={{ marginTop: "6rem" }}>
        <div className='mt-5'>
          <h3>User Id : {cartItems && cartItems[0].owner}</h3>
          <h4 className='text-info'>
            Status : {cartItems && cartItems[0].status}
          </h4>
        </div>
        <div style={{ marginTop: "1rem" }}>
          {cartItems && cartItems[0].products.length > 0 ? (
            cartItems[0].products.map((item, i) => (
              <CartItems key={i} item={item} index={i} />
            ))
          ) : (
            <h5>Noitems</h5>
          )}
        </div>
      </Container>
    </div>
  )
}

export default CartPage
