import Styled from 'styled-components';


export const Container = Styled.div`
    width: 100%;
    position: relative;
    padding: 30px;

    .__span-title{
        font-size: 25px;
    }
`;


export const ContainerFlex = Styled.div`
    width: 100%;
    position: relative;
    
`


export const Modal = Styled.div`
    width: ${props => props.webCam ? '420px' : props.width === "sm" ? "60%" : "25%"};
    border-radius: 10px;
    height: ${props => props.webCam ? '420px' : "auto"};
    background: #ffffff;
    box-shadow: 0px 0px 30px 0px #dbdbdb;
    padding: ${props => props.webCam ? "10px" : "25px"};
    transition: all 1.5s ease;
    z-index: 999;
    position: fixed;
    left: 50%;
    top: ${props => props.show ? "100px"  : "-100%"};
    transform: ${props => props.show ? "translate(-50%, 0px)"  :"translate(-50%, 100%)"  };
    opacity: ${props => props.show ? 1 : 0};

    .__hr{
        margin: 20px 0px 20px 0px;
    }

    .__view-button{
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

`;

export const ContainerText = Styled.div`
    width: 100%;
    text-align: center;
    
    .__error-message{
        font-size: 18px;
        color: #5a6169;
    }
`;

export const ContainerFlexModal = Styled.div`
    width: 100%;
    height: ${props => props.webCam ? "auto" : "120px"};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ContainerItem = Styled.div`
    width: 100px;
    cursor: pointer;
    height: 100px;
    margin: 0 10px 0 10px;
    border: 4px solid #007bff;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;

    .__icon-button{
        width: 60px;
        height: 60px;
    }
`;

export const ContainerWebCan = Styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: center;
    align-items: center;

    .__webCanButton{
        position: absolute;
        z-index: 5;
        bottom: 5%;
        left: 50%;
        cursor: pointer;
        transform: translate(-50%, -5%);
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #ffffff;
        border-radius: 50%;
        background: transparent;

        .__bg-button-web-cam {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #ffffff;
        }
    }

    .__button-galeria{
        position: absolute;
        z-index: 5;
        bottom: 6.65%;
        left: 33%;
        cursor: pointer;
        transform: translate(-33%, -6.65%);
        width: 45px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: #ffffff;

        .__icon-image{
            width: 20px;
            height: 20px;
            opacity: 0.6;   
        }
    }

    .__close-web-cam{
        width: 40px;
        height: 40px;
        position: absolute;
        left: 5%;
        top: 5%;
        transform: translate(-5%, -5%);
        background: #fff;
        z-index: 5;
        border-radius: 50%;
        cursor: pointer;
        justify-content: center;
        align-items: center;
        display: flex;

        .__icon-close{
            width: 30px;
            height: 30px;
            opacity: .7;
        }
    }
`;


export const ContainerImagePreView = Styled.div`

    width: 160px;
    height: 100px;
    position: absolute;
    z-index: 5;
    left: ${props => props.show ? "92%" : "50%"};
    opacity: ${props => props.show ? 1 : 0 };
    top: ${props => props.show ? "7%" : "50%"};
    border-radius: 10px;
    background: #ffffff;
    transform: ${props => props.show ? "translate(-92%, -7%)" : "translate(-50%, -50%)"};
    transition: all 1.5s ease;
    display: flex;
    justify-content: center;
    align-items: center;

    .__image-preview{
        width: 150px;
        height: 90px;
        opacity: ${props => props.show ? 1 : 0};
        border-radius: 10px;
        transition: all 1.5s ease;
    }

`