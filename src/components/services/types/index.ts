import { IPost, IUser } from "./data"

export type TStore = {
    posts: {
        posts: Array<IPost>
    },
    users: Array<IUser>,
    
}
