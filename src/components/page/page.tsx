import { useEffect, useState } from 'react';
import { getPosts, getUsers } from "../api/api"
import { IPost, IUser } from '../services/types/data';
import styles from './page.module.css';
import Post from '../post/post';

export default function Page() {
    const [users, setUsers] = useState<null|Array<IUser>>(null);
    const [posts, setPosts] = useState<null|Array<IPost>>(null);
    useEffect(() => {
        getUsers()
            .then(res => setUsers(res))
        getPosts()
            .then(res => setPosts(res))
    }, [])
    return(
        <div className={styles.container}>
            {users !== null && posts !== null && (
                    posts.map(({title, body, userId, id}) => (
                        <Post 
                            title={title} 
                            text={body} 
                            author={users.find(user => user.id === userId)!.name} 
                            id={id}
                            key={id}
                        /> 
                    ))
                )
            }
            <div>text</div>
        </div>
    )
}