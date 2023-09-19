import logoMt from '../../img/Frame 1mt.png';
import operacaoImg from '../../img/operacaoImg.png';
import govMT from '../../img/govMT.png';

import { Input } from '../../components/Input/Input';
import { AuthContext } from '../../contexts/AuthContext';
import styles from '../Login/styles.module.css'
import stylesRegister from './styles.module.css'

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';

export function Register () {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { loading, createUser } = useContext(AuthContext);

    const onSubmit = async (data) => {
        try {
            console.log(data);
            if(data.senha !== data.confirmaSenha){
                alert('As senhas não coincidem!');
            }else{
                createUser(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.main}>

            <div className={styles.right}>
                <div className={styles.card}>
                    <div className={styles.asdasd}>
                        <img src={logoMt} className={styles.rightImg}/>
                        <h1 className={styles.h1Logo}>Sistema de Gestão de Operações Policiais</h1>
                    </div>
                    <h1 className={styles.h1Login}>Registre-se</h1>

                    <form className={stylesRegister.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            label='Nome completo'
                            type='nome'
                            placeholder='Insira seu nome completo'
                            name='nome'
                            error={errors.nome}
                            validations={register('nome', {
                                required:{
                                    value:true,
                                    message:'Nome é obrigatório!'
                                }
                            })}
                        />
                        <Input
                            label='E-mail'
                            type='email'
                            placeholder='E-mail'
                            name='email'
                            error={errors.email}
                            validations={register('email', {
                                required:{
                                    value:true,
                                    message:'Email obrigatorio!'
                                },
                                pattern:{
                                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                    message:'Email inválido!'
                                }
                            })}
                        />
                        <Input
                            className={stylesRegister.form}
                            label='Senha'
                            type='password'
                            placeholder='Digite sua senha'
                            name='senha'
                            error={errors.senha}
                            validations={register('senha', {
                                required:{
                                    value:true,
                                    message:'Senha obrigatória!'
                                },
                                minLength: {
                                    value: 4,
                                    message: 'Ao minimo 4 digitos'
                                }
                            })}
                        />
                        <Input
                            className={stylesRegister.form}
                            label='Confirmar senha'
                            type='password'
                            placeholder='Digite sua senha'
                            name='confirmaSenha'
                            error={errors.senha}
                            validations={register('confirmaSenha', {
                                required:{
                                    value:true,
                                    message:'Senha obrigatória!'
                                },
                                minLength: {
                                    value: 4,
                                    message: 'Ao minimo 4 digitos'
                                }
                            })}
                        />
                        <div className={styles.criarConta}>
                            <Link to='/'>Voltar</Link>
                        </div>

                        <button className={styles.btnLogin} type="submit">
                            Criar Conta
                        </button>
                        {loading && <p>Carregando...</p>}
                    </form>


                </div>

            </div>

            <div className={styles.left}>
                <img
                    src={govMT}
                    className={styles.govMt}
                    alt="" />
                <img
                    src={operacaoImg}
                    alt="Imagem operação"
                    className={styles.leftImg}
                />
            </div>

        </div>

    )
}
