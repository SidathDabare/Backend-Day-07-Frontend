/** @format */

import React from "react"
import { useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { useState } from "react"
import { useEffect } from "react"

const SingleProduct = ({ product }) => {
  const [productItem, setProductItem] = useState({})
  const [cartItems, setCartItems] = useState(null)
  //console.log(productItem._id)
  const navigate = useNavigate()

  const addProductToCart = async () => {
    const url = `${process.env.REACT_APP_URL}/users/62f284a518f3387e1d9efc6d/cart`
    try {
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          product_Id: productItem._id,
          quantity: 1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      getCartItems()
      let data = await res.json()

      return data
    } catch (error) {
      console.log(error)
    }
  }
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
    setProductItem(product)
    //getCartItems()
  }, [product, cartItems])
  return (
    <Card style={{ width: "18rem", height: "30rem", marginBottom: "2rem" }}>
      <Card.Img
        style={{ width: "18rem", height: "10rem" }}
        variant='top'
        className='product-details-img pt-3'
        src={productItem.imageUrl}
      />
      <Card.Body>
        <Card.Title style={{ width: "100%", height: "2rem" }}>
          {productItem.name}
        </Card.Title>
        <Card.Title>{productItem.brand}</Card.Title>
        <Card.Text>{productItem.category}</Card.Text>
        <Card.Text
          style={{
            width: "100%",
            height: "5.7rem",
            overflow: "hidden",
            textOverflow: "clip",
          }}>
          {productItem.description}
        </Card.Text>
        <h3>$ {productItem.price}</h3>
        <div className='d-flex justify-content-between'>
          <Button
            onClick={() => {
              navigate(`/details/${productItem._id}`)
            }}
            variant='primary'>
            Product Details
          </Button>
          <Button onClick={() => addProductToCart()} variant='success'>
            Add to Cart
          </Button>
        </div>

        {/* <Link to={`/details/${productItem.id}`}>More Details</Link> */}
      </Card.Body>
    </Card>
  )
}

export default SingleProduct
