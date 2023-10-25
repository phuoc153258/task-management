import * as React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getErrors } from '../../../../helpers';
import ModalHeading from '../../../../components/Modal/ModalHeading';
import FormSelect from '../../../../components/FormControl/FormSelect';
import FormTextArea from '../../../../components/FormControl/FormTextArea';
import ModalButton from '../../../../components/Modal/ModalButton';
import Loading from '../../../../components/Loading';
import FormLabel from '../../../../components/FormControl/FormLabel';
import ProjectService from '../../../../services/admin/project';
import FormInput from '../../../../components/FormControl/FormInput';
import { TYPE_TEXT } from '../../../../constants/inputType';
import { PROJECT_STATUS } from '../../../../constants/status';


function CreateProject({ setShowModal, isFetchData, setIsFetchData }: any) {
    const [project, setProject] = useState({
        title: '',
        description: '',
        status: 1,
    })
    const [showLoading, setShowLoading] = useState(false)

    const handleCreateProject = async () => {
        setShowLoading(true)
        try {
            await ProjectService.create(project)
            setShowModal(false)
            setIsFetchData(!isFetchData)
            toast('Create project success');
        } catch (error: any) {
            const errors: any = getErrors(error.response.data.data)[0];
            toast(errors);
        }
        setShowLoading(false)
    }

    return (
        <>
            <ModalHeading title={`Add project`} callback={() => setShowModal(false)} />
            <div className="p-6 space-y-6">
                <div className="mb-6 ">
                    <FormLabel title={`Title`} />
                    <FormInput
                        type={TYPE_TEXT}
                        placeholder={'Title...'}
                        readOnly={false}
                        value={project.title}
                        callback={(e: any) => {
                            setProject({ ...project, title: e.target.value })
                        }}
                    />
                </div>

                <div className="mb-6">
                    <FormLabel title={`Description`} />
                    <FormTextArea
                        placeholder={`Description...`}
                        callback={(e: any) => {
                            setProject({ ...project, description: e.target.value })
                        }}
                        value={project.description} />
                </div>
                <div className="mb-6 ">
                    <FormLabel title={`Status`} />
                    <FormSelect
                        callback={(e: any) => {
                            setProject({ ...project, status: parseInt(e.target.value) })
                        }}
                        data={
                            <>
                                {
                                    PROJECT_STATUS.map((value: any, index: any) => {
                                        return <option key={index} value={value.value}>{value.name}</option>
                                    })
                                }
                            </>
                        }
                        default={project.status}
                    />
                </div>
            </div>
            <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <ModalButton title={`Cancel`} callback={() => setShowModal(false)} styles={`text-gray-500 bg-white hover:bg-gray-100 focus:ring-gray-200 border border-gray-200 px-5 py-2 hover:text-gray-900`} />
                <ModalButton title={<>{showLoading && <div className='absolute flex items-center left-1'><Loading /></div>}Create project</>} isDisabled={showLoading} callback={() => { handleCreateProject() }} styles={`px-8 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 relative`} />
            </div>
        </>
    );
}

export default CreateProject;
