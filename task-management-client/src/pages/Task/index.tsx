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
import FormLink from '../../components/FormControl/FormLink';
import route from '../../routes/web/route';
import TaskService from '../../services/task';

const tableHeaders = ['ID', 'Title', 'Project', 'Created by', 'Hours', 'Status', 'Actions']

function Task() {
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
            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full mb-1">
                    <ContentHeader title={'Tasks'} />
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
                            <FormLink
                                route={route.project}
                                styles={'bg-indigo-500 focus:ring-primary-300 font-medium rounded-lg'}
                                title={'Projects'}
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
        </>
    );
}

export default Task;
