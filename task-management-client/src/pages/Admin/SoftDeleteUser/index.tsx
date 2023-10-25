import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isHaveRole } from '../../../utils';
import UserService from '../../../services/admin/user';
import { ROLE_ADMIN } from '../../../constants/user';
import route from '../../../routes/web/route';
import PaginateSearch from '../../../components/Paginate/PaginateSearch';
import PaginateSort from '../../../components/Paginate/PaginateSort';
import Table from '../../../components/Table';
import TableData from '../../../components/Table/TableData';
import TableButton from '../../../components/Table/TableButton';
import Loading from '../../../components/Loading';
import PaginateFooter from '../../../components/Paginate/PaginateFooter';
import ContentHeader from '../../../components/ContentHeader';
import Modal from '../../../components/Modal';
import DetailUser from './Modal/DetailUser';
import { toast } from 'react-toastify';

const tableHeaders = ['ID', 'Username', 'Fullname', 'Email', 'Actions']

function SoftDeleteUser() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);
    const [isFetchData, setIsFetchData] = useState<any>(false);
    const [showModalDetail, setShowModalDetail] = useState<any>(false);

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState<any>({});

    const [paginate, setPaginate] = useState({
        page: 1,
        per_page: 10,
        search: '',
        sort: '',
        last_page: 0,
        total: 0,
        soft_delete: 2
    });

    const getUser = async (id: any) => {
        try {
            const userResponse: any = await UserService.show(id)
            setUser(userResponse.data.data)
            setShowModalDetail(true)
        } catch (error) {
            console.log(error)
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const usersPromise = UserService.index(
                {},
                paginate,
            );
            const response: any = await Promise.all([usersPromise])
            setUsers(response[0].data.data.data);
            setPaginate({
                ...paginate,
                page: response[0].data.data.current_page,
                last_page: response[0].data.data.last_page,
                per_page: response[0].data.data.per_page,
                total: response[0].data.data.total,
            });
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRestoreUser = async (id: any) => {
        try {
            if (window.confirm('Restore this project')) {
                await UserService.restore(id)
                toast('Restore project success')
                setIsFetchData(!isFetchData)
            }
        } catch (error) {
            toast('Restore project failed')
        }
    }

    const handleForceUser = async (id: any) => {
        try {
            if (window.confirm('Force delete this project')) {
                await UserService.force(id)
                toast('Force delete project success')
                setIsFetchData(!isFetchData)
            }
        } catch (error) {
            toast('Force delete project failed')
        }
    }

    useEffect(() => {
        const isAuth = isHaveRole([ROLE_ADMIN]);
        if (!isAuth) navigate(route.home);
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetchData]);

    return (
        <>
            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full mb-1">
                    <ContentHeader title={'Soft delete user'} />
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
                                                {users.map(
                                                    (value: any, index: any) => {
                                                        return (
                                                            <tr
                                                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                                                key={index}
                                                            >
                                                                <TableData data={value.id} />
                                                                <TableData data={value.username} />
                                                                <TableData data={value.fullname} />
                                                                <TableData data={value.email} />
                                                                <td className="p-4 space-x-2 whitespace-nowrap">
                                                                    <TableButton
                                                                        styles='bg-indigo-500 hover:bg-primary-800 focus:ring-primary-300'
                                                                        callback={() => {
                                                                            getUser(value.id)
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
                                                                            handleRestoreUser(value.id)

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
                                                                        title={`Restore`}
                                                                    />
                                                                    <TableButton
                                                                        styles='bg-red-700 hover:bg-red-800 focus:ring-red-300'
                                                                        callback={() => {
                                                                            handleForceUser(value.id)
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
                                                                        title={`Force`}
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
            {showModalDetail && <Modal><DetailUser setShowModal={setShowModalDetail} isFetchData={isFetchData} setIsFetchData={setIsFetchData} user={user} /></Modal>}
        </>
    );
}

export default SoftDeleteUser;