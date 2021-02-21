export const ajaxCall = async (httpMethod, endpoint, requestBody = null) => {
    try{
        const response = await fetch(endpoint, {
            method: httpMethod,
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: requestBody ? JSON.stringify(requestBody) : undefined
        });
        const res = await response.json();
        console.log(res);
        return res;
    }
    catch(err){
        console.log(err);
    }
}