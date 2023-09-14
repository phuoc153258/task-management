import * as React from 'react';
import { useState, useEffect } from 'react';

function Home() {
    return (<>
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full mb-1">
                <div className="mb-4">
                    <nav className="flex mb-5" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                            <li className="inline-flex items-center">
                                <a
                                    href="/"
                                    className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-5 h-5 mr-2.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    Home
                                </a>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg
                                        className="w-6 h-6 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <a
                                        href="/"
                                        className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        E-commerce
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg
                                        className="w-6 h-6 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span
                                        className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500"
                                        aria-current="page"
                                    >
                                        Products
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                        All products
                    </h1>
                </div>
                <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                    <div className="flex items-center mb-4 sm:mb-0">
                        <form className="sm:pr-3" action="#" method="GET">
                            <label htmlFor="products-search" className="sr-only">
                                Search
                            </label>
                            <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                                <input
                                    type="text"
                                    name="email"
                                    id="products-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Search for products"
                                />
                            </div>
                        </form>
                        <div className="flex items-center w-full sm:justify-end">
                            <div className="flex pl-2 space-x-1">
                                <a
                                    href="/"
                                    className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="/"
                                    className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="/"
                                    className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="/"
                                    className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <button
                        id="createProductButton"
                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                        type="button"
                        data-drawer-target="drawer-create-product-default"
                        data-drawer-show="drawer-create-product-default"
                        aria-controls="drawer-create-product-default"
                        data-drawer-placement="right"
                    >
                        Add new product
                    </button>
                </div>
            </div>
        </div>
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden shadow">
                        {"{"}
                        {"{"}&lt; products.inline &gt;{"}"}
                        {"}"}
                        {"{"}
                        {"{"}- range (index $.Site.Data "products") {"}"}
                        {"}"}
                        {"{"}
                        {"{"} end -{"}"}
                        {"}"}
                        {"{"}
                        {"{"}&lt; /products.inline &gt;{"}"}
                        {"}"}
                        <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" className="p-4">
                                        <div className="flex items-center">
                                            <input
                                                id="checkbox-all"
                                                aria-describedby="checkbox-1"
                                                type="checkbox"
                                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="checkbox-all" className="sr-only">
                                                checkbox
                                            </label>
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                    >
                                        Product Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                    >
                                        Technology
                                    </th>
                                    <th
                                        scope="col"
                                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                    >
                                        Description
                                    </th>
                                    <th
                                        scope="col"
                                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                    >
                                        ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                    >
                                        Price
                                    </th>
                                    <th
                                        scope="col"
                                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                    >
                                        Discount
                                    </th>
                                    <th
                                        scope="col"
                                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                id="checkbox-{{ .id }}"
                                                aria-describedby="checkbox-1"
                                                type="checkbox"
                                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="checkbox-{{ .id }}" className="sr-only">
                                                checkbox
                                            </label>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        <div className="text-base font-semibold text-gray-900 dark:text-white">
                                            {"{"}
                                            {"{"} .name {"}"}
                                            {"}"}
                                        </div>
                                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                            {"{"}
                                            {"{"} .category {"}"}
                                            {"}"}
                                        </div>
                                    </td>
                                    <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {"{"}
                                        {"{"} .technology {"}"}
                                        {"}"}
                                    </td>
                                    <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                                        {"{"}
                                        {"{"} .description {"}"}
                                        {"}"}
                                    </td>
                                    <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        #{"{"}
                                        {"{"} .id {"}"}
                                        {"}"}
                                    </td>
                                    <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {"{"}
                                        {"{"} .price {"}"}
                                        {"}"}
                                    </td>
                                    <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {"{"}
                                        {"{"} .discount {"}"}
                                        {"}"}
                                    </td>
                                    <td className="p-4 space-x-2 whitespace-nowrap">
                                        <button
                                            type="button"
                                            id="updateProductButton"
                                            data-drawer-target="drawer-update-product-default"
                                            data-drawer-show="drawer-update-product-default"
                                            aria-controls="drawer-update-product-default"
                                            data-drawer-placement="right"
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        >
                                            <svg
                                                className="w-4 h-4 mr-2"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                <path
                                                    fillRule="evenodd"
                                                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Update
                                        </button>
                                        <button
                                            type="button"
                                            id="deleteProductButton"
                                            data-drawer-target="drawer-delete-product-default"
                                            data-drawer-show="drawer-delete-product-default"
                                            aria-controls="drawer-delete-product-default"
                                            data-drawer-placement="right"
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                                        >
                                            <svg
                                                className="w-4 h-4 mr-2"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Delete item
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </>

    );
}

export default Home;
