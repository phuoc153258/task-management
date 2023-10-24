import * as React from 'react';
import { useState, useEffect } from 'react';
import PaginateSearch from '../../components/Paginate/PaginateSearch';
import PaginateSort from '../../components/Paginate/PaginateSort';
import Table from '../../components/Table';
import TableData from '../../components/Table/TableData';
import Loading from '../../components/Loading';
import PaginateFooter from '../../components/Paginate/PaginateFooter';
import UserProjectService from '../../services/userProject';

const tableHeadersUserProject = ['ID', 'Username', 'Fullname', 'Email']

function UserProject({ projectId }: any) {
    const [isFetchData, setIsFetchData] = useState<any>(false)
    const [isLoadingUserProjects, setIsLoadingUserProjects] = useState(true);
    const [userProjects, setUserProjects] = useState<any>([]);
    const [paginateUserProjects, setPaginateUserProjects] = useState({
        page: 1,
        per_page: 10,
        search: '',
        sort: '',
        last_page: 0,
        total: 0,
    });

    const fetchUserProject = async () => {
        try {
            setIsLoadingUserProjects(true);
            const leaveRequestsResponse: any = await UserProjectService.index(
                paginateUserProjects, projectId
            );
            setUserProjects(leaveRequestsResponse.data.data.data);
            setPaginateUserProjects({
                ...paginateUserProjects,
                page: leaveRequestsResponse.data.data.current_page,
                last_page: leaveRequestsResponse.data.data.last_page,
                per_page: leaveRequestsResponse.data.data.per_page,
                total: leaveRequestsResponse.data.data.total,
            });
            setIsLoadingUserProjects(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserProject();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetchData]);
    return (
        <>
            <div className="items-center justify-between block sm:flex md:divide-x mb-4">
                <div className="flex items-center mb-4 sm:mb-0">
                    <PaginateSearch callback={(e: any) => {
                        setIsFetchData(!isFetchData);
                        setPaginateUserProjects({
                            ...paginateUserProjects,
                            search: e.target.value,
                        });
                    }} />
                    <PaginateSort callback={(e: any) => {
                        setIsFetchData(!isFetchData);
                        setPaginateUserProjects({
                            ...paginateUserProjects,
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
                                        {!isLoadingUserProjects && (
                                            <>
                                                {userProjects.map(
                                                    (value: any, index: any) => {
                                                        return (
                                                            <tr
                                                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                                                key={index}
                                                            >
                                                                <TableData data={value.id} />
                                                                <TableData data={value.user.username} />
                                                                <TableData data={value.user.fullname} />
                                                                <TableData data={value.user.email} />
                                                            </tr>
                                                        );
                                                    },
                                                )}
                                            </>
                                        )}
                                    </>
                                }
                            />
                            {isLoadingUserProjects && <div className="flex items-center justify-center py-5"><Loading /></div>}
                        </div>
                    </div>
                </div>
            </div>

            <PaginateFooter paginate={paginateUserProjects} setPaginate={setPaginateUserProjects} isFetchData={isFetchData} setIsFetchData={setIsFetchData} />
        </>);
}

export default UserProject;