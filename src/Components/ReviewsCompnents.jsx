/** @format */

import React, { useEffect, useState } from "react"

import Form from "react-bootstrap/Form"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import SindleReview from "./SindleReview"

const ReviewsCompnents = ({ productId }) => {
  console.log(productId)
  const [comment, setComment] = useState("")
  const [rate, setRate] = useState("")
  //console.log(productReviews)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const getReviews = async (product_Id) => {
    let url = `${process.env.REACT_APP_URL}/products/${product_Id}`
    try {
      let res = await fetch(url)
      let data = await res.json()
      console.log(data.reviews)
      // return data
      //setReviews(data)
      setComment(data.reviews)
    } catch (error) {
      console.log(error)
    }
  }

  const addReviews = async () => {
    let url = `${process.env.REACT_APP_URL}/reviews`
    try {
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          comment: comment,
          rate: rate,
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
  const handleSubmit = (e) => {
    e.preventDefault()
    addReviews()
    handleClose()
  }

  useEffect(() => {
    getReviews(productId)
    //setProducts(location.state.productItem)
    // getReviews().then((review) => {
    //   //console.log(review)
    //   setReviews(review)
    // })
  }, [productId])
  return (
    <>
      {/* <SindleReview productId={productId} /> */}
      <ListGroup>
        {comment && comment.length > 0 ? (
          comment.map((review, i) => (
            <ListGroup.Item key={i} className='d-flex justify-content-between'>
              {" "}
              <span className='col-9'>{review.comment}</span>
              <span className='col-3 d-flex justify-content-end'>
                <i
                  className='bi bi-pencil-square mx-2'
                  onClick={() => console.log("Edit")}></i>
                <i
                  className='bi bi-x-square-fill text-danger'
                  onClick={() => console.log("Delete")}></i>
              </span>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No review</ListGroup.Item>
        )}
      </ListGroup>
      <Button variant='primary' onClick={handleShow}>
        + Add Your Feedback
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className='d-flex'>
              <Form.Group className='mb-3 col-9' controlId='formBasicEmail'>
                <Form.Label>Add Cooment</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Comment'
                  className='my-1'
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3 col-3' controlId='formBasicEmail'>
                <Form.Label>Rate</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='0'
                  className='my-1'
                  onChange={(e) => setRate(e.target.value)}
                />
              </Form.Group>
            </div>

            <Button variant='primary' type='submit' onClick={handleSubmit}>
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ReviewsCompnents
