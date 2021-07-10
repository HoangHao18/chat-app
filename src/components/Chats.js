import React, { useRef, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from 'react-chat-engine';
import { auth } from "./firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = ()=> {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    console.log(user);

    const handleLogout = async () =>{
        await auth.signOut();
        history.push('/');
    }

    useEffect(()=>{
        if(!user){
            history.push('/');

            return;
        }

        const getFile = async (url) =>{
            const response = await fetch(url);
            const data = await response.blob();

            return new File([data], "userPhoto.jpg", {type:'image/jpeg' });
        }

        axios.get('https://api.chatengine.io/users/me' , {
            headers:{
                "project-id": "17ba9a15-5017-49cd-99fd-fd6d92077cf7",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name)

                    axios.post('https://api.chatengine.io/users/' ,
                        formdata,
                        { headers: { "private-key": "3a6701d3-333c-4bce-ad7e-3a5cfc7cc2a5"}}
                    )
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
                })
        })

    }, [user, history])

    if(!user || loading) return 'Loading...';

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Chat App
                </div>
                <div className="logout-tab" onClick={handleLogout}>
                    Logout
                </div>
            </div>

            <ChatEngine
                height = "calc(100vh - 66px)"
                projectID ="17ba9a15-5017-49cd-99fd-fd6d92077cf7"
                userName = {user.email}
                userSecret = {user.uid}
    
            />

        </div>
    )
}

export default Chats;