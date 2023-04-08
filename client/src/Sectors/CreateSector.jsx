import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSector } from "../redux/actions/fetchSector";
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { TreeSelect } from 'primereact/treeselect';
import { Controller, useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';


import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import "./index.scss";
import { addUser } from "../redux/actions/addUser";
const CreateSector = () => {
    const dispatch = useDispatch();
    const sector = useSelector((state) => state.sectors.data);
    const [selectedNodeKeys, setSelectedNodeKeys] = useState(null);
    const [choosedSectorLabel, setChoosedSector] = useState("");
    const toast = useRef(null);
    const defaultValues = {
        name: '',
        choosedSector: '',
        accept: false
    }
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    useEffect(() => {
        dispatch(fetchSector())
    }, [])

    const successToast = () => {
        toast.current.show({ severity: 'success', summary: 'User Created', detail: 'Your information is successfully created', life: 2000 });
    };
    const onSubmit = (data) => {

        data.choosedSector = choosedSectorLabel;
        successToast();
        dispatch(addUser(data));
        console.log("11111111", data);

    };
    return (
        <>
            <div className="container">
                <div className="container-inner">
                    <div className="wrapper">
                        <div className="guildline-text">
                            <h3>Please enter your name and pick the Sectors you are currently involved in.</h3>
                        </div>
                        <form action="sectorForm" onSubmit={handleSubmit(onSubmit)} >
                            <Toast ref={toast} />
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
                                    {
                                        sector ?

                                            < Controller
                                                name="choosedSector"
                                                control={control}
                                                rules={{ required: "Value is required." }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <TreeSelect
                                                            {...field}
                                                            value={selectedNodeKeys}
                                                            onNodeSelect={(e) => { setSelectedNodeKeys(e.node.key); setChoosedSector(e.node.label) }}
                                                            options={sector}
                                                            metaKeySelection={false}

                                                            placeholder="Select Item"
                                                            className={classNames({
                                                                "p-invalid": fieldState.error
                                                            })}
                                                        />
                                                    </>)}
                                            />
                                            : null
                                    }
                                </div>
                            </div>
                            <div className="confirm-container">
                                <Controller name="accept" control={control} rules={{ required: true }} render={({ field, fieldState }) => (
                                    <Checkbox inputId={field.name} onChange={(e) => field.onChange(e.checked)} checked={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="accept" className={classNames({ 'p-error': errors.accept })}>Agree to terms*</label>
                            </div>
                            <div className="button-save">
                                <button type="submit">Save</button>
                            </div>
                        </form>

                    </div>
                </div >
            </div >

        </>
    )
}
export default CreateSector;