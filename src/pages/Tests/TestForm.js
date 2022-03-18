import React, {useEffect} from 'react';
import {Grid, makeStyles} from "@material-ui/core";
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

const useStyles = makeStyles((theme) => ({
    buttonsDiv: {
        margin: '10px auto'
    }
}))

export default function TestForm(props) {

    const classes = useStyles()

    const {addOrEdit, recordForEdit} = props;

    const validate = () => {
        let temp = {}
        temp.name = values.name ? "" : "이름이 필수 입니다..."
        temp.timer = (/^[0-9]*$/).test(values.timer) ? "" : "숫자 입력하세요..."
        temp.oneshot = values.oneshot && values.retain ? "유지과 완샷 둘다 선택 불가능" : ""
        temp.retain = values.oneshot && values.retain ? "유지과 완샷 둘다 선택 불가능" : ""
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
        <Form style={{width: '500px'}} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12} sm={8}>
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
                <Grid item xs={12} sm={4}>
                    {/*<Controls.Checkbox*/}
                    {/*    label="틀림 보여줌"*/}
                    {/*    value={values.print_wrong}*/}
                    {/*    name="print_wrong"*/}
                    {/*    onChange={handleInputChange}*/}
                    {/*/>*/}
                    {/*<Controls.Checkbox*/}
                    {/*    label="답변 보여줌"*/}
                    {/*    value={values.print_answer}*/}
                    {/*    name="print_answer"*/}
                    {/*    onChange={handleInputChange}*/}
                    {/*/>*/}
                    <Controls.Checkbox
                        label="완샷"
                        error = {errors.oneshot}
                        value={values.oneshot}
                        name="oneshot"
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        label="유지"
                        error = {errors.retain}
                        value={values.retain}
                        name="retain"
                        onChange={handleInputChange}
                    />
                </Grid>
                <div className={classes.buttonsDiv}>
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
