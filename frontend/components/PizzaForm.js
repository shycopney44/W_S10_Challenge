import React, { useReducer } from 'react';
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

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;
    let valueToUse = type === 'checkbox' ? checked : value;
    dispatch({type: "UPDATE_FIELD", payload: { name, value: valueToUse }});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, size, ...toppings } = formState;
    const toppingsArray = [];
    for (const key in toppings) {
      if (toppings[key]) {
        toppingsArray.push(key);
      }}
    let requestBody = {
      fullName,
      size,
      toppings,
    };
    try {
      addOrder(requestBody);
      dispatch({ type: 'RESET_FORM' });
    } catch (error) {
      console.log(error);
  }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
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
