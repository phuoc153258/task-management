import * as React from 'react';
import { useState, useEffect } from 'react';
import { ENV } from '../../../../config';
import ModalHeading from '../../../../components/Modal/ModalHeading';
import FormImage from '../../../../components/FormControl/FormImage';
import FormLabel from '../../../../components/FormControl/FormLabel';
import FormInput from '../../../../components/FormControl/FormInput';
import { TYPE_EMAIL, TYPE_TEXT } from '../../../../constants/inputType';
import ModalButton from '../../../../components/Modal/ModalButton';

function DetailUser({ setShowModal, user }: any) {

    return (
        <>
            <ModalHeading title={'Add user'} callback={() => setShowModal(false)} />

            <div className="p-6 space-y-6">
                <div className="flex">
                    <div className="w-[40%] text-center">
                        <FormImage imagePreview={ENV.apiUrl + '/' + user.avatar} />
                    </div>
                    <div className="w-[60%]">
                        <div className="mb-6 w-full">
                            <FormLabel title={'Username'} />
                            <FormInput
                                type={TYPE_TEXT}
                                placeholder={'Username...'}
                                readOnly={true}
                                value={user.username}
                            />
                        </div>
                        <div className="mb-6 w-full">
                            <FormLabel title={'Fullname'} />
                            <FormInput
                                type={TYPE_TEXT}
                                placeholder={'Fullname...'}
                                readOnly={true}
                                value={user.fullname}
                            />
                        </div>
                        <div className="mb-6 w-full">
                            <FormLabel title={'Email'} />
                            <FormInput
                                type={TYPE_EMAIL}
                                placeholder={'Email...'}
                                readOnly={true}
                                value={user.email}
                            />
                        </div>
                        <div className="mb-6 ">
                            <FormLabel title={'Role'} />
                            <FormInput
                                type={TYPE_TEXT}
                                placeholder={'Role...'}
                                readOnly={true}
                                value={user.roles[0].name}
                            />
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <ModalButton
                    callback={() => { }}
                    styles={'bg-lime-500 hover:bg-primary-800 focus:ring-primary-300 px-3 py-2 text-white'}
                    title={
                        'Restore'}
                    isDisabled={false}
                />
                <ModalButton
                    callback={() => { }}

                    styles={'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 px-3 py-2'}
                    title={
                        'Force delete'}
                    isDisabled={false}
                />
            </div>
        </>

    );
}

export default DetailUser;
