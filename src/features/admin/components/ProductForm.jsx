import React, { useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync,
} from "../../product/productListSlice";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export const ProductForm = () => {
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const selectedProduct = useSelector(selectProductById);

  useEffect(() => {
    {
      if (params.id) {
        dispatch(fetchProductByIdAsync(params.id));
      }
    }
  }, [dispatch, params.id]);
  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("stock", selectedProduct.stock);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("image1", selectedProduct?.images[0]);
      setValue("image2", selectedProduct?.images[1]);
      setValue("image3", selectedProduct?.images[2]);
    }
  }, [selectedProduct, setValue, params.id]);

  const handleDelete = (index) => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
    navigate("/admin");
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const product = { ...data };
        product.images = [
          product.image1,
          product.image2,
          product.image3,
          product.thumbnail,
        ];
        delete product.image1;
        delete product.image2;
        delete product.image3;
        product.price = parseInt(product.price);
        product.discountPercentage = parseInt(product.discountPercentage);
        product.stock = parseInt(product.stock);

        console.log(product);
        if (params.id) {
          dispatch(
            updateProductAsync({
              id: params.id,
              ...selectedProduct,
              ...product,
            })
          );
        } else {
          dispatch(createProductAsync({ ...product, rating: 0 }));
        }
        reset();

        // navigate("/admin");
      })}
    >
      <div className="space-y-12 p-10 bg-white">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Add New Product
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4  ">
              <label
                htmlFor="title"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Product Name
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  {...register("title", {
                    required: "Title is required",
                  })}
                  type="text"
                  placeholder="Priyesh"
                  className="block w-full grow py-1.5 pl-1  text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 rounded-md "
                />
              </div>
            </div>

            <div className="sm:col-span-4  ">
              <label
                htmlFor="description"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write a few sentences description of Products.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 w-full justify-between">
              <div className="sm:col-span-3 w-full sm:w-1/3">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    {...register("price", {
                      required: "Price is required",
                      min: 0,
                    })}
                    type="number"
                    placeholder="1000"
                    className="block w-full py-1.5 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-3 w-full sm:w-1/3">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium text-gray-900"
                >
                  Discount Percentage
                </label>
                <div className="mt-2">
                  <input
                    id="discountPercentage"
                    {...register("discountPercentage", {
                      required: "Discount Percentage is required",
                    })}
                    type="text"
                    placeholder="30"
                    className="block w-full py-1.5 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-3 w-full sm:w-1/3">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    id="stock"
                    {...register("stock", {
                      required: "Stock is required",
                    })}
                    type="text"
                    placeholder="4"
                    className="block w-full py-1.5 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4  ">
              <label
                htmlFor="brand"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Brand
              </label>
              <div className="mt-2">
                <select
                  id="brand"
                  {...register("brand", {
                    required: "Brand is required",
                  })}
                  className="block w-full grow py-1.5 pl-1  text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 rounded-md"
                >
                  <option value="" defaultChecked>
                    Choose Brand
                  </option>
                  {brands.map((item, index) => {
                    return (
                      <option value={item.value} key={index}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="sm:col-span-4  ">
              <label
                htmlFor="category"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="block w-full grow py-1.5 pl-1  text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 rounded-md"
                >
                  <option value="" defaultChecked>
                    Choose Category
                  </option>
                  {categories.map((item, index) => {
                    return (
                      <option value={item.value} key={index}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="sm:col-span-4  ">
              <label
                htmlFor="thumbnail"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Thumbnail Url
              </label>
              <div className="mt-2">
                <input
                  id="thumbnail"
                  {...register("thumbnail", {
                    required: "Thumbnail is required",
                  })}
                  type="text"
                  placeholder="www.example.com"
                  className="block w-full grow py-1.5 pl-1  text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 rounded-md "
                />
              </div>
            </div>
            <div className="sm:col-span-4  ">
              <label
                htmlFor="image1"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Image1 Url
              </label>
              <div className="mt-2">
                <input
                  id="image1"
                  {...register("image1", {
                    required: "Image1 is required",
                  })}
                  type="text"
                  placeholder="www.example.com"
                  className="block w-full grow py-1.5 pl-1  text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 rounded-md "
                />
              </div>
            </div>
            <div className="sm:col-span-4  ">
              <label
                htmlFor="image2"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Image2 Url
              </label>
              <div className="mt-2">
                <input
                  id="image2"
                  {...register("image2")}
                  type="text"
                  placeholder="www.example.com"
                  className="block w-full grow py-1.5 pl-1  text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 rounded-md "
                />
              </div>
            </div>
            <div className="sm:col-span-4  ">
              <label
                htmlFor="image3"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Image3 Url
              </label>
              <div className="mt-2">
                <input
                  id="image3"
                  {...register("image3")}
                  type="text"
                  placeholder="www.example.com"
                  className="block w-full grow py-1.5 pl-1  text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 rounded-md "
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Country
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  id="street-address"
                  name="street-address"
                  type="text"
                  autoComplete="street-address"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm/6 font-medium text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm/6 font-medium text-gray-900"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="region"
                  name="region"
                  type="text"
                  autoComplete="address-level1"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm/6 font-medium text-gray-900"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  id="postal-code"
                  name="postal-code"
                  type="text"
                  autoComplete="postal-code"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Notifications
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            We'll always let you know description important changes, but you
            pick what else you want to hear description.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm/6 font-semibold text-gray-900">
                By email
              </legend>
              <div className="mt-6 space-y-6">
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        defaultChecked
                        id="comments"
                        name="comments"
                        type="checkbox"
                        aria-describedby="comments-description"
                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-[:checked]:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-[:indeterminate]:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-900"
                    >
                      Comments
                    </label>
                    <p id="comments-description" className="text-gray-500">
                      Get notified when someones posts a comment on a posting.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        aria-describedby="candidates-description"
                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-[:checked]:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-[:indeterminate]:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label
                      htmlFor="candidates"
                      className="font-medium text-gray-900"
                    >
                      Candidates
                    </label>
                    <p id="candidates-description" className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        aria-describedby="offers-description"
                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-[:checked]:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-[:indeterminate]:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label
                      htmlFor="offers"
                      className="font-medium text-gray-900"
                    >
                      Offers
                    </label>
                    <p id="offers-description" className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm/6 font-semibold text-gray-900">
                Push notifications
              </legend>
              <p className="mt-1 text-sm/6 text-gray-600">
                These are delivered via SMS to your mobile phone.
              </p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    defaultChecked
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                  />
                  <label
                    htmlFor="push-everything"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Everything
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                  />
                  <label
                    htmlFor="push-email"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Same as email
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                  />
                  <label
                    htmlFor="push-nothing"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div> */}
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600"
        >
          Cancel
        </button>
        {params.id && (
          <button
            onClick={() => {
              handleDelete(params.id);
            }}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Delete
          </button>
        )}
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};
