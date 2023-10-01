import { IComment, IPost, IUser } from "../../services/types/data";

export type TStore = {
    posts: {
        posts: Array<IPost>,
        favourites: [number],
    },
    users: Array<IUser>,
    comments: any,
}