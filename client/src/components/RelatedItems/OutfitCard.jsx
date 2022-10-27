import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from '../Ratings&Reviews/Ratings/StarRating.jsx';

const OutfitCard = ({ outfit, calcRating, saleAndImageSetter, renderPrice, updateProduct, removeOutfit }) => {
  const [product, setProduct] = useState(outfit);
  const [rating, setRating] = useState();
  const [originalPrice, setOriginalPrice] = useState();
  const [salesPrice, setSalesPrice] = useState(null);
  const [imgURL, setImgURL] = useState();


  useEffect(() => {
    // console.log('prodReviews', getProductReviews(product.id))
    // const reviews = Requests.getProductReviews(product.id);
    // const avgRating = calcRating(reviews);
    // setRating(avgRating)
    // functions.setRating(avgRating)


/* INTEGRATION // DELETE AFTER SEEN
    Edit rating to be same as all other files.
 */
    axios.get(`reviews/meta/${product.id}`)
      .then(result => {
        let ratings = result.data.ratings;
        setRating(calcRating(ratings));
      });
    axios.get(`/products/${product.id}/styles`)
      .then(result => {
        let styles = result.data.results;
        const { sale, ogPrice, thumbnailURL } = saleAndImageSetter(styles);

        setOriginalPrice(ogPrice);
        setSalesPrice(sale);
        setImgURL(thumbnailURL);
      });
  }, []);

  return (
    <div className="card card-shadow" onClick={() => updateProduct(event, product.id)}>
      <button
        className="favorite-icon"
        value={product.id}
        onClick={removeOutfit}>
        ❌
      </button>
      <div className="card-image">
        {imgURL === null && <div className="no-image">Image not available</div>}
        {imgURL && <img src={imgURL}/>}
      </div>
      <p className="card-category">{outfit.category}</p>
      <div className="card-name">{outfit.name}</div>
      {renderPrice(salesPrice, originalPrice)}
      <div className="card-rating"><StarRating rating={rating}/></div>
    </div>
  );
};

export default OutfitCard;