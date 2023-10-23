import * as React from 'react';
import { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import Table from '../../components/Table';
import TableButton from '../../components/Table/TableButton';
import TableData from '../../components/Table/TableData';
import PaginateSearch from '../../components/Paginate/PaginateSearch';
import PaginateSort from '../../components/Paginate/PaginateSort';
import PaginateFooter from '../../components/Paginate/PaginateFooter';
import ContentHeader from '../../components/ContentHeader';
import TaskService from '../../services/task';
import FormLabel from '../../components/FormControl/FormLabel';
import FormInput from '../../components/FormControl/FormInput';
import { TYPE_TEXT } from '../../constants/inputType';
import FormTextArea from '../../components/FormControl/FormTextArea';
import { useParams } from 'react-router-dom';
import TaskReportService from '../../services/taskReport';
import { convertToDate } from '../../helpers';

const tableHeaders = ['ID', 'Title', 'Description', 'Status', 'Created at', 'Actions']

function TaskDetail() {
    const { id } = useParams();

    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchData, setIsFetchData] = useState<any>(false);

    const [task, setTask] = useState<any>({});
    const [taskReports, setTaskReports] = useState<any>([])

    const [paginate, setPaginate] = useState({
        page: 1,
        per_page: 10,
        search: '',
        sort: '',
        last_page: 0,
        total: 0,
    });

    const fetchTaskReports = async () => {
        try {
            setIsLoading(true);
            const taskReportsResponse: any = await TaskReportService.index(paginate, id);
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

    const fetchTask = async () => {
        try {
            const tasksResponse: any = await TaskService.show(id);
            setTask(tasksResponse.data.data)
        } catch (error) {
            console.log(error);
        }
        setShow(true)
    }

    useEffect(() => {
        fetchTaskReports()
        fetchTask();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetchData]);

    if (!show) return <></>

    return (
        <>
            <div className="grid grid-cols-1 gap-y-6 px-4">
                <div
                    className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col mt-5"
                >
                    <div className="flex h-full flex-col justify-center gap-4 p-6">
                        <ContentHeader title={'Task Details'} />
                        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="col-span-1 grid grid-cols-1 gap-y-3">
                                <div className="grid grid-cols-1">
                                    <FormLabel title='ID' />
                                    <FormInput
                                        type={TYPE_TEXT}
                                        placeholder={'ID...'}
                                        readOnly={true}
                                        value={task.id}
                                    />
                                </div>
                                <div className="grid grid-cols-1">
                                    <FormLabel title='Title' />
                                    <FormInput
                                        type={TYPE_TEXT}
                                        placeholder={'Title...'}
                                        readOnly={true}
                                        value={task.title}
                                    />
                                </div>
                                <div className="grid grid-cols-1">
                                    <FormLabel title='Status' />
                                    <FormInput
                                        type={TYPE_TEXT}
                                        placeholder={'Status...'}
                                        readOnly={true}
                                        value={task.status_name}
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 grid grid-cols-1 gap-y-3">
                                <div className="grid grid-cols-1">
                                    <FormLabel title='Hours' />
                                    <FormInput
                                        type={TYPE_TEXT}
                                        placeholder={'Hours...'}
                                        readOnly={true}
                                        value={task.hours}
                                    />
                                </div>
                                <div className="grid grid-cols-1">
                                    <FormLabel title='Created by' />
                                    <FormInput
                                        type={TYPE_TEXT}
                                        placeholder={'Created by...'}
                                        readOnly={true}
                                        value={task.created_by.username}
                                    />
                                </div>
                                <div className="grid grid-cols-1">
                                    <FormLabel title='Project' />
                                    <FormInput
                                        type={TYPE_TEXT}
                                        placeholder={'Project...'}
                                        readOnly={true}
                                        value={task.project.title}
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 grid grid-cols-1 gap-y-2">
                                <FormLabel title='Description' />
                                <FormTextArea
                                    placeholder={'Description...'}
                                    value={task.description}
                                    rows={8}
                                    readOnly={true}
                                />
                            </div>
                        </div>
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
                                                                                        // getLeaveRequest(value.id)

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
                    </div>
                </div>
            </div >


        </>
    );
}

export default TaskDetail;
