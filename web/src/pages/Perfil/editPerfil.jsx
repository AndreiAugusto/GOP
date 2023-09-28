import {  useEffect, useState } from "react";
import { Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {CgProfile} from 'react-icons/cg'
import style from "../Operacao/styles.module.css";

import { getUsuario, autenticaOToken, updateUsuario } from "../../services/usuario-service";

import { Header } from "../../components/Header/header";
import { Sidebar } from "../../components/Sidebar/sidebar";

export function EditPerfil() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [openSidebarToggle, setOpenSidebarToggle] = useState(windowWidth <= 700);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    useEffect(() => {
        findUsuario();

        // Fechar sidebar quando tela ficar menor que 700px
        const handleResize = () => {
            const newWindowWidth = window.innerWidth;
            setWindowWidth(newWindowWidth);

            if (newWindowWidth >= 700) {
              setOpenSidebarToggle(false);
            } else {
              setOpenSidebarToggle(true);
            }
          };

          window.addEventListener('resize', handleResize);

          return () => {
            window.removeEventListener('resize', handleResize);
          };
    }, []);

    async function findUsuario() {
        try {
            const idUsuario = await autenticaOToken();
            const result = await getUsuario(idUsuario.data);
            setUsuario(result.data);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    async function editUsuario(data){
        try {
            console.log(data)
            await updateUsuario(data);
            navigate('/perfil')

        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    async function voltar() {
        try {
            navigate('/perfil')
        } catch (error) {
            console.error(error);
        }
    }

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

    return (
        <main className="main-container">
            <Header OpenSidebar={OpenSidebar} />
            <div className="d-flex w-100 min-vh-100">
                <div>
                    <Sidebar
                        openSidebarToggle={openSidebarToggle}
                        OpenSidebar={OpenSidebar}
                    />
                </div>
                <div className="p-3 w-100">
                    <div className={style.mainCard}>
                        <h1 className="text-dark mb-3">Perfil</h1>
                        <CgProfile className='icon-profile-large m-2 text-dark'/>
                        <Form
                            noValidate
                            onSubmit={handleSubmit(editUsuario)}
                        >
                            <Form.Group className="mb-4">
                                <Form.Label className="text-dark fw-bold">
                                    Nome
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={usuario.nome}
                                    name="nome"
                                    {...register("nome", {
                                        required: {
                                            value: true,
                                            message:
                                                "Nome é necessário",
                                        },
                                    })}

                                />
                                {errors.nome && (
                                    <span className="text-danger">
                                        {errors.nome.message}
                                    </span>
                                )}
                            </Form.Group>
                            <hr />
                            <Form.Group className="mb-4">
                                <Form.Label className="text-dark fw-bold">
                                    E-mail
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={usuario.email}
                                    name="email"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message:
                                                "Email é necessário",
                                        },
                                        pattern:{
                                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                            message:'Email inválido!'
                                        }
                                    })}

                                />
                                {errors.email && (
                                    <span className="text-danger">
                                        {errors.email.message}
                                    </span>
                                )}
                            </Form.Group>
                            <hr />
                            <Form.Group className="mb-4">
                                <Form.Label className="text-dark fw-bold">
                                    Nova senha
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder='Digite sua nova senha'
                                    name="senha"
                                    {...register("senha", {
                                        required: {
                                            value: true,
                                            message:
                                                "Senha é necessário",
                                        },
                                        minLength: {
                                            value: 4,
                                            message: 'Ao minimo 4 digitos'
                                        }
                                    })}

                                />
                                {errors.senha && (
                                    <span className="text-danger">
                                        {errors.senha.message}
                                    </span>
                                )}
                            </Form.Group>
                            <hr className="mb-5" />
                            <div className="w-100 d-flex justify-content-between">
                                <button className={style.btnEditar} onClick={voltar}>
                                    Voltar
                                </button>
                                <button className={style.btnEditar} type="submit">
                                    Confirmar
                                </button>

                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </main>
    );
}
