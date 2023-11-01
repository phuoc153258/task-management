import * as React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getErrors } from '../../../../helpers';
import ModalHeading from '../../../../components/Modal/ModalHeading';
import FormSelect from '../../../../components/FormControl/FormSelect';
import ModalButton from '../../../../components/Modal/ModalButton';
import Loading from '../../../../components/Loading';
import FormLabel from '../../../../components/FormControl/FormLabel';
import UserProjectService from '../../../../services/admin/userProject';


function CreateUserProject({ setShowModal, isFetchData, setIsFetchData, users, projectId }: any) {
    const [userProject, setUserProject] = useState({
        user_id: users[0].id,
        project_id: projectId,
    })
    const [showLoading, setShowLoading] = useState(false)

    const handleCreateUserProject = async () => {
        setShowLoading(true)
        try {
            await UserProjectService.create(userProject)
            setShowModal(false)
            setIsFetchData(!isFetchData)
            toast('Add member success');
        } catch (error: any) {
            const errors: any = getErrors(error.response.data.data)[0];
            toast(errors);
        }
        setShowLoading(false)
    }

    return (
        <>
            <ModalHeading title={`Add member`} callback={() => setShowModal(false)} />
            <div className="p-6 space-y-6">
                <div className="mb-6 ">
                    <FormLabel title={`User`} />
                    <FormSelect
                        callback={(e: any) => {
                            setUserProject({ ...userProject, user_id: parseInt(e.target.value) })
                        }}
                        data={
                            <>
                                {
                                    users.map((value: any, index: any) => {
                                        return <option key={index} value={value.id}>{value.username}</option>
                                    })
                                }
                            </>
                        }
                        default={userProject.user_id}
                    />
                </div>
            </div>
            <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <ModalButton title={`Cancel`} callback={() => setShowModal(false)} styles={`text-gray-500 bg-white hover:bg-gray-100 focus:ring-gray-200 border border-gray-200 px-5 py-2 hover:text-gray-900`} />
                <ModalButton title={<>{showLoading && <div className='absolute flex items-center left-1'><Loading /></div>}Add member</>} isDisabled={showLoading} callback={() => { handleCreateUserProject() }} styles={`px-8 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 relative`} />
            </div>
        </>
    );
}

export default CreateUserProject;
