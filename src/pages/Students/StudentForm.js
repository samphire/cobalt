import React, {useEffect} from 'react';
import {Card, CardContent, CardMedia, Grid, makeStyles, Typography} from "@material-ui/core";
import {Form, UseForm} from "../../components/useForm"
import Controls from "../../components/controls/Controls"
import {HowToReg} from "@material-ui/icons";
// import {getLanguages} from "../../services/studentService";
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const initialFieldValues = {
    id: 'cjs001',
    name: '',
    DOB: null,
    sex: 'm',
    language_id: 1,
    email: '',
    mobile: '',
    guardian_name: '',
    guardian_mobile: '',
    picUrl: '',
    pass: '',
    notes: '',
    join_date: null,
    last_active_date: null,
    isActive: false
}

const genderItems = [
    {id: 'm', title: '남자'},
    {id: 'f', title: '여자'},
    {id: 'a', title: '외개인'}
]

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '8px'
    }
}))

export default function StudentForm(props) {

    const uploadImages = async (e) => {
        e.preventDefault()
        const file = e.target.files[0];
        if (!file) return;
        alert("filesize is " + (file.size / 1024 / 1024).toFixed(2) + "Mb");
        if (file.size > 640000) {
            alert("File is too large. Cannot exceed 640kB");
            return;
        }
        if (file.name.includes(' ')) {
            alert("Do not try to upload images where the filename contains spaces");
            return;
        }
        let formData = new FormData();

        let fileExtension = file.name.split('.').pop().toLowerCase();
        let newFileName = values.id + "." + fileExtension;

        formData.append('file', file);
        formData.append('studid', values.id);
        try {
            const response = await fetch(SERVER_URL + "/postData.php?type=studPicUpload", {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                console.log("Upload failed: " + response.statusText);
                return;
            }
            console.log("Image uploaded successfully.");
            setValues(prev => ({
                ...prev,
                picUrl: newFileName + "?t=" + new Date().getTime()
            }));
        } catch (error) {
            console.log("Error uploading image: " + error);
        }
    }

    const classes = useStyles()
    const {langosh, addOrEdit, recordForEdit} = props;

    console.log("in studentform.js");

    const validate = () => {
        console.log((/^null$|^$|.+@.+..+/).test(values.email))
        console.log((/^null$|^$|^\d{11}$/).test(values.mobile))
        console.log((/^null$|^$|^\d{11}$/).test(values.guardian_mobile))
        let temp = {}
        temp.name = values.name ? "" : "이름이 필수 입니다"
        temp.email = (/^null$|^$|.+@.+..+/).test(values.email) ? "" : "이메일이 유효하지 않습니다"
        temp.mobile = (/^null$|^$|^\d{11}$/).test(values.mobile) ? "" : "휴대폰 번호는 11자리여야 합니다."
        temp.guardian_mobile = (/^null$|^$|^\d{11}$/).test(values.guardian_mobile) ? "" : "보호자의 휴대폰 번호는 11자리여야 합니다."
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
        e.preventDefault();
        if (validate()) {
            const payload = {
                ...values,
                isActive: values.isActive ? '1' : '0',  // <- API boundary conversion
            };
            addOrEdit(payload, resetForm);
        }
    };


    useEffect(() => {
        if (recordForEdit != null) {
            setValues(prev => ({
                ...prev,
                ...recordForEdit,
                // coerce to number for select
                language_id:
                    recordForEdit.language_id === '' || recordForEdit.language_id == null
                        ? ''
                        : Number(recordForEdit.language_id),
                // coerce to boolean for checkbox (handles true/false/1/0/'1'/'0')
                isActive:
                    recordForEdit.isActive === true ||
                    recordForEdit.isActive === 1 ||
                    recordForEdit.isActive === '1'
            }));
        }
    }, [recordForEdit, setValues]);


    const handleLanguageChange = e => {
        const v = e.target.value === '' ? '' : Number(e.target.value);
        setValues(prev => ({...prev, language_id: v}));
    }


    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12} sm={4}>
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
                        name="isActive"
                        checked={Boolean(values.isActive)}
                        onChange={(e) =>
                            setValues(v => ({ ...v, isActive: e.target.checked }))
                        }
                    />



                    <Controls.Select
                        name="language_id"
                        label="언어"
                        value={values.language_id ?? ''}
                        onChange={handleInputChange}
                        options={langosh.map(o => ({
                            id: Number(o.id ?? o.language_id),      // numeric id
                            title: o.name                   // ✅ map .name -> .title so it shows
                        }))}
                        error={errors.language_id}
                    />
                    {console.log('current value', values.language_id, typeof values.language_id)}
                    {console.log('menu values', langosh.map(o => [o.id ?? o.language_id, typeof (o.id ?? o.language_id), o.name, o.title]))}

                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controls.Input
                        variant="outlined"
                        label="보호자 성암"
                        value={values.guardian_name}
                        name="guardian_name"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        variant="outlined"
                        label="보호자 전화번호"
                        error={errors.guardian_mobile}
                        value={values.guardian_mobile}
                        name="guardian_mobile"
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
                        label="암호"
                        value={values.pass}
                        name="pass"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        variant="outlined"
                        label="주석"
                        value={values.notes}
                        multiline
                        rows={4}
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
                <Grid item xs={12} sm={4}>
                    <Card className={classes.root}>
                        <CardMedia
                            component="img"
                            height="220"
                            // image={SERVER_URL + "/userPics/" + values.picUrl}
                            image={values.picUrl ? `${SERVER_URL}/userPics/${values.picUrl}?t=${new Date().getTime()}` : "/defaultImage.jpg"}
                            alt="picture of user"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {values.name}
                            </Typography>
                        </CardContent>
                    </Card>
                    <input type="file" name="picURL" id="picURL" accept="image/*" onChange={uploadImages}/>
                </Grid>
            </Grid>
        </Form>
    );
};
