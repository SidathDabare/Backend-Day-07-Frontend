/** @format */

import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"

import Navbar from "react-bootstrap/Navbar"
import { useEffect } from "react"

const MyNavbar = ({ setProducts }) => {
  const navigate = useNavigate()

  const [show, setShow] = useState(false)
  const [name, setName] = useState("")
  const [brand, setBrand] = useState("")
  //const [type, setType] = useState(null)
  const [file, setFile] = useState(null)
  // const [image, setImage] = useState({})

  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [cartItems, setCartItems] = useState({})
  //console.log(cartItems)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const getCartItems = async () => {
    try {
      let res = await fetch(
        `${process.env.REACT_APP_URL}/users/62f284a518f3387e1d9efc6d/cart`
      )
      let data = await res.json()
      setCartItems(data[0])
    } catch (error) {
      console.log(error)
    }
  }

  const addProduct = async () => {
    let url = `${process.env.REACT_APP_URL}/products/`
    let imagePath = await addImage(file)
    console.log(imagePath)

    try {
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          brand: brand,
          imageUrl: imagePath.url,
          price: price,
          category: category,
          description: description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      let data = await res.json()
      console.log(data)
      setProducts()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const addImage = async (str) => {
    let url = `${process.env.REACT_APP_URL}/file/cloudinary`
    var formData = new FormData()
    formData.append("image", str)
    // formData.append("test", "StringValueTest")
    var requestOptions = {
      method: "POST",
      body: formData,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    }
    try {
      let res = await fetch(url, requestOptions)
      let data = await res.json()
      console.log(data)

      return data
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    addProduct()
    // if (type === "computer") {
    //   addImage(file)
    // }

    handleClose()
    e.preventDefault()
  }

  useEffect(() => {
    getCartItems()
    //setProducts()
  }, [])
  return (
    <Navbar bg='dark fixed-top' variant='dark'>
      <Container>
        <h2>
          <Link to='/'>Shop</Link>
        </h2>

        <div>
          <Button
            variant='warning'
            className='mx-2 px-4'
            onClick={() => {
              navigate(`/cart/${cartItems.owner}`)
            }}>
            <span>Cart </span>
            <span
              style={{
                height: "15px",
                width: "15px",
                backgroundColor: "red",
                padding: "0px 4px 0px 4px",
                borderRadius: "50%",
                color: "white",
                fontSize: "10px",
                marginTop: "-4px",
                position: "absolute",
              }}>
              {cartItems &&
              cartItems.products &&
              cartItems.products.length > 0 ? (
                cartItems.products.length
              ) : (
                <p>0</p>
              )}
            </span>
          </Button>
          <Button variant='primary' onClick={handleShow}>
            + Add New Product
          </Button>
        </div>
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form encType='multipart/form-data'>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Control
                type='text'
                placeholder='Name'
                className='my-1'
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control
                type='text'
                placeholder='Brand'
                className='my-1'
                onChange={(e) => setBrand(e.target.value)}
              />
              <div className='d-flex col-6'>
                {/* <Form.Select
                  className='col-3'
                  aria-label='Default select example'
                  onChange={(e) => setType(e.target.value)}>
                  <option>Image</option>
                  <option value='url'>Url</option>
                  <option value='computer'>From your computer</option>
                </Form.Select> */}
                {/* {type === "url" ? (
                  <Form.Control
                    type='text'
                    placeholder='Image Url'
                    className='my-1 col-7'
                    onChange={(e) => setFile(e.target.value)}
                  />
                ) : ( */}
                <Form.Control
                  type='file'
                  placeholder='Image file'
                  className='my-1 col-7'
                  name='image'
                  onChange={(e) => setFile(e.target.files[0])}
                  //onChange={setImage}
                />
                {/* )} */}
              </div>

              <Form.Control
                type='text'
                placeholder='Price'
                className='my-1'
                onChange={(e) => setPrice(e.target.value)}
              />
              <Form.Select
                aria-label='Default select example'
                type='text'
                placeholder='Category'
                className='my-1'
                onChange={(e) => setCategory(e.target.value)}>
                <option>Open this select menu</option>
                <option value='electronics'>Electronics</option>
                <option value='2'>Two</option>
                <option value='3'>Three</option>
              </Form.Select>
              <Form.Control
                as='textarea'
                rows={3}
                type='textarea'
                placeholder='Descrption'
                className='my-1'
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit' onClick={handleSubmit}>
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  )
}

export default MyNavbar
