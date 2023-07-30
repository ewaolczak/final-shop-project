import CartSummary from '../../features/CartSummary/CartSummary';
import { useSelector, useDispatch } from 'react-redux';
import {
  getOrders,
  getOrdersProduct,
  postOrderRequest,
  addUserinfoToOrder,
} from '../../../redux/orderRedux';
import Button from 'react-bootstrap/esm/Button';
import { useState, useEffect } from 'react';
import CartTotalCost from '../../features/CartTotalCost/CartTotalCost';
import { useForm } from 'react-hook-form';
import {
  NAME_MAX_LENGTH,
  ADDRESS_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PHONE_MIN_LENGTH,
  PHONE_MAX_LENGTH,
} from '../../../config';

const Summary = () => {
  const products = useSelector(getOrdersProduct);
  const order = useSelector(getOrders);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const userinfo = { name, address, email, phone };
    dispatch(addUserinfoToOrder(userinfo));
  }, [dispatch, name, address, email, phone]);

  const handleSubmit = () => {
    dispatch(postOrderRequest(order));
  };

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  if (!products || products.length === 0) {
    return <div className="container">There are no products in your cart</div>;
  } else {
    return (
      <>
        <div>
          <h2> Your order:</h2>
          {products.map((product) => {
            return (
              <CartSummary
                editable={false}
                key={product.productId}
                {...product}
              ></CartSummary>
            );
          })}
        </div>
        <div className="row justify-content-center">
          <CartTotalCost></CartTotalCost>
        </div>
        <div className="row justify-content-center">
          <form
            onSubmit={validate(handleSubmit)}
            className="col-12 col-sm-8 col-lg-4 row justify-content-between"
          >
            <div className="col-12 pr-0 my-1 row justify-content-between">
              <label htmlFor="name" className="col-4 col-sm-3 mb-0 px-0">
                Name:
              </label>
              <input
                {...register('name', {
                  required: 'You must provide your name',
                  maxLength: {
                    value: NAME_MAX_LENGTH,
                    message: `The name cannot be longer than ${NAME_MAX_LENGTH} characters`,
                  },
                })}
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-8 col-sm-9"
              ></input>
              <div className="col-12 text-center px-0">
                {errors.name && (
                  <span className="d-block form-text text-danger mt-0 mb-3">
                    {errors.name.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-12 pr-0 my-1 row justify-content-between">
              <label htmlFor="address" className="col-4 col-sm-3 mb-0 px-0">
                Address:
              </label>
              <input
                {...register('address', {
                  required: 'You must provide your address',
                  maxLength: {
                    value: ADDRESS_MAX_LENGTH,
                    message: `The address cannot be longer than ${ADDRESS_MAX_LENGTH} characters`,
                  },
                })}
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="col-8 col-sm-9"
              ></input>
              <div className="col-12 text-center px-0">
                {errors.address && (
                  <span className="d-block form-text text-danger mt-0 mb-3">
                    {errors.address.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-12 pr-0 my-1 row justify-content-between">
              <label htmlFor="email" className="col-4 col-sm-3 mb-0 px-0">
                Email:
              </label>
              <input
                {...register('email', {
                  required: 'You must provide your email',
                  maxLength: {
                    value: EMAIL_MAX_LENGTH,
                    message: `The email cannot be longer than ${EMAIL_MAX_LENGTH} characters`,
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: `The email format is invalid`,
                  },
                })}
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-8 col-sm-9"
              ></input>
              <div className="col-12 text-center px-0">
                {errors.email && (
                  <span className="d-block form-text text-danger mt-0 mb-3">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-12 pr-0 my-1 row justify-content-between">
              <label htmlFor="phone" className="col-4 col-sm-3 mb-0 px-0">
                Phone:
              </label>
              <input
                {...register('phone', {
                  required: 'You must provide your phone',
                  minLength: {
                    value: PHONE_MIN_LENGTH,
                    message: `The phone must be longer than ${PHONE_MIN_LENGTH} characters`,
                  },
                  maxLength: {
                    value: PHONE_MAX_LENGTH,
                    message: `The phone cannot be longer than ${PHONE_MAX_LENGTH} characters`,
                  },
                })}
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="col-8 col-sm-9"
              ></input>
              <div className="col-12 text-center px-0">
                {errors.phone && (
                  <span className="d-block form-text text-danger mt-0 mb-3">
                    {errors.phone.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-12 text-center my-3">
              <Button type="submit">Order</Button>
            </div>
          </form>
        </div>
      </>
    );
  }
};

export default Summary;
