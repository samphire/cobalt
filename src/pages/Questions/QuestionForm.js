import React, {useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import {Form, UseForm} from "../../components/useForm"
import Controls from "../../components/controls/Controls"
import {HowToReg} from "@material-ui/icons";
import TabIndexContent from "react-tabindex-content"
import {Divider} from "@mui/material";

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
    type: '3',
    image: '',
    audio: '',
    video: ''
}

const typeItems = [
    {id: '1', title: 'text input'},
    {id: '3', title: 'radio buttons'},
    // {id: '4', title: 'file upload'},
    {id: '5', title: 'multi select'},
    {id: '6', title: 'draggable'}
]


export default function QuestionForm(props) {

    function makeImage() {
        let today = new Date()
        let str = today.toISOString().replace(/-/gm, '').substr(0, 8)
        str += values.test_id
        str += values.qnum.toString().padStart(3, '0') + '.png'
        setValues({
            ...values,
            image: str
        })
    }

    function makeAudio() {
        return values.test_id.toString().padStart(5, '0') + values.qnum.toString().padStart(3, '0') + '.mp3'
    }

    function setAnswer(which, input) {
        if (values.type === '3' || values.type === '2') {
            setValues({
                ...values,
                answer: which
            })
        }
        if (values.type === '5') {
            setValues({
                ...values,
                answer: (() => {
                    let str = values.answer
                    let myArr = str.split(",")
                    myArr[input - 2] = "true"
                    let bob = ""
                    myArr.forEach((el) => {
                        bob = bob + el + ","
                    })
                    return bob.replace(/\B,/g, "") // commas following positions that are not word boundaries!
                })()
            })
        }
    }

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

    useEffect(() => {
        setValues({...values, test_id: id, qnum: qnum + 1})
        initialFieldValues.test_id = id
        initialFieldValues.qnum = qnum + 1

    }, [])

    useEffect(() => {
        if (recordForEdit != null)
            setValues({...recordForEdit})
    }, [recordForEdit])

    let [jimmy, setJimmy] = useState(0);

    useEffect(() => {
        if (values.type === '2') {
            setValues({
                ...values,
                text2: '~',
                text3: '~',
                text4: '~',
            })
        }
        if (values.type === '5') {
            setValues({
                ...values,
                answer: 'false,false,false,false,false,false,'
            })
        }
    }, [jimmy])

    return (
        <Form style={{width: '800px'}} onSubmit={handleSubmit}>
            <TabIndexContent global={true}>
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
                            tabIndex="1"
                        />
                        <Controls.Input
                            label="Text 2"
                            value={values.text2}
                            name="text2"
                            onChange={handleInputChange}
                            onClick={() => {
                                setAnswer(values.text2, 2)
                            }}
                            tabIndex={values.type === "1" ? "4" : "2"}
                        />
                        <Controls.Input
                            label="Text 3"
                            value={values.text3}
                            name="text3"
                            onChange={handleInputChange}
                            onClick={() => {
                                setAnswer(values.text3, 3)
                            }}
                            tabIndex={values.type === "1" ? "5" : "3"}

                        />
                        <Controls.Input
                            label="Text 4"
                            value={values.text4}
                            name="text4"
                            onChange={handleInputChange}
                            onClick={() => {
                                setAnswer(values.text4, 4)
                            }}
                            tabIndex={values.type === "1" ? "6" : "4"}

                        />
                        <Controls.Input
                            label="Text 5"
                            value={values.text5}
                            name="text5"
                            onChange={handleInputChange}
                            onClick={() => {
                                setAnswer(values.text5, 5)
                            }}
                            tabIndex={values.type === "1" ? "7" : "5"}

                        />
                        <Controls.Input
                            label="Text 6"
                            value={values.text6}
                            name="text6"
                            onChange={handleInputChange}
                            onClick={() => {
                                setAnswer(values.text6, 6)
                            }}
                            tabIndex={values.type === "1" ? "8" : "6"}

                        />
                        <Controls.Input
                            label="Text 7"
                            value={values.text7}
                            name="text7"
                            onChange={handleInputChange}
                            onClick={() => {
                                setAnswer(values.text7, 7)
                            }}
                            tabIndex={values.type === "1" ? "9" : "7"}

                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <Controls.Input
                            label="Answer"
                            value={values.answer}
                            name="answer"
                            onChange={handleInputChange}
                            tabIndex={values.type === "1" ? "2" : "8"}

                        />
                        <Controls.Input
                            label="Rubrik"
                            value={values.rubrik}
                            name="rubrik"
                            onChange={handleInputChange}
                            tabIndex={values.type === "1" ? "10" : "9"}

                        />
                        <Controls.Input
                            label="Image"
                            value={values.image}
                            name="image"
                            onChange={handleInputChange}
                            onClick={() => makeImage()}
                        />
                        <Controls.Input
                            label="Audio"
                            value={values.audio}
                            name="audio"
                            onChange={handleInputChange}
                            onClick={() => {
                                setValues({
                                    ...values,
                                    audio: makeAudio()
                                })
                            }}
                        />
                        <Controls.Input
                            label="Video"
                            value={values.video}
                            name="video"
                            onChange={handleInputChange}
                        />
                        <div
                            onClick={() => {
                                setJimmy(jimmy + 1)
                            }}
                        >
                            <Controls.RadioGroup
                                name="type"
                                label="type"
                                value={values.type}
                                onChange={handleInputChange}
                                items={typeItems}
                            />

                        </div>
                        <Divider light/>
                        <br/>
                        <Grid container direction="row" justifyContent="space-evenly">
                            <Grid item>
                                <Controls.Button
                                    text="1, 2, 3, 4"
                                    onClick={() => {
                                        setValues({
                                            ...values,
                                            text2: 1,
                                            text3: 2,
                                            text4: 3,
                                            text5: 4
                                        })
                                        initialFieldValues.text2 = 1
                                        initialFieldValues.text3 = 2
                                        initialFieldValues.text4 = 3
                                        initialFieldValues.text5 = 4
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Controls.Button
                                    text="Set Type as Default"
                                    onClick={() => {
                                        initialFieldValues.type = values.type
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <div style={{margin: '0 auto'}}>
                        <Controls.Button
                            type="submit"
                            text="submit"
                            startIcon={<HowToReg/>}
                            tabIndex={values.type === "1" ? "3" : "10"}

                        />
                        <Controls.Button
                            text="reset"
                            color="secondary"
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </TabIndexContent>
        </Form>
    )
}

