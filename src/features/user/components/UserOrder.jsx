import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrderAsync,
  SelectfetchLoggedOrders,
} from "../UserSlice";
import { selectLoggedInUser } from "../../auth/authSlice";

const UserOrder = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const orders = useSelector(SelectfetchLoggedOrders);
  console.log(orders, user, "ordersDet");
  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(user?.id));
  }, [dispatch, user]);
  return (
    <div>
      {orders.map((order, index) => {
        return (
          <div key={index}>
            <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 bg-white mt-12">
              {" "}
              {/* {!products.length && <Navigate to="/" replace={true} />} */}
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
                <h1 className="text-4xl my-10 mt-10 font-bold tracking-tight text-gray-900">
                  Order # {order.id}
                </h1>
                <h3 className="text-xl my-10 mt-10 font-bold tracking-tight text-red-900">
                  Order Status : {order.status}
                </h3>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.products.map((product, index) => (
                      <li key={index} className="flex py-6">
                        <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            alt={product.thumbnail}
                            src={product.images}
                            className="size-full object-cover"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>{product.title}</a>
                              </h3>
                              <p className="ml-4">{product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6"
                              >
                                Qty :{product.quantity}
                              </label>
                            </div>

                            <div className="flex"></div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${order.totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total items in Cart</p>
                  <p>{order.totalCount} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping Address</p>{" "}
                <li
                  key={index}
                  className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                >
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order?.selectedAddress?.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order?.selectedAddress?.street}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order?.selectedAddress?.pinCode}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {order?.selectedAddress?.phone}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {order?.selectedAddress?.city}
                    </p>
                  </div>
                </li>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserOrder;
