/** @format */

import React, { useEffect, useState } from "react"
import SingleProduct from "./SingleProduct"
import Container from "react-bootstrap/Container"

const ProductList = () => {
  const [products, setProducts] = useState([])
  //console.log(products)
  const getProducts = async () => {
    let url = `${process.env.REACT_APP_URL}/products`
    try {
      let res = await fetch(url)
      let data = await res.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getProducts().then((product) => {
      setProducts(product)
      //console.log(post)
    })

    //console.log(posts)
  }, [])
  return (
    <Container
      className='d-flex flex-wrap justify-content-between'
      style={{ marginTop: "5rem" }}>
      {products.map((product, i) => (
        <SingleProduct key={i} product={product} />
      ))}
    </Container>
  )
}

export default ProductList
