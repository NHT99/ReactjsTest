import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { fetchSector } from "../redux/actions/fetchSector";
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { TreeSelect } from 'primereact/treeselect';
import { Controller, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useNavigate } from "react-router-dom";

import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import "./index.scss";
import { addUser } from "../redux/actions/addUser";
const CreateSector = () => {
    const dispatch = useDispatch();
    const sector = useSelector((state) => state);
    const [loading, setLoading] = useState(false);
    const [selectedNodeKeys, setSelectedNodeKeys] = useState(null);
    const [choosedSectorLabel, setChoosedSector] = useState("");
    const navigate = useNavigate();
    const toast = useRef(null);
    const defaultValues = {
        name: '',
        sector: '',
        agree: false,
    }
    const store = useStore();
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const showSuccess = async () => {
        await toast.current.show({ severity: 'success', summary: 'Create Success', detail: 'Your user information is successfully created', life: 2000 });
    }
    useEffect(() => {
        dispatch(fetchSector());
        setInterval(() => {
            setLoading(true);
        }, 3000);

    }, [])

    //check when state have createStatus
    const createStatus = (status) => {
        if (status.user.createStatus == 200) {
            showSuccess();
        }
    }
    const onSubmit = async (data) => {
        data.sector = choosedSectorLabel;
        //add to database
        await dispatch(addUser(data));
        const userInfo = store.getState();
        //after create user return createStatus 
        createStatus(userInfo);

        reset();
        setSelectedNodeKeys(null);
        //set exprired time of data
        const date = Date.now()
        //save user data to local storage to check exprired edit time
        localStorage.setItem('userInfo', JSON.stringify({
            data: userInfo.user.userInfo,
            initial: date,
            expTime: date + 1000 * 60 //1 minutes in ms
        }))
        setTimeout(() => {
            navigate("/userInfo");
        }, 2000)
    };

    return (
        <>
            {
                sector.sectors.data && loading ?
                    <div className="container">
                        <div className="container-inner">
                            <Toast ref={toast} />
                            <div className="wrapper">
                                <div className="guildline-text">
                                    <h3>Please enter your name and pick the Sectors you are currently involved in.</h3>
                                </div>
                                <form action="sectorForm" onSubmit={handleSubmit(onSubmit)} >

                                    <div className="name-input">
                                        <div className="name-text">
                                            <p>Name</p>
                                        </div>
                                        <div className="input-container">
                                            <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (

                                                <InputText {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                            )} />
                                        </div>
                                    </div>
                                    <div className="sector-container">
                                        <div className="sector-text">
                                            <p>Sectors</p>
                                        </div>
                                        <div className="select-manufactor">
                                            < Controller
                                                name="sector"
                                                control={control}
                                                rules={{ required: "Value is required." }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <TreeSelect
                                                            {...field}
                                                            value={selectedNodeKeys}
                                                            onNodeSelect={(e) => { setSelectedNodeKeys(e.node.key); setChoosedSector(e.node.label) }}
                                                            options={sector.sectors.data}
                                                            metaKeySelection={false}
                                                            placeholder="Select Item"
                                                            className={classNames({
                                                                "p-invalid": fieldState.error
                                                            })}
                                                        />
                                                    </>)}
                                            />
                                        </div>
                                    </div>
                                    <div className="confirm-container">
                                        <Controller name="agree" control={control} rules={{ required: true }} render={({ field, fieldState }) => (
                                            <Checkbox inputId={field.name} onChange={(e) => { field.onChange(e.checked) }} checked={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                        <label htmlFor="agree" className={classNames({ 'p-error': errors.accept })}>Agree to terms*</label>
                                    </div>
                                    <div className="button-save">
                                        <button type="submit">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div >
                    </div >
                    : <ProgressSpinner strokeWidth="4" />}
        </>
    )
}
export default CreateSector;