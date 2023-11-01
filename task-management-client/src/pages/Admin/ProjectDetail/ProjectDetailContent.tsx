import * as React from 'react';
import { useState, useEffect } from 'react';
import FormLabel from '../../../components/FormControl/FormLabel';
import FormInput from '../../../components/FormControl/FormInput';
import { TYPE_TEXT } from '../../../constants/inputType';
import FormTextArea from '../../../components/FormControl/FormTextArea';
import ProjectService from '../../../services/admin/project';
import Loading from '../../../components/Loading';
import Button from '../../../components/Button';
import { toast } from 'react-toastify';
import { getErrors } from '../../../helpers';
import FormSelect from '../../../components/FormControl/FormSelect';
import { PROJECT_STATUS } from '../../../constants/status';
import { useNavigate } from 'react-router-dom';
import route from '../../../routes/web/route';

function ProjectDetailContent({ projectId }: any) {
    const navigate = useNavigate();
    const [isFetchData, setIsFetchData] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    // const [isLoadingUpdate, setIsLoadingUpdate] = useState(true);

    const [project, setProject] = useState<any>({});

    const fetchProject = async () => {
        setIsLoading(true)
        try {
            const projectResponse: any = await ProjectService.show(projectId);
            setProject(projectResponse.data.data)
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    const handleUpdateProject = async () => {
        // setIsLoadingUpdate(true)
        try {
            await ProjectService.update(project, project.id)
            setIsFetchData(!isFetchData)
            toast('Update project success');
        } catch (error: any) {
            const errors: any = getErrors(error.response.data.data)[0];
            toast(errors);
        }
        // setIsLoadingUpdate(false)
    }

    const handleDeleteProject = async () => {
        try {
            if (window.confirm('Delete this project')) {
                await ProjectService.delete(projectId)
                toast('Delete project success');
                navigate(route.admin.project)
            }
        } catch (error) {
            toast('Delete project failed')
        }
    }

    useEffect(() => {
        fetchProject();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetchData]);
    return <>
        {isLoading && <div className="flex items-center justify-center py-10 bg-white"><Loading /></div>}

        {!isLoading &&
            <div className="grid grid-cols-1 gap-y-6 px-4 min-h-[44rem]">
                <div
                    className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col mt-5 max-h-[18rem]"
                >
                    <div className="flex h-full flex-col justify-center gap-4 p-6">
                        <div className="m-6 grid grid-cols-1 gap-6 md:grid-cols-3 p-4">
                            <div className="col-span-1 grid grid-cols-1 gap-y-3">
                                <div className="grid grid-cols-1">
                                    <FormLabel title='ID*' />
                                    <FormInput
                                        type={TYPE_TEXT}
                                        placeholder={'ID...'}
                                        readOnly={true}
                                        value={project.id}
                                    />
                                </div>
                                <div className="grid grid-cols-1">
                                    <FormLabel title='Title*' />
                                    <FormInput
                                        type={TYPE_TEXT}
                                        placeholder={'Title...'}
                                        readOnly={false}
                                        value={project.title}
                                        callback={(e: any) => { setProject({ ...project, title: e.target.value }) }}
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 grid grid-cols-1 gap-y-3">
                                <div className="grid grid-cols-1">
                                    <FormLabel title='Status*' />
                                    <FormSelect
                                        callback={(e: any) => { setProject({ ...project, status: parseInt(e.target.value) }) }}
                                        data={
                                            <>
                                                {
                                                    PROJECT_STATUS.map((value: any, index: any) => {
                                                        return <option key={index} value={value.value}>{value.name}</option>
                                                    })
                                                }
                                            </>
                                        }
                                        defaultValue={project.status}
                                    />
                                </div>
                                <div className="grid grid-cols-1">
                                    <FormLabel title='Created by*' />
                                    <FormInput
                                        type={TYPE_TEXT}
                                        placeholder={'Created by...'}
                                        readOnly={true}
                                        value={project.user.username}
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 grid grid-cols-1 gap-y-2">
                                <FormLabel title='Description*' />
                                <FormTextArea
                                    placeholder={'Description...'}
                                    value={project.description}
                                    rows={6}
                                    readOnly={false}
                                    callback={(e: any) => { setProject({ ...project, description: e.target.value }) }}
                                />
                            </div>
                            <div className='flex gap-5'>
                                <Button
                                    title={'Update project'}
                                    callback={() => {
                                        handleUpdateProject()
                                    }}
                                    isDisabled={false}
                                    styles={'bg-indigo-500 focus:ring-primary-300 px-3 py-2 rounded-lg !w-auto'}
                                />
                                <Button
                                    title={'Delete project'}
                                    callback={() => {
                                        handleDeleteProject()
                                    }}
                                    isDisabled={false}
                                    styles={'bg-red-700 hover:bg-red-800 focus:ring-red-300px-3 py-2 rounded-lg !w-auto'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>;
}

export default ProjectDetailContent;