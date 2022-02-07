import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import {Form, UseForm} from "../../components/useForm"
import Controls from "../../components/controls/Controls"
import {HowToReg} from "@material-ui/icons";

const initialFieldValues = {
    id: 'cjs001',
    name: '',
    DOB: new Date("2005-07-01"),
    sex: 'm',
    language_id: 1,
    email: '',
    mobile: '',
    guardianName: '',
    guardianMobile: '',
    picUrl: '',
    notes: '',
    join_date: new Date(),
    last_active_date: new Date(),
    isActive: false
}
const languages = [
    {id: 1, title: 'English'},
    {id: 2, title: 'Russian'},
    {id: 3, title: 'Chinese'},
    {id: 4, title: 'Korean'}
];
const genderItems = [
    {id: 'm', title: '남자'},
    {id: 'f', title: '여자'},
    {id: 'a', title: '외개인'}
]


export default function TestForm(props) {

    const {addOrEdit, recordForEdit} = props;

    const validate = () => {
        let temp = {}
        temp.name = values.name ? "" : "이름이 필수 입니다"
        temp.email = (/^$|.+@.+..+/).test(values.email) ? "" : "이메일이 유효하지 않습니다"
        temp.mobile = (/^\d{11}$/).test(values.mobile) ? "" : "휴대폰 번호는 11자리여야 합니다."
        temp.language_id = values.language_id ? "" : "언어가 필수 입니다"
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
        isEdit
    } = UseForm(initialFieldValues);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate())
            addOrEdit(values, resetForm)
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({...recordForEdit})
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Controls.Input
                        label="ID"
                        value={values.id}
                        name="id"
                        onChange={handleInputChange}
                        // disabled
                    />
                    <Controls.Input
                        label="성암"
                        error={errors.name}
                        value={values.name}
                        name="name"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="전자메일"
                        error={errors.email}
                        value={values.email}
                        name="email"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="휴대폰"
                        error={errors.mobile}
                        value={values.mobile}
                        name="mobile"
                        onChange={handleInputChange}
                    />
                    <Controls.DatePicker
                        label="탄생날"
                        value={values.DOB}
                        name="DOB"
                        onChange={handleInputChange}
                    />
                    <Controls.RadioGroup
                        name="sex"
                        label="성별"
                        value={values.sex}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    <Controls.Checkbox
                        label="활성?"
                        value={values.isActive}
                        name="isActive"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controls.Select
                        name="language_id"
                        label="언어"
                        value={values.language_id}
                        onChange={handleInputChange}
                        options={languages}
                        error={errors.language}
                    />
                    <Controls.Input
                        variant="outlined"
                        label="보호자 성암"
                        value={values.guardianName}
                        name="guardianName"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        variant="outlined"
                        label="보호자 전화번호"
                        error={errors.mobile}
                        value={values.guardianMobile}
                        name="guardianMobile"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        variant="outlined"
                        label="사진"
                        value={values.picUrl}
                        name="picUrl"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        variant="outlined"
                        label="주석"
                        value={values.notes}
                        name="notes"
                        onChange={handleInputChange}
                    />
                    <Controls.DatePicker
                        label="가입날"
                        value={values.join_date}
                        name="join_date"
                        onChange={handleInputChange}
                    />
                    <Controls.DatePicker
                        label="전활성날"
                        value={values.last_active_date}
                        name="last_active_date"
                        onChange={handleInputChange}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="submit"
                            startIcon={<HowToReg/>}
                        />
                        <Controls.Button
                            text="reset"
                            color="secondary"
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    );
}
;
