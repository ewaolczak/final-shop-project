import { useEffect } from 'react';
import { PRODUCT_MAX_ORDER, PRODUCT_MIN_ORDER } from '../../../config';

const AmountInput = ({ editable, value, onChangeFunc }) => {
  useEffect(() => {
    const number = parseInt(value);
    const min = PRODUCT_MIN_ORDER;
    const max = PRODUCT_MAX_ORDER;
    if (!isNaN(number)) {
      const validatedNumber = Math.min(Math.max(number, min), max);
      onChangeFunc(validatedNumber);
    } else {
      onChangeFunc(1);
    }
  }, [value, onChangeFunc]);

  return (
    <div className="mx-2">
      <input
        className="w-100"
        disabled={!editable}
        value={value}
        onChange={(e) => onChangeFunc(e.target.value)}
        type="number"
      ></input>
    </div>
  );
};

export default AmountInput;
