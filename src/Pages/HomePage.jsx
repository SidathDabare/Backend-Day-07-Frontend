/** @format */

import React, { useEffect, useState } from "react"
import MyNavbar from "../Components/MyNavbar"
import ProductList from "../Components/ProductList"

const HomePage = () => {
  const [products, setProducts] = useState(null)
  const [links, setLinks] = useState({})

  const getProducts = async (url) => {
    try {
      let res = await fetch(url)
      let data = await res.json()
      //console.log(data.products)
      setProducts(data.products)
      setLinks(data.links)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getProducts(
      `${process.env.REACT_APP_URL}/products?category=electronics&price<1500&limit=4&offset=0&sort=-price`
    )
    // getProducts().then((product) => {
    //   setProducts(product)
    // })

    //console.log(posts)
  }, [])
  return (
    <div>
      <MyNavbar setProducts={setProducts} />
      <ProductList products={products} />
    </div>
  )
}

export default HomePage
