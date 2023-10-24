import * as React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ModalHeading from '../../../components/Modal/ModalHeading';
import FormSelect from '../../../components/FormControl/FormSelect';
import FormTextArea from '../../../components/FormControl/FormTextArea';
import { getErrors } from '../../../helpers';
import ModalButton from '../../../components/Modal/ModalButton';
import Loading from '../../../components/Loading';
import FormLabel from '../../../components/FormControl/FormLabel';
import FormInput from '../../../components/FormControl/FormInput';
import { TYPE_TEXT } from '../../../constants/inputType';
import { TASK_STATUS } from '../../../constants/status';
import TaskReportService from '../../../services/taskReport';


function GetTaskReport({ setShowModal, isFetchData, setIsFetchData, taskReport, setTaskReport }: any) {
    const [showLoading, setShowLoading] = useState(false)

    const handleUpdateTaskReport = async () => {
        setShowLoading(true)
        try {
            await TaskReportService.update(taskReport.id, taskReport)
            setShowModal(false)
            setIsFetchData(!isFetchData)
            toast('Update task report success');
        } catch (error: any) {
            const errors: any = getErrors(error.response.data.data)[0];
            toast(errors);
        }
        setShowLoading(false)
    }

    return (
        <>
            <ModalHeading title={`Details task report`} callback={() => setShowModal(false)} />

            <div className="p-6 space-y-6">
                <div className="mb-6">
                    <FormLabel title={`Title`} />
                    <FormInput
                        type={TYPE_TEXT}
                        placeholder={'Title...'}
                        readOnly={false}
                        value={taskReport.title}
                        callback={(e: any) => {
                            setTaskReport({ ...taskReport, title: e.target.value });
                        }}
                    />
                </div>
                <div className="mb-6">
                    <FormLabel title={`Description`} />
                    <FormTextArea
                        placeholder={`Description...`}
                        callback={(e: any) => {
                            setTaskReport({ ...taskReport, description: e.target.value })
                        }}
                        value={taskReport.description}
                    />
                </div>
                <div className="mb-6">
                    <FormLabel title={`Status`} />
                    <FormSelect
                        callback={(e: any) => {
                            setTaskReport({ ...taskReport, status: parseInt(e.target.value) })
                        }}
                        data={
                            <>
                                {
                                    TASK_STATUS.map((value: any, index: any) => {
                                        return <option key={index} value={value.value}>{value.name}</option>
                                    })
                                }
                            </>
                        }
                        defaultValue={taskReport.status}
                    />
                </div>

            </div>
            <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <ModalButton title={`Cancel`} callback={() => setShowModal(false)} styles={`text-gray-500 bg-white hover:bg-gray-100 focus:ring-gray-200 border border-gray-200 px-5 py-2 hover:text-gray-900`} />
                <ModalButton title={<>{showLoading && <div className='absolute flex items-center left-1'><Loading /></div>}Update leave request</>} isDisabled={showLoading} callback={() => { handleUpdateTaskReport() }} styles={`px-8 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 relative`} />
            </div>
        </>
    );
}

export default GetTaskReport;
