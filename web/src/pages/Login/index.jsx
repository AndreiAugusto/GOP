import { Input } from '../../components/Input/Input'
import { AuthContext } from '../../contexts/AuthContext';
import styles from './styles.module.css'
import imagem from '../../img/Application.png';
import logoMt from '../../img/Frame 1mt.png';
import operacaoImg from '../../img/operacaoImg.png';
import govMT from '../../img/govMT.png';

import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

export function Login () {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { login, loading } = useContext(AuthContext);

    return (

        <div className={styles.main}>
            <div className={styles.right}>
                <div className={styles.card}>
                    <div className={styles.asdasd}>
                        <img src={logoMt} className={styles.rightImg}/>
                        <h1 className={styles.h1Logo}>Sistema de Gestão de Operações Policiais</h1>
                    </div>
                    <h1 className={styles.h1Login}>Faça seu login</h1>
                    <form noValidate onSubmit={handleSubmit(login)}>
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
                                <Link to='/register'>Criar conta</Link>
                                <Link>Esqueceu a senha</Link>
                            </div>
                        <button className={styles.btnLogin} type="submit">
                            Entrar
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
