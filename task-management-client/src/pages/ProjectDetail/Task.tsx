import * as React from 'react';
import { useState, useEffect } from 'react';
import PaginateSearch from '../../components/Paginate/PaginateSearch';
import PaginateSort from '../../components/Paginate/PaginateSort';
import Table from '../../components/Table';
import TableData from '../../components/Table/TableData';
import Loading from '../../components/Loading';
import PaginateFooter from '../../components/Paginate/PaginateFooter';
import TaskService from '../../services/task';
import FormLink from '../../components/FormControl/FormLink';
import route from '../../routes/web/route';

const tableHeadersUserProject = ['ID', 'Title', 'Project', 'Created by', 'Hours', 'Status', 'Action']

function Task({ projectId }: any) {
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

    const fetchLeaveRequest = async () => {
        try {
            setIsLoading(true);
            const tasksResponse: any = await TaskService.index(paginate);
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

    useEffect(() => {
        fetchLeaveRequest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetchData]);
    return (
        <>
            <div className="items-center justify-between block sm:flex md:divide-x mb-4">
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
                                                                        route={route.task + '/' + value.id}
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
        </>);
}

export default Task;