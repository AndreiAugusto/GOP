import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import style from './styles.module.css';

import { AuthContext } from '../../contexts/AuthContext';
import { getFoods, deleteFood, createFood, updateFood } from '../../services/food-service'
import { Food } from '../../components/Food/Food';
import { Input } from '../../components/Input/Input';

export function Foods () {
    const { logout } = useContext(AuthContext);
    const [ foods, setFoods ] = useState([]);
    const [ isCreated, setIsCreated ] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    useEffect(() => {
        findFoods();
    }, []);

    async function findFoods (){
        try {
            const result = await getFoods();
            setFoods(result.data);
        } catch (error) {
            console.error(error);
            Navigate('/');
        }
    }

    async function removeFood(id){
        try {
            await deleteFood(id);
            await findFoods();
        } catch (error) {
            console.error(error);
        }
    }

    async function addFood(data){
        try {
            await createFood(data);
            setIsCreated(false);
            await findFoods();
        } catch (error) {
            console.error(error);
        }
    }

    async function editFood(data){
        try {
            await updateFood({
                id: data.id,
                nameFood: data.nameFood,
                unity: data.unity
            });
            await findFoods();
        } catch (error) {
            console.error(data);
        }
    }

    function alerta (message){
        return alert(message)
    }

    return (
        <div className={style.main}>
            <h1>Foods</h1>
            <div className={style.card}>

            <button
                className={style.btnCriar}
                onClick={() => setIsCreated(true)}>Criar alimento</button>
                {foods && foods.length > 0
                    ? foods.map((food) => (
                        <Food
                            food={food}
                            removeFood={async () => {
                                await removeFood(food.id);
                                alerta(`${food.nome} deletado!`);
                            }}
                            editFood={editFood}
                        />
                    ))
                    : <h1>Não há alimentos</h1>
                }
                <Modal
                    show={isCreated}
                    onHide={() => setIsCreated(false)}
                >
                    <Modal.Header className='justify-content-center'>
                        <Modal.Title>Cadastrar novo alimento</Modal.Title>
                    </Modal.Header>
                    <Form className='ms-5' noValidate onSubmit={handleSubmit(addFood)}>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label className='text-primary'>Nome do alimento</Form.Label>
                                <Form.Control type='text'
                                    placeholder='Alimento'
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
                                    <option disabled>Clique para selecionar</option>
                                    <option>Kilograma</option>
                                    <option>Grama</option>
                                    <option>Mililitro</option>
                                    <option>Litro</option>
                                </Form.Select>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='primary' type='submit'>Criar</Button>
                            <Button variant='secondary' onClick={() => setIsCreated(false)}>Fechar</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                <button
                    className={style.btnSair}
                    onClick={logout}
                >
                    Sair
                </button>
            </div>
        </div>
    );
};
