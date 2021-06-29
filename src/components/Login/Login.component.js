import React, { useState, useEffect } from 'react';
import {Container ,BoxMain, LabelContent,ButtonPass, ButtonLogin } from './Styles';
import { IoIosEye, IoIosEyeOff, IoIosRefresh } from 'react-icons/io';
import Api from '../../Api';



const Login = ({props, history}) => {

    const [password, setPassword] = useState({active: false});
    const [logando, setLogando] = useState({active: false});
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState({
        error: false,
        message: ''
    });

    const resetKeys = () => {
        localStorage.removeItem("__Token");
        localStorage.removeItem("__User");
    }

    useEffect(() => {
        
        (async () => {

            if(localStorage.getItem("__Token") !== null){
               
                let response = await Api.AuthRequest("verificar", null, "GET");
                if(typeof response === "undefined"){
                    resetKeys();
                }else{
                    if(response.sucesso){
                        localStorage.setItem("__Token", response.usuario.token);
                        localStorage.setItem("__User", JSON.stringify(response.usuario));
                        history.replace("/", "urlhistory");
                    }else{
                        resetKeys();
                    }
                }
            }

        })();
    });


    const updatePasswordView = () => {
        setPassword({active: !password.active});
    }
    
    const login = async (ev) => {
        ev.preventDefault();
        if(!setLogando.active){
            setLogando({active: true});

            let response = await Api.Login(form);
            
            if(response.success){
                localStorage.setItem("__Token", response.data.token);
                localStorage.setItem("__User", JSON.stringify(response.data.user));
                
                return history.replace("/", "urlhistory");

            }else{
                setError({
                    error: true, message: response.error
                });

                setTimeout(() => {
                    setError({
                        error: false, message: ""
                    });
                }, 2500);
            }


            setLogando({active: false});
        }
    }

    return (
        <Container>
            <BoxMain>
                <div className="__flex-view-content">
                    <img alt="Logo" src="/logo512.png" className="__logo-login"/>
                </div>
                <form className="__full-width" onSubmit={(ev) => login(ev)}>
                    <div className="__full-width">
                        <LabelContent>
                            <input 
                                value={form.email} 
                                onChange={ev => setForm({
                                    email: ev.target.value,
                                    password: form.password
                                })} 
                                type="email" 
                                className="__input-default" 
                                placeholder="E-mail" 
                                required
                            />
                        </LabelContent>

                        <LabelContent>
                            <ButtonPass onClick={() => updatePasswordView()}>
                                {password.active ? <IoIosEyeOff className="__icon-eye"/> : <IoIosEye className="__icon-eye" />}
                            </ButtonPass>    
                            <input
                                value={form.password}
                                onChange={ev => setForm({
                                    email: form.email,
                                    password: ev.target.value
                                })} 
                                type={password.active ? "text" : "password"} 
                                className="__input-default"
                                placeholder="Password" 
                                required
                            />
                        </LabelContent>

                    </div>
                    
                    {error.error ? (
                        <div className="__error">
                            Usuario ou senhas invalidos
                        </div>
                    ) : false}

                    <ButtonLogin type="submit">
                        { !logando.active ? "Entrar" : (
                            <IoIosRefresh color="#ffffff" className="__rotate_icon" />
                        )}
                    </ButtonLogin>
                </form>
            </BoxMain>
        </Container>
    );
}


export default Login;