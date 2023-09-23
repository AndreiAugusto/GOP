import style from './styles.module.css';

import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export function Operacao(props) {
    const [ isUpdated, setIsUpdated ] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    async function editOperacao(data){
        await props.editOperacao({ ...data, id: props.operacao.id });
        setIsUpdated(false);
    }

    return (

        <div key={props.operacao.id} className={style.list}>
            <div className='d-flex justify-content-between ps-3 pe-3'>
                    <p className='m-0 d-flex align-self-center'>
                        {props.operacao.id}
                    </p>
                    <p className='m-0 d-flex align-self-center'>
                        {props.operacao.nome}
                    </p>
                    <p className='m-0 d-flex align-self-center'>
                        {props.operacao.custo}
                    </p>
                    <p className='m-0 d-flex align-self-center'>
                        {props.operacao.cidade}
                    </p>

                <div className={style.botoes}>
                    {/* <button
                        className={style.btnEditar}
                        onClick={()=>setIsUpdated(true)}
                    >Editar</button> */}
                    <button
                        className={style.btnDeletar}
                        onClick={props.removeOperacao}
                    >Visualizar</button>
                </div>
            </div>
            <hr />


            <Modal show={isUpdated} onHide={()=>setIsUpdated(false)}>
                <Modal.Header className='justify-content-center'>
                    <Modal.Title>Editar Operacão: {props.operacao.nome}</Modal.Title>
                </Modal.Header>
                <Form className={style.form} noValidate onSubmit={handleSubmit(editOperacao)}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label className='text-primary'>Nome da operação</Form.Label>
                            <Form.Control type='text'
                                placeholder={props.operacao.nome}
                                name='nameOperacao'
                                {...register('nameOperacao', {
                                    required: {
                                        value: true,
                                        message:'Nome é necessário'
                                    }
                                })}
                            />
                            {errors.nameOperacao &&
                                <span className='position-absolute text-danger'>
                                    {errors.nameOperacao.message}
                                </span>
                            }
                        </Form.Group>
                        <Form.Group className='mt-4'>
                            <Form.Label className='text-primary'>Selecione a cidade</Form.Label>
                            <Form.Select {...register('unity', {
                                required: 'Escolha necessária'
                            })}>
                                <option selected disabled></option>
                                <option>Cuiabá</option>
                                <option>VG</option>
                                <option>Sorriso</option>
                                <option>Rondonópolis</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='primary' type='submit'>Editar</Button>
                        <Button variant='secondary' onClick={()=>setIsUpdated(false)}>Fechar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
};
