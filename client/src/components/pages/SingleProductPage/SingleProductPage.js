import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductById,
  loadProductByIdRequest,
} from '../../../redux/productRedux';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { addProductToOrder, getOrders } from '../../../redux/orderRedux';
import store from '../../../redux/store';
import AmountInput from '../../features/AmountInput/AmountInput';
import Spinner from 'react-bootstrap/Spinner';
import { getRequest } from '../../../redux/requestRedux';

const SingleProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => getProductById(state, id));
  const orders = useSelector(getOrders);
  const request = useSelector((state) =>
    getRequest(state, 'LOAD_PRODUCT_BY_ID'),
  );

  const [productAmount, setPrdouctAmount] = useState(1);

  useEffect(() => {
    dispatch(loadProductByIdRequest(id));
  }, [dispatch, id]);

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (orders?.products?.find((product) => product.productId === id)) {
      alert(
        'This product is already in your Cart. Visit the Cart to change its amount',
      );
    } else {
      dispatch(
        addProductToOrder({
          name: product.name,
          price: product.price,
          orderedAmount: Number(productAmount),
          productId: id,
          details: '',
        }),
      );

      const state = store.getState();
      localStorage.setItem(
        'cartProducts',
        JSON.stringify(state.orders.products),
      );
    }
  };

  if (!request || !request.success) {
    return (
      <Spinner
        animation="border"
        role="status"
        className="d-block mx-auto"
      ></Spinner>
    );
  } else {
    return (
      <>
        <div className="mt-5 container">
          <div className="row mt-5">
            <div className="col-12 col-lg-5 mt-3 text-center">
              <img
                src={product?.images[0]?.url}
                className="img-fluid"
                alt="product"
                style={{
                  height: '100%',
                  maxHeight: '600px',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div className="col-12 col-lg-7 mt-3">
              <div className="row col-12 justify-content-between">
                <h1>{product?.name}</h1>
                <h1>Price: {product?.price}</h1>
              </div>
              <p className="text-justify">{product?.description}</p>
              <div className="row no-gutters px-0 col-12 justify-content-between align-items-end ">
                <div className="col-12 col-sm-4 mb-1 px-1">
                  <img
                    src={product?.images[1]?.url}
                    className="img-fluid"
                    alt="product"
                    style={{
                      height: '100%',
                    }}
                  />
                </div>
                <div className="col-12 col-sm-4 mb-1 px-1">
                  <img
                    src={product?.images[2]?.url}
                    className="img-fluid"
                    alt="product"
                    style={{
                      height: '100%',
                    }}
                  />
                </div>
                <div className="col-12 col-sm-4 mb-1 px-1">
                  <img
                    src={product?.images[3]?.url}
                    className="img-fluid"
                    alt="product"
                    style={{
                      height: '100%',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 mt-2 row no-gutters justify-content-center">
              <form
                className="col-12 col-sm-9 mt-4 row justify-content-center"
                onSubmit={handleAddToCart}
              >
                <div className="col-12 col-sm-6 mt-2 row align-items-center justify-content-center">
                  <div className="px-2 text-right">Amount:</div>
                  <div className="col-5 col-sm-6 px-0">
                    <AmountInput
                      editable={true}
                      value={productAmount}
                      onChangeFunc={setPrdouctAmount}
                    ></AmountInput>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <Button type="submit" variant="outline-primary">
                    Add to cart
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default SingleProductPage;
