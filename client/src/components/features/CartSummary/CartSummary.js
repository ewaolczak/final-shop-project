import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editOrder, removeProductFromOrder } from '../../../redux/orderRedux';
import store from '../../../redux/store';
import AmountInput from '../AmountInput/AmountInput';

const CartSummary = ({
  productId,
  name,
  price,
  orderedAmount: productAmount,
  details,
  editable,
}) => {
  const [amountState, setAmountState] = useState(productAmount);
  const [detailsState, setDetailsState] = useState(details);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      editOrder({
        productId,
        orderedAmount: Number(amountState),
        details: detailsState,
      }),
    );

    const state = store.getState();
    localStorage.setItem('cartProducts', JSON.stringify(state.orders.products));
  }, [dispatch, productId, amountState, detailsState]);

  const handleRemove = () => {
    dispatch(removeProductFromOrder(productId));

    const state = store.getState();
    localStorage.setItem('cartProducts', JSON.stringify(state.orders.products));
  };

  return (
    <div className="col-12 mx-0 px-0 my-1 row border rounded align-items-center">
      <div className="col-6 col-sm-3 col-md-3 px-0 text-center">{name}</div>
      <div className="col-6 col-sm-3 col-md-1 px-0 m-0 text-center">
        Amount:
        <AmountInput
          editable={editable}
          value={amountState}
          onChangeFunc={setAmountState}
        ></AmountInput>
      </div>
      <div className="col-6 col-sm-3 col-md-1 px-0 text-center">
        Price:
        <br></br>
        {price}
      </div>
      <div className="col-6 col-sm-3 col-md-1 px-0 text-center">
        Total:
        <br></br>
        {price * productAmount}
      </div>
      <div className="col-12 col-sm-8 col-md-4 px-0 text-center">
        <textarea
          disabled={!editable}
          className="w-100"
          placeholder="Details regarding the product"
          value={detailsState}
          onChange={(e) => setDetailsState(e.target.value)}
          maxLength="100"
        ></textarea>
      </div>
      {editable && (
        <div className="col-12 col-sm-4 col-md-2 px-0 text-center">
          <Button onClick={handleRemove}>Remove</Button>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
