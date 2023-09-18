import * as React from 'react';
import { useState, useEffect } from 'react';
import { isAuthenticate } from '../../utils';
import { Link, useNavigate } from 'react-router-dom';
import LeaveRequestService from '../../services/leaveRequest';
import LeaveRequestTypeService from '../../services/leaveRequestType';
import CreateLeaveRequest from './Modal/CreateLeaveRequest';

function Home() {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [leaveRequestTypes, setLeaveRequestTypes] = useState([]);
    const [paginate, setPaginate] = useState({
        page: 1,
        last_page: 0,
        limit: 10,
        search: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchData, setIsFetchData] = useState<any>(false);
    const [showModalCreate, setShowModalCreate] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchData = async () => {
        try {
            await fetchLeaveRequest();
            await fetchLeaveRequestType();
        } catch (error) {
            console.log(error);
        }
    };

    const fetchLeaveRequest = async () => {
        try {
            setIsLoading(true);
            const leaveRequestsResponse: any = await LeaveRequestService.index(
                {},
                paginate,
            );
            setLeaveRequests(leaveRequestsResponse.data.data.data);
            setPaginate({
                ...paginate,
                page: leaveRequestsResponse.data.data.page,
                last_page: leaveRequestsResponse.data.data.last_page,
                limit: leaveRequestsResponse.data.data.limit,
            });
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchLeaveRequestType = async () => {
        try {
            const leaveRequestsResponse: any =
                await LeaveRequestTypeService.index({});
            setLeaveRequestTypes(leaveRequestsResponse.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetchData]);

    return (
        <>
            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full mb-1">
                    <div className="mb-4">
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                            Leave requests
                        </h1>
                    </div>
                    <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                        <div className="flex items-center mb-4 sm:mb-0">
                            <form className="sm:pr-3" action="#" method="GET">
                                <label
                                    htmlFor="products-search"
                                    className="sr-only"
                                >
                                    Search
                                </label>
                                <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                                    <input
                                        type="text"
                                        name="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Search for products"
                                    />
                                </div>
                            </form>
                            <div className="flex items-center w-full sm:justify-end">
                                <div className="flex pl-2 space-x-1">
                                    <Link
                                        to="/"
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
                                    </Link>
                                    <Link
                                        to="/"
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
                                    </Link>
                                    <Link
                                        to="/"
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
                                    </Link>
                                    <Link
                                        to="/"
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
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <button
                            className="text-white bg-indigo-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                            type="button"
                            onClick={() => {
                                setShowModalCreate(true);
                            }}
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
                            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
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
                                            Request leave type
                                        </th>
                                        <th
                                            scope="col"
                                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                        >
                                            Start date
                                        </th>
                                        <th
                                            scope="col"
                                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                        >
                                            End date
                                        </th>
                                        <th
                                            scope="col"
                                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                        >
                                            Status
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
                                    {!isLoading ? (
                                        <>
                                            {leaveRequests.map(
                                                (value: any, index: any) => {
                                                    return (
                                                        <tr
                                                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                                            key={index}
                                                        >
                                                            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {value.id}
                                                            </td>
                                                            <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                                                                {
                                                                    value
                                                                        .leave_request_type
                                                                        .title
                                                                }
                                                            </td>
                                                            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {
                                                                    value.start_date
                                                                }
                                                            </td>
                                                            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {value.end_date}
                                                            </td>
                                                            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {value.status ===
                                                                0
                                                                    ? 'pending'
                                                                    : ''}
                                                                {value.status ===
                                                                1
                                                                    ? 'accept'
                                                                    : ''}
                                                                {value.status ===
                                                                2
                                                                    ? 'reject'
                                                                    : ''}
                                                            </td>
                                                            <td className="p-4 space-x-2 whitespace-nowrap">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-indigo-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
                                                    );
                                                },
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </tbody>
                            </table>
                            {isLoading ? (
                                <>
                                    {' '}
                                    <div className="flex items-center justify-center py-5">
                                        <div role="status">
                                            <svg
                                                aria-hidden="true"
                                                className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentFill"
                                                />
                                            </svg>
                                            <span className="sr-only">
                                                Loading...
                                            </span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center mb-4 sm:mb-0">
                    <button
                        onClick={async () => {
                            if (paginate.page > 1) {
                                setIsFetchData(!isFetchData);
                                setPaginate({
                                    ...paginate,
                                    page: paginate.page - 1,
                                });
                                await fetchLeaveRequestType();
                            }
                        }}
                        className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <svg
                            className="w-7 h-7"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={async () => {
                            if (paginate.page < paginate.last_page) {
                                setIsFetchData(!isFetchData);
                                setPaginate({
                                    ...paginate,
                                    page: paginate.page + 1,
                                });
                                await fetchLeaveRequestType();
                            }
                        }}
                        className="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <svg
                            className="w-7 h-7"
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
                    </button>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Showing{' '}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            1-20
                        </span>{' '}
                        of{' '}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            2290
                        </span>
                    </span>
                </div>
            </div>
            {showModalCreate === true && (
                <CreateLeaveRequest setShowModal={setShowModalCreate} />
            )}
        </>
    );
}

export default Home;
