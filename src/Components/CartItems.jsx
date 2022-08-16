/** @format */

import React, { useState } from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { useEffect } from "react"

const CartItems = ({ item, index }) => {
  //console.log(index)
  const [product, setProduct] = useState(null)
  let url = `${process.env.REACT_APP_URL}/products/${item.productId}`
  const getProducts = async () => {
    try {
      let res = await fetch(url)
      let data = await res.json()
      //console.log(data)
      setProduct(data)
      //   setItems(data.products)
      //   setLinks(data.links)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div>
      {product ? (
        <Card style={{ margin: "5px 0px 5px 0px" }}>
          <Card.Header as='h5'>
            {index + 1}
            {".  "}
            Product Name :{product.name}
          </Card.Header>
          <Card.Body className='d-flex justify-content-between'>
            {/* <Card.Title>Special title treatment</Card.Title> */}
            <Card.Img
              variant='left'
              src={product.imageUrl}
              style={{
                height: "50px",
                width: "50px",
                objectFit: "contain",
              }}
            />
            <Card.Text>Quantity : {item.quantity}</Card.Text>
            <Card.Text>Price : ${product.price}</Card.Text>
            {/* <Button variant='primary'>Go somewhere</Button> */}
          </Card.Body>
        </Card>
      ) : (
        <h5>Cart is empty</h5>
      )}
    </div>
  )
}

export default CartItems
