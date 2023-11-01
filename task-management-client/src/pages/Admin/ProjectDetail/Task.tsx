import * as React from 'react';
import { useState, useEffect } from 'react';
import PaginateSearch from '../../../components/Paginate/PaginateSearch';
import PaginateSort from '../../../components/Paginate/PaginateSort';
import Table from '../../../components/Table';
import TableData from '../../../components/Table/TableData';
import FormLink from '../../../components/FormControl/FormLink';
import route from '../../../routes/web/route';
import Loading from '../../../components/Loading';
import PaginateFooter from '../../../components/Paginate/PaginateFooter';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import CreateTask from './Modal/CreateTask';
import TaskService from '../../../services/admin/task';
import TableButton from '../../../components/Table/TableButton';
import { toast } from 'react-toastify';

const tableHeadersUserProject = ['ID', 'Title', 'Project', 'Created by', 'Hours', 'Status', 'Action']

function Task({ projectId, users }: any) {
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchData, setIsFetchData] = useState<any>(false);

    const [tasks, setTasks] = useState([]);

    const [paginate, setPaginate] = useState({
        page: 1,
        per_page: 10,
        search: '',
        sort: '',
        last_page: 0,
        total: 0,
        project_id: projectId
    });
    const [showModalCreate, setShowModalCreate] = useState(false)

    const fetchLeaveRequest = async () => {
        try {
            setIsLoading(true);
            const tasksResponse: any = await TaskService.index(paginate, projectId);
            setTasks(tasksResponse.data.data.data);
            setPaginate({
                ...paginate,
                page: tasksResponse.data.data.current_page,
                last_page: tasksResponse.data.data.last_page,
                per_page: tasksResponse.data.data.per_page,
                total: tasksResponse.data.data.total,
            });
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteTask = async (id: any) => {
        try {
            if (window.confirm('Delete this task')) {
                await TaskService.delete(id)
                setIsFetchData(!isFetchData);
                toast('Delete task success');
            }
        } catch (error) {
            toast('Delete task failed')
        }
    }

    useEffect(() => {
        fetchLeaveRequest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetchData]);
    return (
        <>
            <div className="items-center justify-between block sm:flex md:divide-x mb-4 p-4">
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
                <div className="flex gap-3">
                    <Button
                        title={'Add task'}
                        callback={() => {
                            setShowModalCreate(true);
                        }}
                        isDisabled={false}
                        styles={'bg-indigo-500 focus:ring-primary-300 px-3 py-2 rounded-lg'}
                    />
                </div >
            </div>

            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            <Table
                                tableHeaders={tableHeadersUserProject}
                                data={
                                    <>
                                        {!isLoading && (
                                            <>
                                                {tasks.map(
                                                    (value: any, index: any) => {
                                                        return (
                                                            <tr
                                                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                                                key={index}
                                                            >
                                                                <TableData data={value.id} />
                                                                <TableData data={value.title} />
                                                                <TableData data={value.project.title} />
                                                                <TableData data={value.created_by.username} />
                                                                <TableData data={value.hours} />
                                                                <TableData data={value.status_name} />
                                                                <td className="p-4 space-x-2 whitespace-nowrap">
                                                                    <FormLink
                                                                        styles='bg-indigo-500 hover:bg-primary-800 focus:ring-primary-300'
                                                                        title={`Details`}
                                                                        route={route.admin.task + '/' + value.id}
                                                                    />
                                                                    <TableButton
                                                                        styles='bg-red-700 hover:bg-red-800 focus:ring-red-300'
                                                                        callback={() => {
                                                                            handleDeleteTask(value.id)

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
                                                                        title={`Delete`}
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
            {showModalCreate && <Modal><CreateTask setShowModal={setShowModalCreate} users={users} projectId={projectId} isFetchData={isFetchData} setIsFetchData={setIsFetchData} /></Modal>}

        </>);
}

export default Task;