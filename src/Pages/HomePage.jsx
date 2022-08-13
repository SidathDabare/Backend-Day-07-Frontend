/** @format */

import React, { useEffect, useState } from "react"
import MyNavbar from "../Components/MyNavbar"
import ProductList from "../Components/ProductList"

const HomePage = () => {
  const [products, setProducts] = useState(null)

  const getProducts = async () => {
    let url = `${process.env.REACT_APP_URL}/products`
    try {
      let res = await fetch(url)
      let data = await res.json()
      console.log(data.products)
      return data.products
      //setProducts(data.products)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    //getProducts()
    getProducts().then((product) => {
      setProducts(product)
    })

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
