/** @format */

import React from "react"
import { useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { useState } from "react"
import { useEffect } from "react"

const SingleProduct = ({ product }) => {
  const [productItem, setProductItem] = useState({})
  //console.log(product._id)
  const navigate = useNavigate()

  useEffect(() => {
    setProductItem(product)
  }, [product])
  return (
    <Card style={{ width: "18rem", height: "35rem", marginBottom: "2rem" }}>
      <Card.Img
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
            height: "7rem",
            overflow: "hidden",
            textOverflow: "clip",
          }}>
          {productItem.description}
        </Card.Text>
        <h3>$ {productItem.price}</h3>
        <Button
          onClick={() => {
            navigate(`/details/${productItem._id}`, {
              state: { productItem },
            })
          }}
          variant='primary'>
          Product Details
        </Button>
        {/* <Link to={`/details/${productItem.id}`}>More Details</Link> */}
      </Card.Body>
    </Card>
  )
}

export default SingleProduct
