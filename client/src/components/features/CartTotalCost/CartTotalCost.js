import { useDispatch, useSelector } from 'react-redux';
import {
  addUserinfoToOrder,
  getOrdersProduct,
} from '../../../redux/orderRedux';
import { useState, useEffect } from 'react';

const CartTotalCost = () => {
  const products = useSelector(getOrdersProduct);
  const [totalCost, setTotalCost] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setTotalCost(
      products.reduce(
        (acc, product) => acc + product.orderedAmount * product.price,
        0,
      ),
    );

    dispatch(addUserinfoToOrder({ totalCost }));
  }, [dispatch, products, totalCost]);

  return (
    <div className="text-uppercase my-3 text-center">
      <h5>Total order cost: {totalCost}</h5>
    </div>
  );
};

export default CartTotalCost;
