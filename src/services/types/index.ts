import { IPost, IUser } from "../../services/types/data";

export type TStore = {
    posts: {
        posts: Array<IPost>,
        favourites: [number];
    },
    users: Array<IUser>,

}

export interface IPostProps {
    title: string;
    author: string;
    text: string;
    id: number;
    inFavourite: boolean;
}
