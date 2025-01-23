import React, { useReducer, useState } from 'react';
import { useAddOrderMutation } from '../state/pizzaApi';

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
  const [addOrder, { isLoading, error }] = useAddOrderMutation();
  const [validationError, setValidationError] = useState({
    fullName: '',
    size: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    dispatch({ type: 'UPDATE_FIELD', payload: { name, value: valueToUse } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, size, ...toppings } = formState;
    const toppingsArray = Object.keys(toppings).filter((key) => toppings[key]);

    // Validate form fields
    const validationErrors = {};
    if (!fullName.trim()) {
      validationErrors.fullName = 'fullName is required';
    }
    if (!size) {
      validationErrors.size = 'size must be one of the following values: S, M, L';
    }

    // If errors exist, update validationError state and stop submission
    if (Object.keys(validationErrors).length > 0) {
      setValidationError(validationErrors);
      return;
    }

    // Clear validation errors and proceed with form submission
    setValidationError({ fullName: '', size: '' });

    const requestBody = { fullName, size, toppings: toppingsArray };

    try {
      await addOrder(requestBody);
      dispatch({ type: 'RESET_FORM' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className="pending">Order in progress...</div>}
      {error && <div className="failure">Order failed: {error.message}</div>}
      {validationError.fullName && (
        <div className="failure" data-testid="fullNameError">{validationError.fullName}</div>
      )}
      {validationError.size && (
        <div className="failure" data-testid="sizeError">{validationError.size}</div>
      )}

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
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            value={formState.size}
            onChange={handleChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input
            data-testid="checkPepperoni"
            name="1"
            type="checkbox"
            checked={formState['1']}
            onChange={handleChange}
          />
          Pepperoni<br />
        </label>
        <label>
          <input
            data-testid="checkGreenpeppers"
            name="2"
            type="checkbox"
            checked={formState['2']}
            onChange={handleChange}
          />
          Green Peppers<br />
        </label>
        <label>
          <input
            data-testid="checkPineapple"
            name="3"
            type="checkbox"
            checked={formState['3']}
            onChange={handleChange}
          />
          Pineapple<br />
        </label>
        <label>
          <input
            data-testid="checkMushrooms"
            name="4"
            type="checkbox"
            checked={formState['4']}
            onChange={handleChange}
          />
          Mushrooms<br />
        </label>
        <label>
          <input
            data-testid="checkHam"
            name="5"
            type="checkbox"
            checked={formState['5']}
            onChange={handleChange}
          />
          Ham<br />
        </label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  );
}
