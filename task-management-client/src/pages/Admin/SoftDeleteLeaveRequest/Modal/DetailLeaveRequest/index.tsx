import * as React from 'react';
import { useState, useEffect } from 'react';
import ModalHeading from '../../../../../components/Modal/ModalHeading';
import FormInput from '../../../../../components/FormControl/FormInput';
import { TYPE_TEXT } from '../../../../../constants/inputType';
import FormTextArea from '../../../../../components/FormControl/FormTextArea';
import ModalButton from '../../../../../components/Modal/ModalButton';
import FormLabel from '../../../../../components/FormControl/FormLabel';

function DetailLeaveRequest({ setShowModal, leaveRequest, handleUpdateStatus }: any) {

    return (
        <>
            <ModalHeading title={'Details leave request'} callback={() => setShowModal(false)} />
            <div className="p-6 space-y-6">
                <div className="mb-6 w-full">
                    <FormLabel title={'Leave request type'} />
                    <FormInput type={TYPE_TEXT} placeholder={`Leave request type...`} readOnly={true} value={leaveRequest.leave_request_type.title} />
                </div>
                <div className="mb-6 w-full">
                    <FormLabel title={'Leave registration date'} />
                    <FormInput type={TYPE_TEXT} placeholder={`Leave registration date...`} readOnly={true} value={leaveRequest.leave_registration_date} />
                </div>
                <div className="mb-6 w-full">
                    <FormLabel title={'Username'} />
                    <FormInput type={TYPE_TEXT} placeholder={`Username...`} readOnly={true} value={leaveRequest.user.username} />
                </div>
                <div className="mb-6 w-full">
                    <FormLabel title={'Content'} />
                    <FormTextArea placeholder={'Content...'} value={leaveRequest.content} />
                </div>
            </div>
            <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <ModalButton
                    callback={() => {
                        handleUpdateStatus(leaveRequest.id, 1)
                        setShowModal(false)
                    }} styles={'bg-lime-500 hover:bg-primary-800 focus:ring-primary-300 px-3 py-2 text-white'}
                    title={
                        'Accept'}
                    isDisabled={false}
                />
                <ModalButton
                    callback={() => {
                        handleUpdateStatus(leaveRequest.id, 2)
                        setShowModal(false)
                    }} styles={'text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 px-3 py-2'}
                    title={
                        'Reject'}
                    isDisabled={false}
                />
            </div>
        </>
    );
}

export default DetailLeaveRequest;
