import React from 'react';
import {Grid} from "@material-ui/core";
import {Form, UseForm} from "../../components/useForm"
import Controls from "../../components/controls/Controls"
import {HowToReg} from "@material-ui/icons";
import {insertStudent} from "../../services/studentService";

const initialFieldValues = {
    id: 'cjs001',
    name: '',
    dob: new Date("2005-07-01"),
    gender: 'male',
    language: '',
    email: '',
    mobile: '',
    guardianName: '',
    avatar: '',
    comment: '',
    joinDate: new Date(),
    lastActiveDate: new Date(),
    isActive: false
}
const languages = [
    {id: 1, title: 'English'},
    {id: 2, title: 'Korean'},
    {id: 3, title: 'Russian'},
    {id: 4, title: 'Chinese'}
];
const genderItems = [
    {id: 'male', title: 'Male'},
    {id: 'female', title: 'Female'},
    {id: 'alien', title: 'Alien '}
]


export default function StudentForm(props) {

    const validate = () => {
        let temp = {}
        temp.name = values.name ? "" : "이름이 필수 입니다"
        temp.email = (/^$|.+@.+..+/).test(values.email) ? "" : "이메일이 유효하지 않습니다"
        temp.mobile = (/^\d{11}$/).test(values.mobile) ? "" : "휴대폰 번호는 11자리여야 합니다."
        temp.language = values.language?"": "언어가 필수 입니다"
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
        resetForm
    } = UseForm(initialFieldValues);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate())
            insertStudent(values)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12} sm={6} xl={4}>
                    <Controls.Input
                        label="ID"
                        value={values.id}
                        name="id"
                        onChange={handleInputChange}
                        disabled
                    />
                    <Controls.Input
                        label="Name"
                        error={errors.name}
                        value={values.name}
                        name="name"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Email"
                        error={errors.email}
                        value={values.email}
                        name="email"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Cellphone"
                        error={errors.mobile}
                        value={values.mobile}
                        name="mobile"
                        onChange={handleInputChange}
                    />
                    <Controls.DatePicker
                        label="DOB"
                        value={values.dob}
                        name="dob"
                        onChange={handleInputChange}
                    />
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    <Controls.Checkbox
                        label="Is Active?"
                        value={values.isActive}
                        name="isActive"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} xl={4}>
                    <Controls.Select
                        name="language"
                        label="First Language"
                        value={values.language}
                        onChange={handleInputChange}
                        options={languages}
                        error={errors.language}
                    />
                    <Controls.Input
                        variant="outlined"
                        label="Guardian Name"
                        value={values.guardianName}
                        name="guardianName"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        variant="outlined"
                        label="Avatar"
                        value={values.avatar}
                        name="avatar"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        variant="outlined"
                        label="Comment"
                        value={values.comment}
                        name="comment"
                        onChange={handleInputChange}
                    />
                    <Controls.DatePicker
                        label="Join Date"
                        value={values.joinDate}
                        name="joinDate"
                        onChange={handleInputChange}
                    />
                    <Controls.DatePicker
                        label="Last Active"
                        value={values.lastActiveDate}
                        name="lastActiveDate"
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
