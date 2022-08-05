/** @format */

import React, { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"

const SindleReview = ({ productId }) => {
  const [reviews, setReviews] = useState(null)
  const [show, setShow] = useState(false)
  console.log(productId)
  // console.log(reviews)

  const [comment, setComment] = useState("")
  const [rate, setRate] = useState("")

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // const getReviews = async () => {
  //   let url = `${process.env.REACT_APP_URL}/products/${product_Id}`
  //   try {
  //     let res = await fetch(url)
  //     let data = await res.json()
  //     console.log(data)
  //     return data
  //     //setReviews(data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const editReviews = async (reviewId) => {
    let url = `${process.env.REACT_APP_URL}/reviews/${reviewId}`
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
      return data
    } catch (error) {
      console.log(error)
    }
  }
  const deleteReviews = async (reviewId) => {
    let url = `${process.env.REACT_APP_URL}/reviews/${reviewId}`
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

  useEffect(() => {
    //setProducts(location.state.productItem)
    //getReviews().then((review) => {
    //console.log(review)
    //setReviews(review)
    // })
  }, [productId])
  return (
    <>
      <ListGroup>
        {productId && productId.length > 0 ? (
          productId.map((review, i) => (
            <ListGroup.Item key={i} className='d-flex justify-content-between'>
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
                  onClick={() => deleteReviews(review._id)}></i>
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
                        <Form.Label>Add Cooment</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Comment'
                          defaultValue={comment}
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
                          defaultValue={rate}
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
                      handleClose()
                    }}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No review</ListGroup.Item>
        )}
      </ListGroup>
    </>
  )
}

export default SindleReview
