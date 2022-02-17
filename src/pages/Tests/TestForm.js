import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import {Form, UseForm} from "../../components/useForm"
import Controls from "../../components/controls/Controls"
import {HowToReg} from "@material-ui/icons";

const initialFieldValues = {
    id: '0',
    name: '',
    description: '',
    print_wrong: 0,
    print_answer: 0,
    oneshot: 0,
    retain: 0,
    timer: 0
}
// const languages = [
//     {id: 1, title: 'English'},
//     {id: 2, title: 'Russian'},
//     {id: 3, title: 'Chinese'},
//     {id: 4, title: 'Korean'}
// ];
// const genderItems = [
//     {id: 'm', title: '남자'},
//     {id: 'f', title: '여자'},
//     {id: 'a', title: '외개인'}
// ]


export default function TestForm(props) {

    const {addOrEdit, recordForEdit} = props;

    const validate = () => {
        let temp = {}
        temp.name = values.name ? "" : "이름이 필수 입니다..."
        temp.timer = (/^[0-9]*$/).test(values.timer) ? "" : "숫자 입력하세요..."
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
        if (validate()) {
            addOrEdit(values, resetForm)
        }
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
                        disabled
                    />
                    <Controls.Input
                        label="테스트 이름"
                        error={errors.name}
                        value={values.name}
                        name="name"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="테스트 설명"
                        value={values.description}
                        name="description"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="시간제 노동자"
                        error={errors.timer}
                        value={values.timer}
                        name="timer"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controls.Checkbox
                        label="틀림 보여줌"
                        value={values.print_wrong}
                        name="print_wrong"
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        label="답변 보여줌"
                        value={values.print_answer}
                        name="print_answer"
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        label="완샷"
                        value={values.oneshot}
                        name="oneshot"
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        label="유지"
                        value={values.retain}
                        name="retain"
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
