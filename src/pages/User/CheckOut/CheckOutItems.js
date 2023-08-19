import React from "react";
import { useDispatch } from "react-redux";
import { removeCart } from "../../../features/cart/addToCartSlice";

export const CheckOutItems = ({ item }) => {
  const { _id, name, picture, quantity, price } = item || {};
  const dispatch = useDispatch();

  //remove cart item handler
  const removeCartItemHandler = (id) => {
    dispatch(removeCart(id));
  };

  return (
    <tr className="bg-white border-b  hover:bg-gray-50">
      <th scope="row" className="px-6 py-4 ">
        <img
          src={`${process.env.REACT_APP_BASE_URL}/uploads/${picture}`}
          alt="product"
          className="w-20 h-20 object-cover rounded-md"
        />
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-600 whitespace-nowrap"
      >
        {name?.substring(0, 25)}
      </th>
      <td className="px-6 py-4">${price}</td>
      <td className="px-6 py-4">
        <div className="flex bg-green-700 rounded-md overflow-hidden">
          <button
            disabled={quantity <= 1}
            className="bg-green-900 text-white py-1 px-3"
          >
            {" "}
            -{" "}
          </button>
          <input
            type="text"
            name="quantity"
            value={quantity}
            className=" w-10 bg-transparent text-gray-100 font-normal text-2xl text-center focus:outline-none"
          />
          <button className="bg-green-900 text-white py-1 px-3"> + </button>
        </div>
      </td>
      <td className="px-6 py-4">${price * quantity}</td>
      <td className="px-6 py-4 " onClick={() => removeCartItemHandler(_id)}>
        <button className="text-red-600">X</button>
      </td>
    </tr>
  );
};
