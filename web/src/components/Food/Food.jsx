import style from './styles.module.css';

import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export function Food(props) {
    const [ isUpdated, setIsUpdated ] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    async function editFood(data){
        await props.editFood({ ...data, id: props.food.id });
        setIsUpdated(false);
    }

    return (

        <div key={props.food.id} className={style.list}>
            <div className={style.infos}>
                <h2>{props.food.nome}</h2>
                <p>{props.food.unidadeMedida}</p>
            </div>
            <div className={style.botoes}>
                <button
                    className={style.btnEditar}
                    onClick={()=>setIsUpdated(true)}
                >Editar</button>
                <button
                    className={style.btnDeletar}
                    onClick={props.removeFood}
                >Deletar</button>
            </div>
            <Modal show={isUpdated} onHide={()=>setIsUpdated(false)}>
                <Modal.Header className='justify-content-center'>
                    <Modal.Title>Editar Alimento: {props.food.nome}</Modal.Title>
                </Modal.Header>
                <Form className={style.form} noValidate onSubmit={handleSubmit(editFood)}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label className='text-primary'>Nome do alimento</Form.Label>
                            <Form.Control type='text'
                                placeholder={props.food.nome}
                                name='nameFood'
                                {...register('nameFood', {
                                    required: {
                                        value: true,
                                        message:'Nome é necessário'
                                    }
                                })}
                            />
                            {errors.nameFood &&
                                <span className='position-absolute text-danger'>
                                    {errors.nameFood.message}
                                </span>
                            }
                        </Form.Group>
                        <Form.Group className='mt-4'>
                            <Form.Label className='text-primary'>Selecione a unidade de medida</Form.Label>
                            <Form.Select {...register('unity', {
                                required: 'Escolha necessária'
                            })}>
                                <option selected disabled></option>
                                <option>Kilograma</option>
                                <option>Grama</option>
                                <option>Mililitro</option>
                                <option>Litro</option>
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
