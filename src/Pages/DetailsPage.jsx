/** @format */

import React, { useState, useEffect } from "react"
import MyNavbar from "../Components/MyNavbar"
import Container from "react-bootstrap/Container"
import { useNavigate, useParams } from "react-router-dom"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import ReviewsCompnents from "../Components/ReviewsCompnents"

const DetailsPage = () => {
  const [products, setProducts] = useState({})
  let { productId } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [brand, setBrand] = useState("")
  //const [image, setImage] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState(null)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const getProducts = async () => {
    let url = `${process.env.REACT_APP_URL}/products/${productId}`
    try {
      let res = await fetch(url)
      let data = await res.json()
      //console.log(data)
      return data
      //setReviews(data)
    } catch (error) {
      console.log(error)
    }
  }

  const editProduct = async () => {
    let url = `${process.env.REACT_APP_URL}/products/${productId}`
    let imagePath = await addImage(file)
    console.log(imagePath)
    try {
      let res = await fetch(url, {
        method: "PUT",
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
      getProducts().then((product) => setProducts(product))
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
  const deleteProduct = async () => {
    let url = `${process.env.REACT_APP_URL}/products/${productId}`
    try {
      let res = await fetch(url, {
        method: "DELETE",
      })
      let data = await res.json()
      console.log(data)
      getProducts().then((product) => setProducts(product))
      return data
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    editProduct()
    handleClose()
  }

  useEffect(() => {
    getProducts().then((product) => setProducts(product))
  }, [productId])
  return (
    <div>
      <MyNavbar />
      <Container className='d-flex col-12' style={{ marginTop: "6rem" }}>
        {products ? (
          <>
            <Card className='d-flex col-6'>
              <Card.Img
                variant='top'
                className='product-details-img pt-3'
                src={products.imageUrl}
              />

              <Card.Body>
                <Card.Title>{products.name}</Card.Title>
                <Card.Text>{products.description}</Card.Text>
                <h3>${products.price}</h3>
                <Button variant='primary' onClick={handleShow}>
                  <i className='bi bi-pencil-square'></i> Edit Deatails
                </Button>
                <Button
                  variant='danger'
                  className='mx-2'
                  onClick={() => {
                    deleteProduct()
                    navigate(`/`)
                  }}>
                  <i className='bi bi-x-square-fill'></i> Delete Product
                </Button>
              </Card.Body>
            </Card>
            <Card className='d-flex flex-colum col-6'>
              <ReviewsCompnents product_Id={productId} />
            </Card>
          </>
        ) : (
          <h3>No product</h3>
        )}
      </Container>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Control
                type='text'
                placeholder='Name'
                className='my-1'
                defaultValue={products.name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control
                type='text'
                placeholder='Brand'
                className='my-1'
                defaultValue={products.brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              {/* <Form.Control
                type='text'
                placeholder='Image Url'
                className='my-1'
                defaultValue={products.imageUrl}
                onChange={(e) => setImage(e.target.value)}
              /> */}
              <Form.Control
                type='file'
                placeholder='Image file'
                className='my-1 col-7'
                name='image'
                onChange={(e) => setFile(e.target.files[0])}
                //onChange={setImage}
              />
              <Form.Control
                type='text'
                placeholder='Price'
                className='my-1'
                defaultValue={products.price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {/* <Form.Control
                type='text'
                placeholder='Category'
                className='my-1'
                defaultValue={products.category}
                onChange={(e) => setCategory(e.target.value)}
              /> */}
              <Form.Select
                aria-label='Default select example'
                type='text'
                placeholder='Category'
                className='my-1'
                defaultValue={products.category}
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
                defaultValue={products.description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit' onClick={handleSubmit}>
              Save
            </Button>
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  )
}

export default DetailsPage
