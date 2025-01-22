import React, { useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAddOrderMutation } from '../state/pizzaApi';
import { addPizzaOrder } from '../state/pizzaSlice';

const initialFormState = {
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
};

export default function PizzaForm() {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const dispatchRedux = useDispatch();
  const [addOrder, { isLoading, error }] = useAddOrderMutation();
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { name, value: type === 'checkbox' ? checked : value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, size, ...toppings } = formState;
    const validToppings = Object.keys(toppings).filter(key => toppings[key]);
    if (!fullName || fullName.length < 3 || fullName.length > 20) {
      setValidationError('sizemust be one of the following values: S, M, L');
      return;
    }
    if (!['S', 'M', 'L'].includes(size)) {
      setValidationError('Order failed: size must be one of the following values: S, M, L');
      return;
    }
    try {
      await addOrder({ fullName, size, toppings: validToppings }).unwrap();
      dispatchRedux(addPizzaOrder({ fullName, size, toppings: validToppings }));
      dispatch({ type: 'RESET_FORM' });
      setValidationError('');
    } catch (err) {
      console.error('Failed to submit order:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
      {validationError && <div className="failure">Order failed: {validationError}</div>}
      {error && <div className='failure'>Order failed: {error.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={formState.fullName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" value={formState.size} onChange={handleChange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" checked={formState['1']} onChange={handleChange} />
          Pepperoni<br />
        </label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" checked={formState['2']} onChange={handleChange} />
          Green Peppers<br />
        </label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" checked={formState['3']} onChange={handleChange} />
          Pineapple<br />
        </label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" checked={formState['4']} onChange={handleChange} />
          Mushrooms<br />
        </label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" checked={formState['5']} onChange={handleChange} />
          Ham<br />
        </label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  );
}
