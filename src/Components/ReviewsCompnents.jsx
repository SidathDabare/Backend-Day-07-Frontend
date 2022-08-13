/** @format */

import React, { useEffect, useState } from "react"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import SingleReview from "./SingleReview"

const ReviewsCompnents = ({ product_Id }) => {
  const [comment, setComment] = useState("")
  const [rate, setRate] = useState("")
  const [reviews, setReviews] = useState(null)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const getReviews = async () => {
    let url = `${process.env.REACT_APP_URL}/products/${product_Id}/reviews`
    try {
      let res = await fetch(url)
      let data = await res.json()
      //console.log(data.reviews)
      //return data.reviews
      setReviews(data.reviews)
    } catch (error) {
      console.log(error)
    }
  }
  // const updateReviews = async () => {
  //   let url = `${process.env.REACT_APP_URL}/products/${product_Id}`
  //   try {
  //     let res = await fetch(url, {
  //       method: "PUT",
  //       body: JSON.stringify({
  //         reviews: [...reviewId],
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     let data = await res.json()
  //     console.log(data)
  //     return data
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const addReviews = async () => {
    let url = `${process.env.REACT_APP_URL}/products/${product_Id}/reviews`
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
      getReviews()
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
    getReviews()

    //getReviews().then((reviews) => setReviews(reviews))
  }, [product_Id])
  return (
    <>
      {reviews ? (
        reviews.map((review, i) => (
          <SingleReview
            key={i}
            productId={product_Id}
            review={review}
            getReviews={getReviews}
          />
        ))
      ) : (
        <h3>No Reviews</h3>
      )}

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
