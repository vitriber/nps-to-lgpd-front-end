import { Card, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { FormEvent, useEffect } from 'react';
import ModalRegister from '../../components/ModalRegister';
import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    card: {
        padding: '20px',
    },
    textField: {
        marginRight: '5px',
        marginTop: theme.spacing(3),
    }
}));

const initialValues = {
    name: '',
    email: '',
    question_1: false,
    question_2: false,
    question_3: false,
    question_4: false,
    question_5: false,
    question_6: false,
    question_7: false,
    question_8: false,
    question_9: false,
    question_10: false,
    question_11: false,
    question_12: false,
    question_13: false,
    question_14: false,
    question_15: false,
    question_16: false,
    nps: 0
}


export default function RegisterQuestion() {
    const [values, setValues] = React.useState(initialValues);
    const classes = useStyles();

    useEffect(() => {
        setValues(initialValues);
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        const option = value === 'true' ? true : false;
        console.log('Esses são os valores', name, option);
        setValues({...values, [name]: option});
    };

    const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setValues({...values, [name]: value});
    };

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    
    const handleSubmit  = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        values.nps = Number(values.nps);
        await api.post('api/enterprise', values);
        setValues(initialValues);
        handleOpen();   
    }

    return (
        <main className={classes.content}>
            <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" color="primary">
                Cadastrar uma pergunta
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Card className={classes.card}>
                            <TextField
                                className={classes.textField}
                                autoComplete="fname"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Identificador da Pergunta"
                                onChange={handleChangeText}
                                autoFocus
                            />
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                required
                                fullWidth
                                id="constant_factor"
                                label="Fator Constante"
                                name="constant_factor"
                                autoComplete="constant_factor"
                                onChange={handleChangeText}
                            />
                            <TextField
                                className={classes.textField}
                                autoComplete="fname"
                                name="description_question"
                                variant="outlined"
                                required
                                fullWidth
                                id="description"
                                label="Descrição da Pergunta"
                                onChange={handleChangeText}
                                autoFocus
                            />
                        </Card>
                        <Card className={classes.card}>
                        <FormLabel component="legend">
                            <p>A pergunta é de múltipla escolha?</p> 
                        </FormLabel>
                        <RadioGroup aria-label="is_multiple" name="is_multiple" value={values.question_1} onChange={handleChange}>
                            <FormControlLabel value={true} control={<Radio />} label="Sim" />
                            <FormControlLabel value={false} control={<Radio />} label="Não" />
                        </RadioGroup>
                        </Card>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Cadastrar Pergunta
                </Button>
                </form>
            </div>
            <ModalRegister
                open={open}
                handleClose={handleClose}
            />
            </Container>
        </main>
    );
}