import * as React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import LeaveRequestService from '../../../../services/admin/leaveRequest';
import { getErrors } from '../../../../helpers';
import ModalHeading from '../../../../components/Modal/ModalHeading';
import ModalLabel from '../../../../components/Modal/ModalLabel';
import ModalSelect from '../../../../components/Modal/ModalSelect';
import DatePicker from '../../../../components/DatePicker';
import ModalTextArea from '../../../../components/Modal/ModalTextArea';
import ModalButton from '../../../../components/Modal/ModalButton';
import Loading from '../../../../components/Loading';


function CreateLeaveRequest({ setShowModal, leaveRequestTypes, isFetchData, setIsFetchData, users }: any) {
    const [leaveRequest, setLeaveRequest] = useState({
        leave_request_type_id: 1,
        leave_registration_date: new Date(),
        content: '',
        user_id: 1
    })
    const [showLoading, setShowLoading] = useState(false)

    const handleCreateLeaveRequest = async () => {
        setShowLoading(true)
        try {
            await LeaveRequestService.create(leaveRequest)
            setShowModal(false)
            setIsFetchData(!isFetchData)
            toast('Create leave request success');
        } catch (error: any) {
            const errors: any = getErrors(error.response.data.data)[0];
            toast(errors);
        }
        setShowLoading(false)
    }

    return (
        <>
            <ModalHeading title={`Add leave request`} callback={() => setShowModal(false)} />
            <div className="p-6 space-y-6">
                <div className="mb-6 ">
                    <ModalLabel title={`Leave request type`} />
                    <ModalSelect
                        callback={(e: any) => {
                            setLeaveRequest({ ...leaveRequest, leave_request_type_id: parseInt(e.target.value) })
                        }}
                        data={
                            <>
                                {
                                    leaveRequestTypes.map((value: any, index: any) => {
                                        return <option key={index} value={value.id}>{value.title}</option>
                                    })
                                }
                            </>
                        }
                    />
                </div>
                <div className="mb-6">
                    <ModalLabel title={`Leave registration date`} />
                    <DatePicker date={leaveRequest.leave_registration_date} callback={(date: any) => setLeaveRequest({ ...leaveRequest, leave_registration_date: date })} />
                </div>

                <div className="mb-6">
                    <ModalLabel title={`Content`} />
                    <ModalTextArea
                        placeholder={`Content...`}
                        callback={(e: any) => {
                            setLeaveRequest({ ...leaveRequest, content: e.target.value })
                        }}
                        value={leaveRequest.content} />
                </div>
                <div className="mb-6 ">
                    <ModalLabel title={`User`} />
                    <ModalSelect
                        callback={(e: any) => {
                            setLeaveRequest({ ...leaveRequest, user_id: parseInt(e.target.value) })
                        }}
                        data={
                            <>
                                {
                                    users.map((value: any, index: any) => {
                                        console.log(value)
                                        return <option key={index} value={value.id}>{value.username}</option>
                                    })
                                }
                            </>
                        }
                    />
                </div>
            </div>
            <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <ModalButton title={`Cancel`} callback={() => setShowModal(false)} styles={`text-gray-500 bg-white hover:bg-gray-100 focus:ring-gray-200 border border-gray-200 px-5 py-2 hover:text-gray-900`} />
                <ModalButton title={<>{showLoading && <div className='absolute flex items-center left-1'><Loading /></div>}Create leave request</>} isDisabled={showLoading} callback={() => { handleCreateLeaveRequest() }} styles={`px-8 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 relative`} />
            </div>
        </>
    );
}

export default CreateLeaveRequest;
