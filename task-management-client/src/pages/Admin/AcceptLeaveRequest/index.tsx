import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeaveRequestService from '../../../services/admin/leaveRequest';
import { toast } from 'react-toastify';
import DetailLeaveRequest from '../AcceptLeaveRequest/Modal/DetailLeaveRequest';
import { isHaveRole } from '../../../utils';
import { ROLE_ADMIN, ROLE_MANAGER } from '../../../constants/user';
import PaginateSearch from '../../../components/Paginate/PaginateSearch';
import PaginateSort from '../../../components/Paginate/PaginateSort';
import PaginateFooter from '../../../components/Paginate/PaginateFooter';
import Loading from '../../../components/Loading';
import Table from '../../../components/Table';
import TableData from '../../../components/Table/TableData';
import TableButton from '../../../components/Table/TableButton';
import Modal from '../../../components/Modal';
import CreateLeaveRequest from './Modal/CreateLeaveRequest';
import LeaveRequestTypeService from '../../../services/leaveRequestType';
import UserService from '../../../services/admin/user';

const tableHeaders = ['ID', 'Content', 'Request leave type', 'User', 'Leave registration date', 'Status', 'Actions']

function LeaveRequest() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);
    const [isFetchData, setIsFetchData] = useState<any>(false);

    const [leaveRequests, setLeaveRequests] = useState([]);
    const [leaveRequest, setLeaveRequest] = useState([]);
    const [leaveRequestTypes, setLeaveRequestTypes] = useState([]);
    const [users, setUsers] = useState([]);

    const [paginate, setPaginate] = useState({
        page: 1,
        per_page: 10,
        search: '',
        sort: '',
        leave_request_status: 0,
        last_page: 0,
        total: 0,
    });

    const [showModalDetail, setShowModalDetail] = useState(false)
    const [showModalCreate, setShowModalCreate] = useState(false)

    const getLeaveRequest = async (id: any) => {
        try {
            const leaveRequestResponse: any = await LeaveRequestService.show({}, id)
            setLeaveRequest(leaveRequestResponse.data.data)
            setShowModalDetail(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateStatus = async (id: any, status: any) => {
        try {
            await LeaveRequestService.accept({ status }, id)
            toast('Update status success')
            setIsFetchData(!isFetchData)
        } catch (error) {
            toast('Update status failed')
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const leaveRequestsResponse: any = await LeaveRequestService.index(
                {},
                paginate,
            );
            setLeaveRequests(leaveRequestsResponse.data.data.data);
            setPaginate({
                ...paginate,
                page: leaveRequestsResponse.data.data.current_page,
                last_page: leaveRequestsResponse.data.data.last_page,
                per_page: leaveRequestsResponse.data.data.per_page,
                total: leaveRequestsResponse.data.data.total,
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

    const fetchUser = async () => {
        try {
            const userResponse: any =
                await UserService.list();
            setUsers(userResponse.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const isAuth = isHaveRole([ROLE_ADMIN, ROLE_MANAGER]);
        if (!isAuth) navigate('/');
        fetchData();
        fetchLeaveRequestType();
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetchData]);

    return (
        <>
            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full mb-1">
                    <div className="mb-4">
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                            Accept leave request
                        </h1>
                    </div>
                    <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                        <div className="flex items-center mb-4 sm:mb-0">
                            <PaginateSearch callback={(e: any) => {
                                setIsFetchData(!isFetchData);
                                setPaginate({
                                    ...paginate,
                                    search: e.target.value,
                                });
                            }} />
                            <PaginateSort callback={(e: any) => {
                                setIsFetchData(!isFetchData);
                                setPaginate({
                                    ...paginate,
                                    sort: e.target.value,
                                });
                            }} />
                        </div>
                        <div className='flex gap-3'>
                            <button
                                className="text-white bg-indigo-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                type="button"
                                onClick={() => {
                                    setShowModalCreate(true);
                                }}
                            >
                                Add leave request
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            <Table
                                tableHeaders={tableHeaders}
                                data={
                                    <>
                                        {!isLoading && (
                                            <>
                                                {leaveRequests.map(
                                                    (value: any, index: any) => {
                                                        return (
                                                            <tr
                                                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                                                key={index}
                                                            >
                                                                <TableData data={value.id} />
                                                                <TableData data={value.content} />
                                                                <TableData data={value.leave_request_type.title} />
                                                                <TableData data={value.user.username} />
                                                                <TableData data={value.leave_registration_date} />
                                                                <TableData data={value.status_name} />
                                                                <td className="p-4 space-x-2 whitespace-nowrap">
                                                                    <TableButton
                                                                        styles='bg-indigo-500 hover:bg-primary-800 focus:ring-primary-300'
                                                                        callback={() => {
                                                                            getLeaveRequest(value.id)

                                                                        }}
                                                                        svg={<svg
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
                                                                        </svg>}
                                                                        title={`Details`}
                                                                    />
                                                                    <TableButton
                                                                        styles='bg-lime-500 hover:bg-primary-800 focus:ring-primary-300'
                                                                        callback={() => {
                                                                            handleUpdateStatus(value.id, 1)

                                                                        }}
                                                                        svg={<svg
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
                                                                        </svg>}
                                                                        title={`Accept`}
                                                                    />
                                                                    <TableButton
                                                                        styles='bg-red-700 hover:bg-red-800 focus:ring-red-300'
                                                                        callback={() => {
                                                                            handleUpdateStatus(value.id, 2)

                                                                        }}
                                                                        svg={<svg
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
                                                                        </svg>}
                                                                        title={`Reject`}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        );
                                                    },
                                                )}
                                            </>
                                        )}
                                    </>
                                }
                            />
                            {isLoading && <div className="flex items-center justify-center py-5"><Loading /></div>}
                        </div>
                    </div>
                </div>
            </div>

            <PaginateFooter paginate={paginate} setPaginate={setPaginate} isFetchData={isFetchData} setIsFetchData={setIsFetchData} />

            {showModalDetail && <Modal><DetailLeaveRequest setShowModal={setShowModalDetail} leaveRequest={leaveRequest} handleUpdateStatus={handleUpdateStatus} /></Modal>}
            {showModalCreate && <Modal><CreateLeaveRequest setShowModal={setShowModalCreate} leaveRequestTypes={leaveRequestTypes} users={users} isFetchData={isFetchData} setIsFetchData={setIsFetchData} /></Modal>}

        </>
    );
}

export default LeaveRequest;