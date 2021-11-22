import React, {useEffect, useRef, useState} from 'react';
import './Questionmaker.css'
import girl from '../img/girl.png'
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

let QArr = [];
let idx = 0;
let oldidx = 0;
let max = 0;

let initialState = {
    testid: "",
    qnum: 1,
    text1: "",
    text2: "",
    text3: "",
    text4: "",
    text5: "",
    text6: "",
    text7: "",
    answer: "answer here",
    type: 3,
    rubrik: "",
    image: "",
    audio: "",
    video: "",
}

export default function Questionmaker() {

    const left = useRef(null);
    const right = useRef(null);
    const del = useRef(null);
    const [questionsArray, setQuestionsArray] = useState([]);
    const [questionData, setQuestionData] = useState(initialState)
    const [questionsCreated, setQuestionsCreated] = useState(false)

    const handleClose = (event, reason) => {
        setQuestionsCreated(false);
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyEvent);
        return () => document.removeEventListener('keydown', handleKeyEvent);
    }, [])


    function handleKeyEvent(e) {
        // e.preventDefault();
        // e.stopImmediatePropagation();
        // e.stopPropagation();
        console.log(e.code);
        console.log(e.keyCode);
        console.log(questionsArray.length);
        switch (e.keyCode) {
            case 37:
                left.current.click();
                break;
            case 39:
                right.current.click();
                break;
            // case 8:   // YOU MUPPET... YOU NEED DELETE AND BACKSPACE TO EDIT QUESTIONS!!!
            // case 46:
            //     del.current.click();
            //     break;
            case 13:
                right.current.click();
                break;
            default:
                return;
        }
    }


    function goLeft() {
        oldidx = idx;
        idx = idx > 0 ? --idx : idx;
        console.log("idx is " + idx + " and max is " + max);
        if (idx === questionsArray.length - 1) {
            console.log("adding to array in left because current value not added otherwise");
            setQuestionsArray(currentArray => [...questionsArray, questionData]);
        } else {
            if (oldidx !== idx) {
                questionsArray[idx + 1] = questionData;
            }
        }
        setQuestionData(questionsArray[idx]);
        console.log(questionsArray)
        console.log(questionData)
    }

    const goRight = function () {
        idx++;
        max = idx > max ? idx : max;
        console.log("idx: " + idx + " max: " + max + " array: " + questionsArray.length);
        console.log(questionData);

        if (idx > questionsArray.length) {
            console.log("Adding a new question. questionsArray length is " + questionsArray.length);
            // for adding a new question, this function expects to see an array length 1 less than idx
            // because it is always adding the previous state
            // this is broken when left button is clicked
            setQuestionsArray(currentArray => [...questionsArray, questionData]);
            setQuestionData({...initialState, qnum: idx + 1})
        } else {
            console.log("there is no new question")
            if (idx === questionsArray.length) {
                setQuestionData({...initialState, qnum: idx + 1})

                // setQuestionsArray(questionsArray);
            } else {
                // update values
                questionsArray[idx - 1] = questionData;
                setQuestionData(questionsArray[idx])
            }
        }
        console.log(questionsArray)
        console.log(questionData)
    }


    function deleteQuestion() {
        alert("not implemented yet");
        // console.log(idx + "," + max);
        // if (max > 0) {
        //     QArr.splice(idx, 1);
        //     max--;
        //     renumber();
        //     if (idx === 0) {
        //         // goRight();
        //     } else {
        //         goLeft();
        //     }
        // }
    }

    function renumber() {
        for (let i = idx; i <= max; i++) {
            QArr[i].qnum--;
        }
    }

    const setType = event => {
        setQuestionData({...questionData, type: parseInt(event.target.value)});
    }

    function submitQuestions(e) {
        e.preventDefault()

        // console.log(questionsArray)
        // console.log(JSON.stringify(questionsArray))

        // for (var property in QArr) {
        //     console.log(property, ":", QArr[property]);
        // }
        //
        // console.log(QArr[0]._qnum);
        // console.log(QArr[0].qnum);

        async function postQuestions() {
            let responseObj = await fetch('https://notborder.org/cobalt/postData.php?type=questions', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(questionsArray)
            });
            let responseText = await responseObj.text();
            // console.log(responseText);
            console.log(responseText === 'success' ? 'postData.php reports success on posting questions' : 'posting questions failed in postData.php');
            if(responseText === "success"){
                console.log("SHOULD BE OPENING SNACKBAR");
                setQuestionsCreated(true);
            }
        }

        postQuestions().then(r => console.log(r));

        return true;
    }

    return (
        <>

            <image></image>
            <img src={girl} alt='image of girl'
                 style={{float: 'left', width: '400px', position: 'absolute', left: '100px', top: '40px'}}/>
            <div className="container">
                <div className="row">
                    <div className="col-sm-2">
                        <div className="input">
                            <label htmlFor="testid">Test ID</label>
                            <input type="text"
                                   value={questionData.testid}
                                   style={{
                                       width: 100 + '%',
                                       paddingLeft: 20 + '%',
                                       fontSize: 48 + 'px',
                                       fontWeight: 'bolder'
                                   }}
                                   id="testid"
                                   onChange={(e) => {
                                       setQuestionData({...questionData, testid: e.target.value})
                                       initialState.testid = e.target.value
                                   }}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="qnum">Question Number</label>
                            <input type="text"
                                   value={questionData.qnum}
                                   style={{
                                       width: 100 + '%',
                                       paddingLeft: 20 + '%',
                                       fontSize: 48 + 'px',
                                       fontWeight: 'bolder'
                                   }} id="qnum"
                                   onChange={e => setQuestionData({...questionData, qnum: parseInt(e.target.value)})}/>
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <div className="form-style-8">
                            <label htmlFor="text1">Question Text</label>
                            <input type="text" value={questionData.text1} id="text1"
                                   onChange={e => setQuestionData({...questionData, text1: e.target.value})}
                            />
                            <label htmlFor="text2">Option 1</label>
                            <input type="text" value={questionData.text2} id="text2"
                                   onChange={e => setQuestionData({...questionData, text2: e.target.value})}
                            />
                            <label htmlFor="text3">Option 2</label>
                            <input type="text" value={questionData.text3} id="text3"
                                   onChange={e => setQuestionData({...questionData, text3: e.target.value})}
                            />
                            <label htmlFor="text4">Option 3</label>
                            <input type="text" value={questionData.text4} id="text4"
                                   onChange={e => setQuestionData({...questionData, text4: e.target.value})}
                            />
                            <label htmlFor="text5">Option 4</label>
                            <input type="text" value={questionData.text5} id="text5"
                                   onChange={e => setQuestionData({...questionData, text5: e.target.value})}
                            />
                            <label htmlFor="text6">Option 5</label>
                            <input type="text" value={questionData.text6} id="text6"
                                   onChange={e => setQuestionData({...questionData, text6: e.target.value})}
                            />
                            <label htmlFor="text7">Option 6</label>
                            <input type="text" value={questionData.text7} id="text7"
                                   onChange={e => setQuestionData({...questionData, text7: e.target.value})}
                            />
                            <label htmlFor="answer">Answer</label>
                            <input type="text" value={questionData.answer} id="answer"
                                   onChange={e => setQuestionData({...questionData, answer: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-style-8">
                            <label>Type</label>
                            <div style={{marginLeft: '30%', marginTop: -20 + 'px'}}>
                                <label style={{marginRight: '8px'}}>
                                    <input type="radio" name="type" id="1" value="1"
                                           checked={questionData.type === 1}
                                           onChange={setType}
                                    />
                                    Text Input
                                </label><br/>
                                <label style={{marginRight: '8px'}}>
                                    <input type="radio" name="type" id="3" value="3"
                                           checked={questionData.type === 3}
                                           onChange={setType}
                                    />
                                    Radio Buttons
                                </label><br/>
                                <label style={{marginRight: '8px'}}>
                                    <input type="radio" name="type" id="4" value="4"
                                           checked={questionData.type === 4}
                                           onChange={setType}
                                    />
                                    Audio
                                </label><br/>
                                <label style={{marginRight: '8px'}}>
                                    <input type="radio" name="type" id="5" value="5"
                                           checked={questionData.type === 5}
                                           onChange={setType}
                                    />
                                    multi-select
                                </label><br/>
                                <label style={{marginRight: '8px'}}>
                                    <input type="radio" name="type" id="6" value="6"
                                           checked={questionData.type === 6}
                                           onChange={setType}
                                    />
                                    Arrange Pieces
                                </label>
                            </div>
                            <label htmlFor="rubrik">Rubrik</label>
                            <input type="text" value={questionData.rubrik} id="rubrik" onChange={(e) => {
                                setQuestionData({...questionData, rubrik: e.target.value})
                            }}/>
                            <label htmlFor="image">image</label>
                            <input type="text" value={questionData.image} id="image" onChange={(e) => {
                                setQuestionData({...questionData, image: e.target.value})
                            }}/>
                            <label htmlFor="audio">audio</label>
                            <input type="text" value={questionData.audio} id="audio" onChange={(e) => {
                                setQuestionData({...questionData, audio: e.target.value})
                            }}/>
                            <label htmlFor="video">video</label>
                            <input type="text" value={questionData.video} id="video" onChange={(e) => {
                                setQuestionData({...questionData, video: e.target.value})
                            }}/>
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <button onClick={goLeft} ref={left}
                                    style={{float: 'left', marginLeft: '8%', marginTop: '-20px'}}>&#x21D0;</button>
                            <button onClick={deleteQuestion} ref={del} style={{display: 'inline'}}>DELETE</button>
                            <button onClick={goRight} ref={right}
                                    style={{float: 'right', marginRight: '8%', marginTop: '-20px'}}>&#x21D2;</button>
                        </div>
                        <div>
                            <button onClick={(event) => submitQuestions(event)} style={{marginTop: '50px'}}>Submit All
                                Questions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar
                open={questionsCreated}
                onClose={handleClose}
                autoHideDuration={3500}
                anchorOrigin={{horizontal: 'center', vertical: 'top'}}
            >
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{fontSize: '24px', color: 'white', fontWeight: 'bolder', width: '100%'}}>
                    Questions Uploaded!
                </Alert>
            </Snackbar>
        </>
    );
}
