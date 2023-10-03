import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/use-form";
import Button from "../../ui/buttons/button";
import styles from "./popup-mode.module.css";
import { modePost } from '../api/api';
import { TStore } from '../../services/types';
import { IUser } from '../../services/types/data';
import { changePost } from '../../services/reducers/posts';

interface IPopupProps {
  id: number,
  onClose: () => void;
}

export default function PopupMode({
  id, 
  onClose,
}: IPopupProps) {
  const dispatch = useDispatch();
  const posts = useSelector((store: TStore) => store.posts.posts);
  const users = useSelector((store: TStore) => store.users);
  const post = posts.find(post => post.id === 1);
  const [authorChange, setAuthorChange] = useState<null | string>(null);
  const { title, body, userId } = post!;
  const author = users.find((user: IUser) => user.id === userId)!.name;
  const { values, handleChange, setValues } = useForm({ title, body, author });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAuthor = users.find(user => user.name === values.author);
    // если не найдется id автора, то отправляю от имени Leanne Graham, 
    // так как нового пользователя на сервере не сохранить
    const userId = newAuthor && Object.hasOwn(newAuthor!, 'id') ? newAuthor.id : 1;
    modePost({ id: post!.id, title, body, userId })
      .then(() => dispatch(changePost({ id: post!.id, title, body, userId })))
      onClose();
  }
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setAuthorChange(e.target.value);
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <textarea
        className={styles.input}
        name="title"
        placeholder="Название поста"
        value={values.title}
        onChange={handleChange}
      />
      <textarea
        className={styles.input}
        name="text"
        placeholder="Текст поста"
        value={values.body}
        onChange={handleChange}
      />
      <input
        className={styles.input}
        name="author"
        type="text"
        placeholder="Автор поста"
        value={values.author}
        onChange={onChange}
      />
      <div className={styles.variants}>
        {authorChange && 
          users.filter((user) => user.name.includes(authorChange!))
            .map(user => (
              <p className={styles.variant}>{user.name}</p>  
            ))
        }
      </div>
      <div className={styles.handlers}>
        <Button text="Сохранить" type="submit" />
        <Button text="Отменить" type="button" onClick={onClose} />
      </div>
    </form>
  );
}
