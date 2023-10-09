import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/use-form";
import Button from "../../ui/buttons/button";
import styles from "./popup-mode.module.css";
import { modePost } from "../api/api";
import { TStore } from "../../services/types";
import { IUser } from "../../services/types/data";
import { changePost } from "../../services/reducers/posts";
import FilterUser from "../filter-user/filter-user";

interface IPopupProps {
  id: number;
  onClose: () => void;
}

export default function PopupMode({ id, onClose }: IPopupProps) {
  const dispatch = useDispatch();
  const posts = useSelector((store: TStore) => store.posts.posts);
  const users = useSelector((store: TStore) => store.users);
  const post = posts.find((post) => post.id === id);
  const { title, body, userId } = post!;
  const author = users.find((user: IUser) => user.id === userId)!.name;
  const { values, handleChange, setValues } = useForm({ title, body, author });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAuthor = users.find((user) => user.name === values.author);
    modePost({ id: post!.id, title, body, userId: newAuthor!.id }).then(() =>
      dispatch(changePost({ id: post!.id, title, body, userId: newAuthor!.id }))
    );
    onClose();
  };

  const onFilter = (e: any) => {
    const name = e.target.textContent;
    setValues({ ...values, author: name });
  };

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
      <div className={styles.variants}>
        <FilterUser
          author={values.author}
          onClick={onFilter}
          needAllChose={false}
        />
      </div>
      <div className={styles.handlers}>
        <Button text="Сохранить" type="submit" />
        <Button text="Отменить" type="button" onClick={onClose} />
      </div>
    </form>
  );
}
