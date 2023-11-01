import * as React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import TaskReportService from '../../../services/admin/taskReport';
import ContentHeader from '../../../components/ContentHeader';
import PaginateSearch from '../../../components/Paginate/PaginateSearch';
import PaginateSort from '../../../components/Paginate/PaginateSort';
import Button from '../../../components/Button';
import Table from '../../../components/Table';
import TableButton from '../../../components/Table/TableButton';
import Loading from '../../../components/Loading';
import PaginateFooter from '../../../components/Paginate/PaginateFooter';
import TableData from '../../../components/Table/TableData';
import { convertToDate } from '../../../helpers';
import Modal from '../../../components/Modal';
import CreateTaskReport from './Modal/CreateTaskReport';
import GetTaskReport from './Modal/GetTaskReport';

const tableHeaders = ['ID', 'Title', 'Description', 'Status', 'Created at', 'Actions']

function TaskReport({ taskId }: any) {

    const [paginate, setPaginate] = useState({
        page: 1,
        per_page: 10,
        search: '',
        sort: '',
        last_page: 0,
        total: 0,
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isFetchData, setIsFetchData] = useState<any>(false);

    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [taskReports, setTaskReports] = useState<any>([])
    const [taskReport, setTaskReport] = useState<any>({});

    const fetchTaskReports = async () => {
        try {
            setIsLoading(true);
            const taskReportsResponse: any = await TaskReportService.index(paginate, taskId);
            setTaskReports(taskReportsResponse.data.data.data);
            setPaginate({
                ...paginate,
                page: taskReportsResponse.data.data.current_page,
                last_page: taskReportsResponse.data.data.last_page,
                per_page: taskReportsResponse.data.data.per_page,
                total: taskReportsResponse.data.data.total,
            });
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteTaskReport = async (taskReportId: any) => {
        try {
            if (window.confirm('Delete this task report')) {
                await TaskReportService.delete(taskReportId)
                setIsFetchData(!isFetchData);
                toast('Delete task report success');
            }
        } catch (error) {
            toast('Delete task report failed')
        }
    }

    const getTaskReport = async (id: any) => {
        try {
            const taskResponse: any = await TaskReportService.show(id)
            setTaskReport(taskResponse.data.data)
            setShowModalDetail(true)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTaskReports()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetchData]);


    return (
        <>
            <div className="py-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full mb-1">
                    <ContentHeader title={'Task reports'} />
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
                                title={'Add task report'}
                                callback={() => {
                                    setShowModalCreate(true)
                                }}
                                isDisabled={false}
                                styles={'bg-indigo-500 focus:ring-primary-300 rounded-lg'}
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
                                                {taskReports.map(
                                                    (value: any, index: any) => {
                                                        return (
                                                            <tr
                                                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                                                key={index}
                                                            >
                                                                <TableData data={value.id} />
                                                                <TableData data={value.title} />
                                                                <TableData data={value.description} />
                                                                <TableData data={value.status_name} />
                                                                <TableData data={convertToDate(value.created_at)} />
                                                                <td className="p-4 space-x-2 whitespace-nowrap">
                                                                    <TableButton
                                                                        styles='bg-indigo-500 hover:bg-primary-800 focus:ring-primary-300'
                                                                        callback={() => {
                                                                            getTaskReport(value.id)
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
                                                                        styles='bg-red-700 hover:bg-red-800 focus:ring-red-300'
                                                                        callback={() => {
                                                                            handleDeleteTaskReport(value.id)
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

            {showModalCreate && <Modal><CreateTaskReport setShowModal={setShowModalCreate} isFetchData={isFetchData} setIsFetchData={setIsFetchData} taskId={taskId} /></Modal>}
            {showModalDetail && <Modal><GetTaskReport setShowModal={setShowModalDetail} isFetchData={isFetchData} setIsFetchData={setIsFetchData} taskReport={taskReport} setTaskReport={setTaskReport} /></Modal>}
        </>
    );
}

export default TaskReport;