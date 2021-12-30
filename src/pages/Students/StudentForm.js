import React from 'react';
import {Grid} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import {Form, UseForm} from "../../components/useForm"
import Controls from "../../components/controls/Controls"

const initialFieldValues = {
    id: 'cjs001',
    name: '',
    dob: new Date("2005-07-01"),
    gender: 'male',
    language: '',
    mobile: '',
    email: '',
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

    const {
        values,
        handleInputChange
    } = UseForm(initialFieldValues);

    return (
        <Form>
            <Grid container>
                <Grid item xs={12} sm={6} xl={3}>
                    <Controls.Input
                        label="ID"
                        value={values.id}
                        name="id"
                        onChange={handleInputChange}
                        disabled
                    />

                    <Controls.Input
                        label="Name"
                        value={values.name}
                        name="name"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Email"
                        value={values.email}
                        name="email"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Cellphone"
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
                <Grid  item xs={12} sm={6} xl={3}>
                    <Controls.Select
                        name="language"
                        label="First Language"
                        value={values.language}
                        onChange={handleInputChange}
                        options={languages}
                    />
                    <TextField
                        variant="outlined"
                        label="Guardian Name"
                        value={values.guardianName}
                        name="guardianName"
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        label="Avatar"
                        value={values.avatar}
                        name="avatar"
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        label="Comment"
                        value={values.comment}
                        name="comment"
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        label="Join Date"
                        value={values.joinDate}
                        name="joinDate"
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        label="Last Active"
                        value={values.lastActiveDate}
                        name="lastActiveDate"
                        onChange={handleInputChange}
                    />

                </Grid>
            </Grid>
        </Form>
    );
}
;
