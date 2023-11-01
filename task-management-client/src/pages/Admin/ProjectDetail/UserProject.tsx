import * as React from 'react';
import { useState, useEffect } from 'react';
import PaginateSearch from '../../../components/Paginate/PaginateSearch';
import PaginateSort from '../../../components/Paginate/PaginateSort';
import Table from '../../../components/Table';
import TableData from '../../../components/Table/TableData';
import PaginateFooter from '../../../components/Paginate/PaginateFooter';
import Loading from '../../../components/Loading';
import Modal from '../../../components/Modal';
import CreateUserProject from './Modal/CreateUserProject';
import Button from '../../../components/Button';
import UserProjectService from '../../../services/admin/userProject';
import TableButton from '../../../components/Table/TableButton';
import { toast } from 'react-toastify';

const tableHeadersUserProject = ['ID', 'Username', 'Fullname', 'Email', 'Actions']

function UserProject({ projectId, users }: any) {
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

    const [showModalCreate, setShowModalCreate] = useState(false)

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

    const handleDeleteProject = async (id: any) => {
        try {
            if (window.confirm('Delete this member')) {
                await UserProjectService.delete({ user_id: id, project_id: projectId });
                setIsFetchData(!isFetchData);
                toast('Delete memeber success');
            }
        } catch (error) {
            toast('Delete memeber failed')
        }
    }


    useEffect(() => {
        fetchUserProject();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetchData]);
    return (
        <>
            <div className="items-center justify-between block sm:flex md:divide-x mb-4 p-4">
                <div className="flex items-center mb-4 sm:mb-0" >
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
                <div className="flex gap-3">
                    <Button
                        title={'Add member'}
                        callback={() => {
                            setShowModalCreate(true);
                        }}
                        isDisabled={false}
                        styles={'bg-indigo-500 focus:ring-primary-300 px-3 py-2 rounded-lg'}
                    />
                </div >
            </div >

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
                                                                <td className="p-4 space-x-2 whitespace-nowrap">
                                                                    <TableButton
                                                                        styles='bg-red-700 hover:bg-red-800 focus:ring-red-300'
                                                                        callback={() => {
                                                                            handleDeleteProject(value.user_id)

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
                            {isLoadingUserProjects && <div className="flex items-center justify-center py-5"><Loading /></div>}
                        </div>
                    </div>
                </div>
            </div>

            <PaginateFooter paginate={paginateUserProjects} setPaginate={setPaginateUserProjects} isFetchData={isFetchData} setIsFetchData={setIsFetchData} />
            {showModalCreate && <Modal><CreateUserProject setShowModal={setShowModalCreate} isFetchData={isFetchData} setIsFetchData={setIsFetchData} users={users} projectId={projectId} /></Modal>}

        </>);
}

export default UserProject;