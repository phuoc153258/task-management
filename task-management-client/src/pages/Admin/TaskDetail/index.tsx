import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskService from '../../../services/admin/task';
import ContentHeader from '../../../components/ContentHeader';
import FormLabel from '../../../components/FormControl/FormLabel';
import FormInput from '../../../components/FormControl/FormInput';
import { TYPE_TEXT } from '../../../constants/inputType';
import FormTextArea from '../../../components/FormControl/FormTextArea';
import Loading from '../../../components/Loading';
import Button from '../../../components/Button';
import { toast } from 'react-toastify';
import { getErrors } from '../../../helpers';
import FormSelect from '../../../components/FormControl/FormSelect';
import DatePicker from '../../../components/DatePicker';
import route from '../../../routes/web/route';
import TaskReport from './TaskReport';

function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(true);
    const [isFetchData, setIsFetchData] = useState(false);
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

    const handleUpdateTask = async () => {
        setIsLoadingUpdate(true)
        try {
            await TaskService.update(task.id, task)
            setIsFetchData(!isFetchData)
            toast('Update task success');
        } catch (error: any) {
            console.log(error);
            const errors: any = getErrors(error.response.data.errors)[0];
            toast(errors);
        }
        setIsLoadingUpdate(false)
    }

    const handleDeleteTask = async () => {
        try {
            if (window.confirm('Delete this task')) {
                await TaskService.delete(id)
                toast('Delete task success');
                navigate(route.admin.project + '/' + task.project_id)
            }
        } catch (error) {
            toast('Delete task failed')
        }
    }

    useEffect(() => {
        fetchTask();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetchData]);

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
                                        readOnly={false}
                                        value={task.title}
                                        callback={(e: any) => { setTask({ ...task, title: e.target.value }) }}
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
                                    <FormSelect
                                        callback={(e: any) => {
                                            setTask({ ...task, hours: parseInt(e.target.value) })
                                        }}
                                        data={
                                            <>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                                <option value={6}>6</option>
                                                <option value={7}>7</option>
                                                <option value={8}>8</option>
                                            </>
                                        }
                                        defaultValue={task.hours}
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
                                    <DatePicker
                                        date={new Date(task.start_date)}
                                        callback={(date: any) => setTask({ ...task, start_date: date })}
                                    />
                                </div>
                                <FormLabel title='Description' />
                                <FormTextArea
                                    placeholder={'Description...'}
                                    value={task.description}
                                    rows={4}
                                    readOnly={false}
                                    callback={(e: any) => {
                                        setTask({ ...task, description: e.target.value })
                                    }}
                                />
                            </div>
                            <div className='flex gap-5'>
                                <Button
                                    title={'Update task'}
                                    callback={() => {
                                        handleUpdateTask()
                                    }}
                                    isDisabled={false}
                                    styles={'bg-indigo-500 focus:ring-primary-300 px-3 py-2 rounded-lg !w-auto'}
                                />
                                <Button
                                    title={'Delete task'}
                                    callback={() => {
                                        handleDeleteTask()
                                    }}
                                    isDisabled={false}
                                    styles={'bg-red-700 hover:bg-red-800 focus:ring-red-300px-3 py-2 rounded-lg !w-auto'}
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
