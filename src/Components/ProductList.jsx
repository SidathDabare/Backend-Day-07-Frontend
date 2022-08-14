/** @format */

import React, { useEffect, useState } from "react"
import SingleProduct from "./SingleProduct"
import Container from "react-bootstrap/Container"

const ProductList = ({ products }) => {
  const [items, setItems] = useState(null)
  //console.log(items)

  //console.log(products)
  // const getProducts = async () => {
  //   let url = `${process.env.REACT_APP_URL}/products`
  //   try {
  //     let res = await fetch(url)
  //     let data = await res.json()
  //     console.log(data.products)
  //     return data.products
  //     //setList(data.products)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // useEffect(() => {
  //   //getProducts()
  //   getProducts().then((product) => {
  //     setProducts(product)
  //   })

  //   //console.log(posts)
  // }, [])
  useEffect(() => {
    setItems(products)
    console.log(items)
  }, [products, items])

  return (
    <Container
      className='d-flex flex-wrap justify-content-between'
      style={{ marginTop: "5rem" }}>
      {items ? (
        items.map((product, i) => <SingleProduct key={i} product={product} />)
      ) : (
        <h4>Loading.....</h4>
      )}
    </Container>
  )
}

export default ProductList
