import * as React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getErrors } from '../../../../helpers';
import ModalHeading from '../../../../components/Modal/ModalHeading';
import FormSelect from '../../../../components/FormControl/FormSelect';
import ModalButton from '../../../../components/Modal/ModalButton';
import Loading from '../../../../components/Loading';
import FormLabel from '../../../../components/FormControl/FormLabel';
import FormInput from '../../../../components/FormControl/FormInput';
import { TYPE_TEXT } from '../../../../constants/inputType';
import DatePicker from '../../../../components/DatePicker';
import FormTextArea from '../../../../components/FormControl/FormTextArea';
import TaskService from '../../../../services/admin/task';


function CreateTask({ setShowModal, isFetchData, setIsFetchData, users, projectId }: any) {
    const [task, setTask] = useState({
        user_id: users[0].id,
        project_id: parseInt(projectId),
        title: '',
        description: '',
        hours: 1,
        start_date: new Date(),
    })
    const [showLoading, setShowLoading] = useState(false)

    const handleCreateTask = async () => {
        setShowLoading(true)
        try {
            await TaskService.create(task)
            setShowModal(false)
            setIsFetchData(!isFetchData)
            toast('Add task success');
        } catch (error: any) {
            const errors: any = getErrors(error.response.data.data)[0];
            toast(errors);
        }
        setShowLoading(false)
    }

    return (
        <>
            <ModalHeading title={`Add task`} callback={() => setShowModal(false)} />
            <div className="p-6 space-y-6">
                <div className="mb-6 ">
                    <FormLabel title={`Title*`} />
                    <FormInput
                        type={TYPE_TEXT}
                        placeholder={'Title...'}
                        readOnly={false}
                        value={task.title}
                        callback={(e: any) => {
                            setTask({ ...task, title: e.target.value })
                        }}
                    />
                </div>
                <div className="mb-6 ">
                    <FormLabel title={`User`} />
                    <FormSelect
                        callback={(e: any) => {
                            setTask({ ...task, user_id: parseInt(e.target.value) })
                        }}
                        data={
                            <>
                                {
                                    users.map((value: any, index: any) => {
                                        return <option key={index} value={value.user_id}>{value.user.username}</option>
                                    })
                                }
                            </>
                        }
                        default={task.user_id}
                    />
                </div>
                <div className="mb-6">
                    <FormLabel title={`Start date`} />
                    <DatePicker date={task.start_date}
                        callback={(date: any) => setTask({ ...task, start_date: date })}
                    />
                </div>
                <div className="mb-6">
                    <FormLabel title={`Hours`} />
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
                    />
                </div>
                <div className="mb-6">
                    <FormLabel title={`Description*`} />
                    <FormTextArea
                        placeholder={`Description...`}
                        callback={(e: any) => {
                            setTask({ ...task, description: e.target.value })
                        }}
                        value={task.description} />
                </div>
            </div>
            <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <ModalButton title={`Cancel`} callback={() => setShowModal(false)} styles={`text-gray-500 bg-white hover:bg-gray-100 focus:ring-gray-200 border border-gray-200 px-5 py-2 hover:text-gray-900`} />
                <ModalButton title={<>{showLoading && <div className='absolute flex items-center left-1'><Loading /></div>}Add task</>} isDisabled={showLoading} callback={() => { handleCreateTask() }} styles={`px-8 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 relative`} />
            </div>
        </>
    );
}

export default CreateTask;
