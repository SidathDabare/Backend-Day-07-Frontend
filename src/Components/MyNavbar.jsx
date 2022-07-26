/** @format */

import React, { useState } from "react"
import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"

import Navbar from "react-bootstrap/Navbar"
import { useEffect } from "react"

const MyNavbar = () => {
  const [show, setShow] = useState(false)

  const [name, setName] = useState("")
  const [brand, setBrand] = useState("")
  const [type, setType] = useState(null)
  const [file, setFile] = useState(null)

  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const addProduct = async () => {
    let url = `${process.env.REACT_APP_URL}/products/`
    try {
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          brand: brand,
          imageUrl:
            type === "url"
              ? file
              : `${process.env.REACT_APP_URL}/products/${file.name}`,
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
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const addImage = async (files) => {
    let url = `${process.env.REACT_APP_URL}/file/products/${name}`
    var formData = new FormData()
    formData.append("image", files)
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
    setName()
    addProduct()
    if (type === "computer") {
      addImage(file)
    }

    handleClose()
    e.preventDefault()
  }

  useEffect(() => {
    // console.log(file.name)
  }, [type, file])
  return (
    <Navbar bg='dark fixed-top' variant='dark'>
      <Container>
        <h2>
          <Link to='/'>Shop</Link>
        </h2>

        <Button variant='primary' onClick={handleShow}>
          + Add New Product
        </Button>
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
                <Form.Select
                  className='col-3'
                  aria-label='Default select example'
                  onChange={(e) => setType(e.target.value)}>
                  <option>Image</option>
                  <option value='url'>Url</option>
                  <option value='computer'>From your computer</option>
                </Form.Select>
                {type === "url" ? (
                  <Form.Control
                    type='text'
                    placeholder='Image Url'
                    className='my-1 col-7'
                    onChange={(e) => setFile(e.target.value)}
                  />
                ) : (
                  <Form.Control
                    type='file'
                    placeholder='Image file'
                    className='my-1 col-7'
                    name='image'
                    onChange={(e) => setFile(e.target.files[0])}
                    //onChange={setImage}
                  />
                )}
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
                <option value='Electronics'>Electronics</option>
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
