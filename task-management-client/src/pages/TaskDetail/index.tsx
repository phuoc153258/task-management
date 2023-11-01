import * as React from 'react';
import { useState, useEffect } from 'react';
import ContentHeader from '../../components/ContentHeader';
import TaskService from '../../services/task';
import FormLabel from '../../components/FormControl/FormLabel';
import FormInput from '../../components/FormControl/FormInput';
import { TYPE_TEXT } from '../../constants/inputType';
import FormTextArea from '../../components/FormControl/FormTextArea';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import TaskReport from './TaskReport';
import DatePicker from '../../components/DatePicker';

function TaskDetail() {
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [task, setTask] = useState<any>({});

    const fetchTask = async () => {
        try {
            const tasksResponse: any = await TaskService.show(id);
            setTask(tasksResponse.data.data)
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchTask();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) return <><div className="flex items-center justify-center py-10 bg-white"><Loading /></div></>

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
                                <div className="grid grid-cols-1">
                                    <FormLabel title='Project' />
                                    <DatePicker date={new Date(task.start_date)} readOnly={true} />
                                </div>
                                <FormLabel title='Description' />
                                <FormTextArea
                                    placeholder={'Description...'}
                                    value={task.description}
                                    rows={4}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                        <TaskReport taskId={id} />
                    </div>
                </div>
            </div >
        </>
    );
}

export default TaskDetail;
