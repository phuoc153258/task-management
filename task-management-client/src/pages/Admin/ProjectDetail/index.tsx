import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetailContent from './ProjectDetailContent';
import ContentHeader from '../../../components/ContentHeader';
import HorizontalList from '../../../components/HorizontalList';
import { TYPE_TASK_REPORT } from '../../../constants/type';
import Task from './Task';
import UserProject from './UserProject';
import UserService from '../../../services/admin/user';
import UserProjectService from '../../../services/admin/userProject';

function ProjectDetail() {
    const { id } = useParams();
    const [type, setType] = useState<any>(1)
    const [users, setUsers] = useState<any>([])
    const [userProjects, setUserProjects] = useState<any>([])

    const fetchUser = async () => {
        try {
            const userResponse: any =
                await UserService.list();
            setUsers(userResponse.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUserProjects = async () => {
        try {
            const userProjectsResponse: any =
                await UserProjectService.list(id);
            setUserProjects(userProjectsResponse.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUser()
        fetchUserProjects()
    }, [])

    return (
        <>
            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full mb-1">
                    <ContentHeader title={'Project details'} />
                    <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                        <div className="flex items-center mb-4 sm:mb-0">
                            <HorizontalList data={TYPE_TASK_REPORT} type={type} setType={setType} />
                        </div>
                        <div className='flex gap-3'>
                        </div>
                    </div>
                </div>
            </div >
            {type === 1 && <ProjectDetailContent projectId={id} />}
            {type === 2 && <UserProject projectId={id} users={users} />}
            {type === 3 && <Task projectId={id} users={userProjects} />}
        </>
    );
}

export default ProjectDetail;
