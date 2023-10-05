import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export function Veiculo(props){
    const [isUpdated, setIsUpdated] = useState(false);
    const [modalExcluir, setModalExcluir] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    async function editVeiculos(data){
        await props.editVeiculo({...data, id: props.veiculo.id});
        setIsUpdated(false);
    }


    return(
        <div key={props.veiculo.id} className="container">
            <div className="row align-items-center text-dark responsivo">
                <div className="col responsivo2">
                    {props.veiculo.id}
                </div>
                <div className="col responsivo2">
                    {props.veiculo.tipoVeiculo}
                </div>
                <div className="col responsivo2">
                    {props.quantidade}
                </div>
                <div className="col responsivo2">
                    <button className='btnVisualizar' onClick={() => setIsUpdated(true)}>
                        Editar
                    </button>
                    <button className='btnDeletar' onClick={() => setModalExcluir(true)}>
                        Deletar</button>
                </div>
            </div>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header className='justify-content-center text-primary'>
                    <Modal.Title>Editar Veículo: {props.veiculo.tipoVeiculo}</Modal.Title>
                </Modal.Header>
                <Form className='m-auto'
                noValidate onSubmit={handleSubmit(editVeiculos)}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label className='text-primary'>Nome do veículo</Form.Label>
                            <Form.Control  type='text'
                                placeholder={props.veiculo.tipoVeiculo}
                                name='tipoVeiculo'
                                {...register('tipoVeiculo', {
                                    required:{
                                        value:true,
                                        message:'Nome é necessário'
                                    }
                                })}
                            />
                            {errors.tipoVeiculo &&
                                <span className='position-absolute text-danger'>
                                    {errors.tipoVeiculo.message}
                                </span>
                            }
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={()=>setIsUpdated(false)}>
                            Fechar
                        </Button>
                        <Button variant='primary' type='submit'>
                            Editar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>


            <Modal
                show={modalExcluir}
                onHide={() => setModalExcluir(false)}
            >
                <Modal.Header>
                    <Modal.Title>
                        Confirmar exclusão?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setModalExcluir(false)}>Não excluir
                    </Button>
                    <Button
                        variant='danger'
                        onClick={props.apagarVeiculo}>Sim, excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}
