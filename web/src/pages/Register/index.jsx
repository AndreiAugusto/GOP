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


    return (
        <div className={stylesRegister.main}>
            <div className={stylesRegister.card}>
                <h1>Registre-se</h1>
                <form className={stylesRegister.form} noValidate onSubmit={handleSubmit(createUser)}>
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
                        label='Password'
                        type='password'
                        placeholder='Digite sua senha'
                        name='password'
                        error={errors.password}
                        validations={register('password', {
                            required:{
                                value:true,
                                message:'Senha obrigatória!'
                            },
                            minLength: {
                                value: 3,
                                message: 'Ao minimo 3 digitos'
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

    )
}
