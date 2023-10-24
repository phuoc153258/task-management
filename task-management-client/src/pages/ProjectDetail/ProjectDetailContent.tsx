import * as React from 'react';
import { useState, useEffect } from 'react';
import FormLabel from '../../components/FormControl/FormLabel';
import FormInput from '../../components/FormControl/FormInput';
import { TYPE_TEXT } from '../../constants/inputType';
import Loading from '../../components/Loading';
import FormTextArea from '../../components/FormControl/FormTextArea';
import ProjectService from '../../services/project';

function ProjectDetailContent({ projectId }: any) {
    const [isFetchData, setIsFetchData] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

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
                                    <FormLabel title='ID' />
                                    <FormInput
                                        type={TYPE_TEXT}
                                        placeholder={'ID...'}
                                        readOnly={true}
                                        value={project.id}
                                    />
                                </div>
                                <div className="grid grid-cols-1">
                                    <FormLabel title='Title' />
                                    <FormInput
                                        type={TYPE_TEXT}
                                        placeholder={'Title...'}
                                        readOnly={true}
                                        value={project.title}
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 grid grid-cols-1 gap-y-3">
                                <div className="grid grid-cols-1">
                                    <FormLabel title='Status' />
                                    <FormInput
                                        type={TYPE_TEXT}
                                        placeholder={'Status...'}
                                        readOnly={true}
                                        value={project.status_name}
                                    />
                                </div>
                                <div className="grid grid-cols-1">
                                    <FormLabel title='Created by' />
                                    <FormInput
                                        type={TYPE_TEXT}
                                        placeholder={'Created by...'}
                                        readOnly={true}
                                        value={project.user.username}
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 grid grid-cols-1 gap-y-2">
                                <FormLabel title='Description' />
                                <FormTextArea
                                    placeholder={'Description...'}
                                    value={project.description}
                                    rows={6}
                                    readOnly={true}
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