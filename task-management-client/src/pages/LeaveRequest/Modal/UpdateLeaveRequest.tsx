import * as React from 'react';
import { useState, useEffect } from 'react';
import LeaveRequestService from '../../../services/leaveRequest';
import { toast } from 'react-toastify';
import ModalHeading from '../../../components/Modal/ModalHeading';
import ModalLabel from '../../../components/Modal/ModalLabel';
import DatePicker from '../../../components/DatePicker';
import ModalSelect from '../../../components/Modal/ModalSelect';
import ModalTextArea from '../../../components/Modal/ModalTextArea';
import { getErrors } from '../../../helpers';
import ModalButton from '../../../components/Modal/ModalButton';
import Loading from '../../../components/Loading';


function UpdateLeaveRequest({ setShowModal, leaveRequestTypes, isFetchData, setIsFetchData, leaveRequest, setLeaveRequest }: any) {
    const [showLoading, setShowLoading] = useState(false)

    const handleUpdateLeaveRequest = async () => {
        setShowLoading(true)
        try {
            await LeaveRequestService.update(leaveRequest, leaveRequest.id)
            setShowModal(false)
            setIsFetchData(!isFetchData)
            toast('Update leave request success');
        } catch (error: any) {
            const errors: any = getErrors(error.response.data.data)[0];
            toast(errors);
        }
        setShowLoading(false)

    }

    return (
        <>
            <ModalHeading title={`Details leave request`} callback={() => setShowModal(false)} />

            <div className="p-6 space-y-6">
                <div className="mb-6 ">
                    <ModalLabel title={`Leave request type`} />
                    <ModalSelect
                        callback={(e: any) => setLeaveRequest({ ...leaveRequest, leave_request_type_id: parseInt(e.target.value) })}
                        defaultValue={leaveRequest.leave_request_type_id}
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
                    <DatePicker date={new Date(leaveRequest.leave_registration_date)} callback={(date: any) => setLeaveRequest({ ...leaveRequest, leave_registration_date: date })} />
                </div>
                <div className="mb-6">
                    <ModalLabel title={`Content`} />
                    <ModalTextArea
                        placeholder={'Content...'}
                        callback={(e: any) => setLeaveRequest({ ...leaveRequest, content: e.target.value })}
                        value={leaveRequest.content}
                    />
                </div>

            </div>
            <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <ModalButton title={`Cancel`} callback={() => setShowModal(false)} styles={`text-gray-500 bg-white hover:bg-gray-100 focus:ring-gray-200 border border-gray-200 px-5 py-2 hover:text-gray-900`} />
                <ModalButton title={<>{showLoading && <div className='absolute flex items-center left-1'><Loading /></div>}Update leave request</>} isDisabled={showLoading} callback={() => { handleUpdateLeaveRequest() }} styles={`px-8 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 relative`} />
            </div>
        </>
    );
}

export default UpdateLeaveRequest;
