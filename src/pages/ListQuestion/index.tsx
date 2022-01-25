import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Title from '../../components/Title';
import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
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

interface Question {
    constant_factor: number,
    created_at: Date,
    description: string,
    id: number
    is_multiple: boolean,
    name: string,
    updated_at: Date
}



export default function ListQuestion() {
    const classes = useStyles();
    const history = useHistory();

    function handleClick() {
        history.push("/pergunta/cadastrar");
    }

    const [questions, setQuestions] = useState<Question[]>();

    const handleGetQuestions  = async () => {
        const response = await api.get('api/question/todos');
        setQuestions(response.data)   
    }

    useEffect(() => {
        handleGetQuestions()
    })

    return (
        <main className={classes.content}>
            <Container component="main">
                <CssBaseline />
                    <Paper className={classes.paper}>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 15}}>
                            <Title>Lista de Perguntas Cadastradas</Title>
                            <button onClick={handleClick}>Adicionar nova Pergunta</button>
                        </div>      
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Pergunta</TableCell>
                                    <TableCell width={10}>Descrição</TableCell>
                                    <TableCell>Fator Constante</TableCell>
                                    <TableCell>Data de Criação</TableCell>
                                    <TableCell>Editar</TableCell>
                                    <TableCell>Remover</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {questions && questions.map((question) => (
                                    <TableRow key={question.id}>
                                        <TableCell>{question.id}</TableCell>
                                        <TableCell>{question.name}</TableCell>
                                        <TableCell>{question.description}</TableCell>
                                        <TableCell>{question.constant_factor}</TableCell>
                                        <TableCell>{question.created_at}</TableCell>
                                        <TableCell><button>Editar</button></TableCell>
                                        <TableCell><button>Remover</button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
           
            </Container>
        </main>
    );
}