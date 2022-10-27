import React, { useState } from 'react';
import AddReviewModal from './AddReviewModal.jsx';

const AddReviewButton = ({ product_id, prodName, addReview, metaData }) => {

  const [ isOpen, setIsOpen ] = useState(false);

  const closeModal = (event) => {
    event.stopPropagation();
    setIsOpen(false);
  };

  const onAddReviewClick = () => {
    setIsOpen(true);
  }

  return (
    <>
    <button onClick={onAddReviewClick}>
      Add Review
      <AddReviewModal open={isOpen} onClose={closeModal} product_id={product_id} prodName={prodName} addReview={addReview} metaData={metaData} />
    </button>
    </>
  )
}

export default AddReviewButton;
