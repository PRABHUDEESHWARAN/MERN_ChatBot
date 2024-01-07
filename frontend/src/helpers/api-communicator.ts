import axios from "axios"
export const loginUser=async (email:string,password:string)=>{
    const res=await axios.post("/user/signIn",{email,password});

    if(res.status!==200)
    {
        throw new Error("Unable to login!!!");
    }
    const data= await res.data;
    return data;
}

export const signUpUser=async (name:string,email:string,password:string)=>{
    const res=await axios.post("/user/SignUp",{name,email,password});

    if(res.status!==201)
    {
        throw new Error("Unable to signUp!!!");
    }
    const data= await res.data;
    return data;
}

export const checkAuthStatus=async ()=>{
    const res=await axios.get("/user/auth-status");

    if(res.status!==200)
    {
        throw new Error("Unable to verify!!!");
    }
    const data= await res.data;
    return data;
}

export const sendChatRequest=async (message:string)=>{
    const res=await axios.post("/chats/new",{message});

    if(res.status!==200)
    {
        throw new Error("Unable to send chat!!!");
    }
    const data= await res.data;
    return data;
}

export const getUserChats=async ()=>{
    const res=await axios.get("/chats/all-chats");

    if(res.status!==200)
    {
        throw new Error("Unable to send chat!!!");
    }
    const data= await res.data;
    return data;
}
export const deleteUserChats=async ()=>{
    const res=await axios.delete("/chats/delete-chats");

    if(res.status!==200)
    {
        throw new Error("Unable to Delete chat!!!");
    }
    const data= await res.data;
    return data;
}

export const logoutUser=async ()=>{
    const res=await axios.get("/user/logout");

    if(res.status!==200)
    {
        throw new Error("Unable to Delete chat!!!");
    }
    const data= await res.data;
    return data;
}

