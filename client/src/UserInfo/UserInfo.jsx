
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ToggleButton } from 'primereact/togglebutton';
import { ProgressSpinner } from 'primereact/progressspinner';
import { updateUser } from "../redux/actions/updateUser";
import { useNavigate } from "react-router-dom";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';                       // core css
import "./index.scss";

const UserInfo = () => {

    const dispatch = useDispatch();
    const store = useStore();
    const navigate = useNavigate();
    const [dialogVisible, setDialogVisible] = useState(true);
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [defaultValues, setDefaultValue] = useState(null);
    const [counter, setCounter] = useState(60);
    const [expriredTimeInfo, setExpiredTimeInfo] = useState(null);
    const toast = useRef(null);
    const expireUpdateToast = useRef(null);
    const { control, formState: { errors }, handleSubmit, reset } = useForm({});

    const getRawUserInfo = async () => {
        let rawData = await localStorage.getItem('userInfo');
        let userInfor = await JSON.parse(rawData);
        if (userInfor.data) {
            setDefaultValue(userInfor.data);
            setExpiredTimeInfo(userInfor);
        }
    }
    const dialogFuncMap = {
        'dialogVisible': setDialogVisible,
    }
    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const expiredUpdateToast = () => {
        expireUpdateToast.current.show({ severity: 'error', summary: 'Updated Fail !', detail: 'Your update time is over. Redirect to create page', life: 3345000 });
    }
    const successToast = () => {
        toast.current.show({ severity: 'success', summary: 'User Updated !', detail: 'Your information is successfully updated', life: 2000 });
    };

    const onSave = async (data) => {
        const res = Date.now() > expriredTimeInfo.expTime;
        if (!res) {
            await dispatch(updateUser(data));
            const userInfor = store.getState();
            if (userInfor.updateUser.updateStatus == 200) {
                const date = Date.now()
                localStorage.setItem('userInfo', JSON.stringify({
                    data: userInfor.updateUser.userInfo,
                    initial: date,
                    expTime: date + 1000 * 60 //1 minutes in ms
                }))
                successToast();
                setDisable(true);
            }
        } else {
            expiredUpdateToast();
            localStorage.removeItem('userInfo');
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }
    const getFormErrorMessage = (name) => {
        return (
            errors[name] && <small className="p-error">{errors[name].message}</small>
        );
    };
    useEffect(() => {
        //check exprired when refresh  
        getRawUserInfo();
        setTimeout(() => {
            setLoading(true);
        }, 2000);
        setTimeout(() => {
            setDialogVisible(false);
        }, 5000);
    }, [])
    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues])

    return (
        <>
            {
                defaultValues && loading ?
                    <>
                        <Button label="Back to create" rounded severity="warning" outlined icon="pi pi-bookmark" onClick={() => navigate('/')} />
                        <Dialog className="dialog-noti" header={`Hi ${defaultValues?.name}`} visible={dialogVisible} position={"top"} modal
                            draggable={false} resizable={false} breakpoints={{ '960px': '75vw', '641px': '80vw', '480px': '80vw' }} onHide={() => onHide('dialogVisible')}>
                            <p className="m-0">Here is your information. If some information goes wrong, you can edit your information in 1 minute.</p>
                        </Dialog>
                        <div className="userInfo-container">
                            <div className="userInfo-container-inner">
                                <div className="user-info-wrapper">
                                    <div className="user-header">
                                        <h3>User information</h3>
                                    </div>
                                    <form onSubmit={handleSubmit(onSave)}>
                                        <Toast ref={toast} />
                                        <Toast ref={expireUpdateToast} />
                                        <div className="name">
                                            <div className="name-label">
                                                <label htmlFor="name">Your name</label>
                                            </div>
                                            <div className="name-input">
                                                <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                                    <InputText id={field.name} disabled={disable} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                                )} />
                                                {getFormErrorMessage('name')}
                                            </div>
                                        </div>
                                        <div className="sector">
                                            <div className="sector-label">
                                                <label htmlFor="sector" >Sector</label>
                                            </div>
                                            <div className="sector-input">
                                                <Controller name="sector" control={control} rules={{ required: 'Sector is required.' }} render={({ field, fieldState }) => (
                                                    <InputText id={field.name} disabled={disable} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                                )} />
                                                {getFormErrorMessage('sector')}
                                            </div>

                                        </div>
                                        <div className="agree-text">
                                            <div className="agree-label">
                                                <label htmlFor="agree" >Status </label>
                                            </div>
                                            <div className="agree-input">
                                                <InputText id="agree-text" disabled defaultValue={(defaultValues.agree == true && defaultValues) ? "You agree to term " : "You don't agree to term"} />
                                            </div>
                                        </div>
                                        <div className="guildline-text">
                                            <div className="guildline-text-wrapper">
                                                <div className="text">Something wrong with your information</div>
                                                <div>Edit here</div>

                                            </div>
                                            <div className="arrow">
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </div>
                                        <div className="edit-btn">
                                            <ToggleButton checked={disable} onLabel="Edit" offLabel="Cancel" onChange={(e) => { setDisable(e.value) }} onIcon="pi pi-check" offIcon="pi pi-times" aria-label="Confirmation" />
                                            {!disable ? <Button label="Save" className="p-button-success" /> : null}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                    : <ProgressSpinner strokeWidth="4" />
            }
        </>
    )
}
export default UserInfo;