/** @format */

import React, { useEffect, useState } from "react"
import SingleProduct from "./SingleProduct"
import Container from "react-bootstrap/Container"

const ProductList = ({ products }) => {
  const [items, setItems] = useState(products)
  const [links, setLinks] = useState({})
  //console.log(links)

  //console.log(products)
  //let url = `${process.env.REACT_APP_URL}/products?category=electronics&price<1500&limit=2&offset=0&sort=-price&fields=name,price`
  //let url = `${process.env.REACT_APP_URL}/products?category=electronics&price<1500&limit=4&offset=0&sort=-price`
  const getProducts = async (url) => {
    try {
      let res = await fetch(url)
      let data = await res.json()
      //console.log(data.products)
      setItems(data.products)
      setLinks(data.links)
    } catch (error) {
      console.log(error)
    }
  }
  // useEffect(() => {
  //   //getProducts()
  //   getProducts().then((product) => {
  //     setProducts(product)
  //   })

  //   //console.log(posts)
  // }, [])
  useEffect(() => {
    setItems(products)
    getProducts(
      `${process.env.REACT_APP_URL}/products?category=electronics&price<1500&limit=4&offset=0&sort=-price`
    )

    //console.log(items)
  }, [products])

  return (
    <>
      <Container
        className='d-flex flex-wrap justify-content-between'
        style={{ marginTop: "5rem" }}>
        {items ? (
          items.map((product, i) => <SingleProduct key={i} product={product} />)
        ) : (
          <h4>Loading.....</h4>
        )}
      </Container>
      <Container className='col-4 m-auto d-flex justify-content-between mt-5'>
        <div
          className='btn btn-success'
          onClick={() => {
            getProducts(links.prev)
          }}>
          Prev
        </div>
        <div
          className='btn btn-success'
          onClick={() => {
            getProducts(links.first)
          }}>
          First
        </div>
        <div
          className='btn btn-success'
          onClick={() => {
            getProducts(links.next)
          }}>
          Next
        </div>
        <div
          className='btn btn-success'
          onClick={() => {
            getProducts(links.last)
          }}>
          Last
        </div>
      </Container>
    </>
  )
}

export default ProductList
