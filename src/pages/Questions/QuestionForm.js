import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import {Form, UseForm} from "../../components/useForm"
import Controls from "../../components/controls/Controls"
import {HowToReg} from "@material-ui/icons";

let initialFieldValues = {
    test_id: '',
    qnum: '1',
    rubrik: '',
    text1: '',
    text2: '',
    text3: '',
    text4: '',
    text5: '',
    text6: '',
    text7: '',
    answer: '',
    type: 3,
    image: '',
    audio: '',
    video: ''
}

const typeItems = [
    {id: '1', title: 'text input'},
    {id: '2', title: 'drop-down'},
    {id: '3', title: 'radio buttons'},
    {id: '4', title: 'file upload'},
    {id: '5', title: 'multi select'},
    {id: '6', title: 'draggable'}
]

export default function QuestionForm(props) {

    const {id, qnum, addOrEdit, recordForEdit} = props;

    const validate = () => {
        // let temp = {}
        // temp.name = values.name ? "" : "이름이 필수 입니다"
        // temp.email = (/^$|.+@.+..+/).test(values.email) ? "" : "이메일이 유효하지 않습니다"
        // temp.mobile = (/^\d{11}$/).test(values.mobile) ? "" : "휴대폰 번호는 11자리여야 합니다."
        // temp.language_id = values.language_id ? "" : "언어가 필수 입니다"
        // setErrors({
        //     ...temp
        // })
        //
        // return Object.values(temp).every(x => x === "")
        return true
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

    useEffect(()=>{
        setValues({...values, test_id : id})
        initialFieldValues.test_id = id
        initialFieldValues.qnum = qnum + 1
    }, [])

    useEffect(() => {
        if (recordForEdit != null)
            setValues({...recordForEdit})
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Controls.Input
                        label="Test Id"
                        value={values.test_id}
                        name="test_id"
                        onChange={handleInputChange}
                        disabled
                    />
                    <Controls.Input
                        label="Question Number"
                        error={errors.qnum}
                        value={values.qnum}
                        name="qnum"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Text 1"
                        value={values.text1}
                        name="text1"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Text 2"
                        value={values.text2}
                        name="text2"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Text 3"
                        value={values.text3}
                        name="text3"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Text 4"
                        value={values.text4}
                        name="text4"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Text 5"
                        value={values.text5}
                        name="text5"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Text 6"
                        value={values.text6}
                        name="text6"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Text 7"
                        value={values.text7}
                        name="text7"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid xs={12} sm={6}>
                    <Controls.Input
                        label="Answer"
                        value={values.answer}
                        name="answer"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Rubrik"
                        value={values.rubrik}
                        name="rubrik"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Image"
                        value={values.image}
                        name="image"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Audio"
                        value={values.audio}
                        name="audio"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Video"
                        value={values.video}
                        name="video"
                        onChange={handleInputChange}
                    />
                    <Controls.RadioGroup
                        name="type"
                        label="type"
                        value={values.type}
                        onChange={handleInputChange}
                        items={typeItems}
                    />
                </Grid>
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
        </Form>
    );
}
;
