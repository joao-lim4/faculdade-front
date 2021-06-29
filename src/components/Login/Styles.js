import styled from 'styled-components';



export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;


export const BoxMain = styled.div`
    width: 270px;
    /* height: 350px; */
    background-color: #ffffff;
    padding: 15px;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 3px 1px #dbdbdb;


    .__flex-view-content{ 
        width: 100%;
        text-align: center;
    }
    .__logo-login {
        height: 120px;
        margin-bottom: 25px;
    }

    .__full-width{
        width: 100%;

        .__error{
            width: 90%;
            margin: 0 auto 10px auto;
            padding: 5px;
            font-size: 12px;
            opacity: .8;
            background-color: red;
            border-radius: 5px;
            text-align: center;
            transition: all 2s ease;
            color: #ffffff;
        }
    }

`
export const LabelContent = styled.div`
    width: 100%;
    height: 35px;
    margin: 20px 0px 20px 0px;
    position: relative;
    display: flex;
    justify-content: center;

    .__input-default{
        width: 90%;
        height: 35px;
        border-radius: 5px;
        padding: 0px 0px 0px 10px;
        border: 1px solid #dbdbdb;
        outline: none;
        transition: all .5s ease;
    }

    .__input-default:focus{
        border: solid 1px #75d9ff;
        box-shadow: 0px 0px 5px 1px #93d6ef;
    }
`;

export const ButtonPass = styled.button`
    width: 35px;
    height: 35px;
    display: flex;
    background: transparent;
    border: none;
    outline: none;
    margin-right: 10px;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 5;

    .__icon-eye{
        color: #dbdbdb;
        font-size: 20px;
    }
`;

export const ButtonLogin = styled.button`
    width: 90%;
    margin: 0 5% 0 5%;
    height: 35px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    background-color: #00AEEF;
    color: #ffffff;

    .__rotate_icon{
        animation: rotate 1s ease infinite;
    }
`;


