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


export default function RegisterEnterprise() {
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
        console.log('Esses são os valores', name, value);
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
                Cadastrar Empresa
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
                                label="Nome da Empresa"
                                onChange={handleChangeText}
                                autoFocus
                            />
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Endereço de E-mail"
                                name="email"
                                autoComplete="email"
                                onChange={handleChangeText}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                        <FormLabel component="legend">
                            <p>A empresa realiza tratamento de dados pessoais dos seus clientes ou para seus clientes?</p> 
                            (Ex: faz a coleta ou armazenamento de dados pessoais de clientes, 
                            parceiros ou de "clientes de clientes" em infra-estrutura própria).
                        </FormLabel>
                        <RadioGroup aria-label="question_1" name="question_1" value={values.question_1} onChange={handleChange}>
                            <FormControlLabel value={true} control={<Radio />} label="Sim" />
                            <FormControlLabel value={false} control={<Radio />} label="Não" />
                        </RadioGroup>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                        <FormLabel component="legend">
                            <p>A empresa realiza o armazenamento de dados pessoais de seus clientes fora do país?</p>
                        (Ex: servidor AWS, servidor da matriz em outro país, etc)
                        </FormLabel>
                        <RadioGroup aria-label="question_2" name="question_2" value={values.question_2} onChange={handleChange}>
                            <FormControlLabel value={true} control={<Radio />} label="Sim" />
                            <FormControlLabel value={false} control={<Radio />} label="Não" />
                        </RadioGroup>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                        <FormLabel component="legend">
                            A empresa realiza o tratamento de dados pessoais sensíveis de seus clientes ou
                            para seus clientes?
                        </FormLabel>
                        <RadioGroup aria-label="question_3" name="question_3" value={values.question_3} onChange={handleChange}>
                            <FormControlLabel value={true} control={<Radio />} label="Sim" />
                            <FormControlLabel value={false} control={<Radio />} label="Não" />
                        </RadioGroup>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                        <FormLabel component="legend">
                            <p>A empresa realiza o tratamento de dados pessoais de crianças e adolescentes</p>
                            (menores de 18 anos como clientes)?
                        </FormLabel>
                        <RadioGroup aria-label="question_4" name="question_4" value={values.question_4} onChange={handleChange}>
                            <FormControlLabel value={true} control={<Radio />} label="Sim" />
                            <FormControlLabel value={false} control={<Radio />} label="Não" />
                        </RadioGroup>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                        <FormLabel component="legend">
                            As atividades de tratamento de dados pessoais nos sistemas da empresa envolvem automação 
                            de decisão (Ex: RPA), realiza profiling ou usa analytics?
                        </FormLabel>
                        <RadioGroup aria-label="question_5" name="question_5" value={values.question_5} onChange={handleChange}>
                            <FormControlLabel value={true} control={<Radio />} label="Sim" />
                            <FormControlLabel value={false} control={<Radio />} label="Não" />
                        </RadioGroup>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                        <FormLabel component="legend">
                            A empresa tem algum fluxo interno estruturado para atender requisições de
                            informações por clientes ou titulares de dados pessoais?
                        </FormLabel>
                        <RadioGroup aria-label="question_6" name="question_6" value={values.question_6} onChange={handleChange}>
                            <FormControlLabel value={true} control={<Radio />} label="Sim" />
                            <FormControlLabel value={false} control={<Radio />} label="Não" />
                        </RadioGroup>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                        <FormLabel component="legend">
                            Nos sistemas utilizados pela empresa (próprios e de terceiros), 
                            há segmentação de acesso a usuários por níveis?
                        </FormLabel>
                        <RadioGroup aria-label="question_7" name="question_7" value={values.question_7} onChange={handleChange}>
                            <FormControlLabel value={true} control={<Radio />} label="Sim" />
                            <FormControlLabel value={false} control={<Radio />} label="Não" />
                        </RadioGroup>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                        <FormLabel component="legend">
                            A empresa possui uma política de privacidade estruturada que reflita
                            atualmente os seus processos internos?
                        </FormLabel>
                        <RadioGroup aria-label="question_8" name="question_8" value={values.question_8} onChange={handleChange}>
                            <FormControlLabel value={true} control={<Radio />} label="Sim" />
                            <FormControlLabel value={false} control={<Radio />} label="Não" />
                        </RadioGroup>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                        <FormLabel component="legend">
                            A empresa compartilha com parceiros, fornecedores ou clientes dados pessoais por ela captados?
                        </FormLabel>
                        <RadioGroup aria-label="question_9" name="question_9" value={values.question_9} onChange={handleChange}>
                            <FormControlLabel value={true} control={<Radio />} label="Sim" />
                            <FormControlLabel value={false} control={<Radio />} label="Não" />
                        </RadioGroup>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                        <FormLabel component="legend">
                            A empresa já estabeleceu alguma política para eliminação (descarte) de dados
                            pessoais de seus sistemas, bancos de dados e backups?
                        </FormLabel>
                        <RadioGroup aria-label="question_10" name="question_10" value={values.question_10} onChange={handleChange}>
                            <FormControlLabel value={true} control={<Radio />} label="Sim" />
                            <FormControlLabel value={false} control={<Radio />} label="Não" />
                        </RadioGroup>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                        <FormLabel component="legend">
                            A empresa tem algum processo de anonimização de dados pessoais em seus
                            sistemas (próprios e de terceiros)?
                        </FormLabel>
                        <RadioGroup aria-label="question_11" name="question_11" value={values.question_11} onChange={handleChange}>
                            <FormControlLabel value={true} control={<Radio />} label="Sim" />
                            <FormControlLabel value={false} control={<Radio />} label="Não" />
                        </RadioGroup>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                        <FormLabel component="legend">
                            A empresa possui um Data Protection Officer (Encarregado de Proteção de Dados Pessoais) 
                            definido enquanto um indivíduo ou um grupo?
                        </FormLabel>
                        <RadioGroup aria-label="question_12" name="question_12" value={values.question_12} onChange={handleChange}>
                            <FormControlLabel value={true} control={<Radio />} label="Sim" />
                            <FormControlLabel value={false} control={<Radio />} label="Não" />
                        </RadioGroup>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                        <FormLabel component="legend">
                            A empresa é certificada (ou segue) algum padrão ou framework de segurança?
                        </FormLabel>
                        <RadioGroup aria-label="question_13" name="question_13" value={values.question_13} onChange={handleChange}>
                            <FormControlLabel value={true} control={<Radio />} label="Sim" />
                            <FormControlLabel value={false} control={<Radio />} label="Não" />
                        </RadioGroup>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                        <FormLabel component="legend">
                            A empresa tem uma política de promoção de treinamentos contínuos para sua
                            equipe?
                        </FormLabel>
                        <RadioGroup aria-label="question_14" name="question_14" value={values.question_14} onChange={handleChange}>
                            <FormControlLabel value={true} control={<Radio />} label="Sim" />
                            <FormControlLabel value={false} control={<Radio />} label="Não" />
                        </RadioGroup>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                        <FormLabel component="legend">
                            A empresa tem uma política de respostas a incidentes de segurança da informação?
                        </FormLabel>
                        <RadioGroup aria-label="question_15" name="question_15" value={values.question_15} onChange={handleChange}>
                            <FormControlLabel value={true} control={<Radio />} label="Sim" />
                            <FormControlLabel value={false} control={<Radio />} label="Não" />
                        </RadioGroup>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                        <FormLabel component="legend">
                            A empresa pratica outbound marketing?
                        </FormLabel>
                        <RadioGroup aria-label="question_16" name="question_16" value={values.question_16} onChange={handleChange}>
                            <FormControlLabel value={true} control={<Radio />} label="Sim" />
                            <FormControlLabel value={false} control={<Radio />} label="Não" />
                        </RadioGroup>
                        </Card>
                    </Grid>
                    <Grid item xs={12} >
                        <Card className={classes.card}>
                            <TextField
                                className={classes.textField}
                                autoComplete="fname"
                                name="nps"
                                variant="outlined"
                                required
                                fullWidth
                                id="nps"
                                label="Valor de NPS"
                                onChange={handleChangeText}
                                autoFocus
                            />
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
                    Cadastrar Empresa
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