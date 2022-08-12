/** @format */

import React, { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"

const SingleReview = ({ productId, review }) => {
  const [reviews, setReviews] = useState(review)
  const [show, setShow] = useState(false)
  //console.log(productId)
  // console.log(reviews)

  const [comment, setComment] = useState("")
  const [rate, setRate] = useState("")

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const getReviews = async () => {
    let url = `${process.env.REACT_APP_URL}/products/${productId}/reviews`
    try {
      let res = await fetch(url)
      let data = await res.json()
      //console.log(data)
      return data.reviews
      //setReviews(data)
    } catch (error) {
      console.log(error)
    }
  }
  const editReviews = async (reviewId) => {
    let url = `${process.env.REACT_APP_URL}/products/reviews/${reviewId}`
    try {
      let res = await fetch(url, {
        method: "PUT",
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
      //getReviews()
      return data
    } catch (error) {
      console.log(error)
    }
  }
  const deleteReviews = async (reviewId) => {
    let url = `${process.env.REACT_APP_URL}/products/${productId}/reviews/${reviewId}`
    try {
      let res = await fetch(url, {
        method: "DELETE",
      })
      let data = await res.json()
      console.log(data)

      return data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(
    (prevProps, prevState) => {
      //setProducts(location.state.productItem)
      if (prevProps !== this.props.movieTitle) {
        // oh, we have detected a change in the prop movieTitle!
        getReviews().then((review) => {
          //console.log(review)
          setReviews(review)
        })
        //   this will NOT performed again when a state change happens... :)
      }
    },
    [productId]
  )
  return (
    <>
      <ListGroup>
        {reviews ? (
          <ListGroup.Item className='d-flex justify-content-between'>
            {" "}
            <span className='col-9'>{review.comment}</span>
            <span className='col-3 d-flex justify-content-end'>
              <i
                className='bi bi-pencil-square mx-2'
                onClick={() => {
                  handleShow()
                }}></i>
              <i
                className='bi bi-x-square-fill text-danger'
                onClick={() => {
                  deleteReviews(review._id)
                  // getReviews().then((review) => setReviews(review))
                }}></i>
            </span>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <div className='d-flex'>
                    <Form.Group
                      className='mb-3 col-9'
                      controlId='formBasicEmail'>
                      <Form.Label>Edit Comment</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Comment'
                        defaultValue={review.comment}
                        className='my-1'
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className='mb-3 col-3'
                      controlId='formBasicEmail'>
                      <Form.Label>Rate</Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='0'
                        className='my-1'
                        defaultValue={review.rate}
                        onChange={(e) => setRate(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                {/* <Button variant='secondary' onClick={handleClose}>
            Close
          </Button> */}
                <Button
                  variant='primary'
                  onClick={(e) => {
                    e.preventDefault()
                    console.log(review._id)
                    editReviews(review._id)
                    getReviews().then((review) => setReviews(review))
                    handleClose()
                  }}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </ListGroup.Item>
        ) : (
          <ListGroup.Item>No review</ListGroup.Item>
        )}
      </ListGroup>
    </>
  )
}

export default SingleReview
