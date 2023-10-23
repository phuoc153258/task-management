import * as React from 'react';
import { useState, useEffect } from 'react';
import LeaveRequestService from '../../services/leaveRequest';
import LeaveRequestTypeService from '../../services/leaveRequestType';
import CreateLeaveRequest from './Modal/CreateLeaveRequest';
import UpdateLeaveRequest from './Modal/UpdateLeaveRequest';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import Table from '../../components/Table';
import TableButton from '../../components/Table/TableButton';
import TableData from '../../components/Table/TableData';
import PaginateSearch from '../../components/Paginate/PaginateSearch';
import PaginateSort from '../../components/Paginate/PaginateSort';
import PaginateFooter from '../../components/Paginate/PaginateFooter';
import Modal from '../../components/Modal';
import ContentHeader from '../../components/ContentHeader';
import Button from '../../components/Button';

const tableHeaders = ['ID', 'Content', 'Request leave type', 'Leave registration date', 'Status', 'Actions']

function LeaveRequest() {

    const [isLoading, setIsLoading] = useState(true);
    const [isFetchData, setIsFetchData] = useState<any>(false);

    const [leaveRequests, setLeaveRequests] = useState([]);
    const [leaveRequestTypes, setLeaveRequestTypes] = useState([]);
    const [paginate, setPaginate] = useState({
        page: 1,
        per_page: 10,
        search: '',
        sort: '',
        last_page: 0,
        total: 0,
    });
    const [updateLeaveRequest, setUpdateLeaveRequest] = useState(null);

    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);

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

    const getLeaveRequest = async (id: any) => {
        try {
            const leaveRequestsResponse: any = await LeaveRequestService.show({}, id)
            setUpdateLeaveRequest(leaveRequestsResponse.data.data)
            setShowModalUpdate(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteLeaveRequest = async (id: any) => {
        try {
            if (window.confirm('Delete this leave request')) {
                await LeaveRequestService.delete({}, id)
                setIsFetchData(!isFetchData);
                toast('Delete leave request success');
            }
        } catch (error) {
            toast('Delete leave request failed')
        }
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetchData]);

    return (
        <>
            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full mb-1">
                    <ContentHeader title={'Leave requests'} />
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
                            <Button
                                title={'Add leave request'}
                                callback={() => {
                                    setShowModalCreate(true);
                                }}
                                isDisabled={false}
                                styles={'bg-indigo-500 focus:ring-primary-300 px-3 py-2 rounded-lg'}
                            />
                        </div>
                    </div>
                </div>
            </div >
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
                                                                        title={`Update`}
                                                                    />
                                                                    <TableButton
                                                                        styles='bg-red-700 hover:bg-red-800 focus:ring-red-300'
                                                                        callback={() => {
                                                                            handleDeleteLeaveRequest(value.id)
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
                                                                        title={`Delete item`}
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

            {showModalCreate && <Modal><CreateLeaveRequest setShowModal={setShowModalCreate} leaveRequestTypes={leaveRequestTypes} isFetchData={isFetchData} setIsFetchData={setIsFetchData} /></Modal>}

            {showModalUpdate && <Modal><UpdateLeaveRequest setShowModal={setShowModalUpdate} leaveRequestTypes={leaveRequestTypes} isFetchData={isFetchData} setIsFetchData={setIsFetchData} leaveRequest={updateLeaveRequest} setLeaveRequest={setUpdateLeaveRequest} /></Modal>}
        </>
    );
}

export default LeaveRequest;
