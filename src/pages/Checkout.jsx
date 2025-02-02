import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "../features/cart/cartSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Grid } from "react-loader-spinner";
import { updateUserAsync } from "../features/auth/authSlice";
import {
  createOrderAsync,
  selectCurrentOrder,
  selectStatus,
} from "../features/order/orderSlice";
// import { SelectUserInfo } from "../features/user/UserSlice";

import { selectUserInfo } from "../features/user/UserSlice";

function Checkout() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const user = useSelector(selectUserInfo);
  const items = useSelector(selectItems);
  const status = useSelector(selectStatus);
  const currentOrder = useSelector(selectCurrentOrder);

  const totalAmount = items.reduce(
    (amount, item) => item.product.discountPrice * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  const handleAddress = (e) => {
    console.log(e.target.value);
    setSelectedAddress(user.address[e.target.value]);
  };

  const handlePayment = (e) => {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  const handleOrder = (e) => {
    if (selectedAddress && paymentMethod) {
      const order = {
        items,
        totalAmount,
        totalItems,
        user: user.id,
        paymentMethod,
        selectedAddress,
        status: "pending", // other status can be delivered, received.
      };
      dispatch(createOrderAsync(order));
      // need to redirect from here to a new page of order success.
    } else {
      alert("Enter Address and Payment method");
    }
  };

  return (
    <>
      {!items.length && <Navigate to="/" replace={true} />}
      {currentOrder && currentOrder.paymentMethod === "cash" && (
        <Navigate to={`/order-success/${currentOrder.id}`} replace={true} />
      )}
      {currentOrder && currentOrder.paymentMethod === "card" && (
        <Navigate to={`/stripe-checkout/`} replace={true} />
      )}

      {status === "loading" ? (
        <Grid
          height="80"
          width="80"
          color="rgb(79, 70, 229)"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <div className="bg-white py-12 mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <form
                className="bg-gray-50 shadow-lg rounded-lg p-6"
                noValidate
                onSubmit={handleSubmit((data) => {
                  console.log(data);
                  dispatch(
                    updateUserAsync({
                      ...user,
                      address: [...user.address, data],
                    })
                  );
                  reset();
                })}
              >
                <div className="space-y-12">
                  <div className="border-b border-gray-300 pb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Full name
                        </label>
                        <input
                          type="text"
                          {...register("name", {
                            required: "Name is required",
                          })}
                          id="name"
                          className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          id="email"
                          {...register("email", {
                            required: "Email is required",
                          })}
                          type="email"
                          className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  text-gray-900"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone
                        </label>
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "Phone is required",
                          })}
                          type="tel"
                          className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  text-gray-900"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Street address
                        </label>
                        <input
                          type="text"
                          {...register("street", {
                            required: "Street is required",
                          })}
                          id="street"
                          className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  text-gray-900"
                        />
                        {errors.street && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.street.message}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          {...register("city", {
                            required: "City is required",
                          })}
                          id="city"
                          className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  text-gray-900"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.city.message}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-gray-700"
                        >
                          State / Province
                        </label>
                        <input
                          type="text"
                          {...register("state", {
                            required: "State is required",
                          })}
                          id="state"
                          className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  text-gray-900"
                        />
                        {errors.state && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.state.message}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="pinCode"
                          className="block text-sm font-medium text-gray-700"
                        >
                          ZIP / Postal code
                        </label>
                        <input
                          type="text"
                          {...register("pinCode", {
                            required: "ZIP / Postal code is required",
                          })}
                          id="pinCode"
                          className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  text-gray-900"
                        />
                        {errors.pinCode && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.pinCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold text-gray-900"
                      onClick={() => reset()}
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-12 p-6 bg-gray-50 shadow-lg rounded-xl">
                <h2 className="text-2xl font-bold text-gray-900">Address</h2>
                <p className="my-2 text-base  text-red-950 font-bold">
                  Choose from existing addresses
                </p>
                <ul className="space-y-4">
                  {user?.address?.map((address, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center gap-x-4 p-5 border-2 border-gray-300 rounded-xl hover:shadow-lg transition duration-300"
                    >
                      <div className="flex items-center">
                        <input
                          onChange={handleAddress}
                          name="address"
                          type="radio"
                          value={index}
                          className="h-5 w-5 text-indigo-600 focus:ring-indigo-600"
                        />
                        <div className="ml-4">
                          <p className="text-base font-semibold text-red-950 font-bold">
                            {address.name}
                          </p>
                          <p className="text-sm text-gray-800">
                            {address.email}
                          </p>
                          <p className="text-sm text-gray-800">
                            {address.street}
                          </p>
                          <p className="text-sm text-gray-800">
                            {address.pinCode}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-800 flex-nowrap">
                          Phone: {address.phone}
                        </p>
                        <p className="text-sm text-gray-800">{address.city}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 p-6 bg-white shadow-lg rounded-xl">
                  <fieldset>
                    <legend className="text-lg font-bold text-gray-900">
                      Payment Methods
                    </legend>
                    <p className="mt-2 text-sm text-gray-600">Choose one</p>
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                        <input
                          id="cash"
                          name="payments"
                          type="radio"
                          onChange={handlePayment}
                          value="cash"
                          checked={paymentMethod === "cash"}
                          className="h-5 w-5 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="cash"
                          className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                        >
                          Cash
                        </label>
                      </div>
                      <div className="flex items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                        <input
                          id="card"
                          name="payments"
                          type="radio"
                          onChange={handlePayment}
                          value="card"
                          checked={paymentMethod === "card"}
                          className="h-5 w-5 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="card"
                          className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                        >
                          Card Payment
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="mx-auto  bg-gray-50 max-w-7xl px-4 sm:px-6 lg:px-8 shadow-md rounded-lg">
                <div className="border-t border-gray-200 py-6">
                  <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                    Cart
                  </h1>
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-300 shadow-sm">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a
                                    href={item.product.id}
                                    className="hover:underline"
                                  >
                                    {item.product.title}
                                  </a>
                                </h3>
                                <p className="ml-4 text-lg">
                                  ${item.product.discountPrice}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty
                                </label>
                                <select
                                  onChange={(e) => handleQuantity(e, item)}
                                  value={item.quantity}
                                  className="rounded-md border border-gray-300 py-1 px-2 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                  {[1, 2, 3, 4, 5].map((qty) => (
                                    <option key={qty} value={qty}>
                                      {qty}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="flex">
                                <button
                                  onClick={(e) => handleRemove(e, item.id)}
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between my-4 text-lg font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$ {totalAmount}</p>
                  </div>
                  <div className="flex justify-between my-4 text-lg font-medium text-gray-900">
                    <p>Total Items in Cart</p>
                    <p>{totalItems} items</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <div
                      onClick={handleOrder}
                      className="flex cursor-pointer items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 transition duration-300 ease-in-out"
                    >
                      Order Now
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <Link to="/">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-200 ml-1"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
