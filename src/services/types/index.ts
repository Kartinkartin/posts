import { IComment, IPost, IUser } from "../../services/types/data";

export type TStore = {
    posts: {
        posts: Array<IPost>,
        favourites: [number],
        chosen: [number] | number,
    },
    users: Array<IUser>,
    comments: {
        [key: number]: Array<IComment>
    },
}
