import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const ProductSummary = ({ id, name, price, images }) => {
  return (
    <>
      <div
        className="card col-12 col-md-4 col-sm-6 p-1 border-0"
        style={{ height: '450px' }}
      >
        <div className="card-body overflow-hidden" style={{ height: '300px' }}>
          <img
            src={images?.[0]?.url}
            alt="product"
            className="card-img-top"
            style={{ height: '100%', objectFit: 'contain' }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title text-center">{name}</h5>
          <div className="row justify-content-around">
            <p className="card-text text-center mb-2">Price: {price}</p>
          </div>
          <Link to={`product/${id}`}>
            <Button className="col-12 card-text" variant='warning'>Read More</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductSummary;
