const BASE_API = 'http://127.0.0.1:8000/api/';

const generateHeader = (token, method, data,file) => {
    let HeadeRequest =  {
        method: `${method}`,
    }
    let headers = {
        'X-Requested-With': 'XMLHttpRequest',
    };
    
    if(!file){
        headers["Content-Type"] = 'application/json' ;
    }

    if(token != null){
        headers['Authorization'] = `Bearer ${token}`
    }
    
    return ((object, headers, body, file) => {
        
        Object.defineProperty(object, 'headers', {
            value: headers,
            writable: true
        });
        
        if(method === 'POST'){
            Object.defineProperty(object, 'body', {
                value: body == null ? {} : !file ? JSON.stringify(body) : body,
                writable: true
            });
        }
        
        return object;
    })(HeadeRequest, headers, data,file);
}


const fetchRequest = async (rota,data=null, method, file) => {
    
    let token = localStorage.getItem("__Token");

    if(token !== null){
        let response = await fetch(`${BASE_API}${rota}`, generateHeader(token,method,data,file));

        if(response.status === 401){
            return {error: true, token: null, status: 401}
        }else{
            return response.json();
        }
    }else{
        return {error: true, token: null, status: 401}
    }
}


export default {

    AuthRequest: async (rota,data, method, file=false) => {
        return await fetchRequest(rota,data,method,file);
    },

    Login: async (data) => {
        let response = await fetch(`${BASE_API}login`, generateHeader(null,"POST",data));
        return response.json();
    }
};