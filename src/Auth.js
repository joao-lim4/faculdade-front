export const Auth = () => {
    const token = localStorage.getItem("__Token");
    if(token === null){
        return false;
    }else{
        return true;
    }
}