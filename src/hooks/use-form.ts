import { ChangeEvent, useState } from "react";

export function useForm(inputValues: { [name: string]: string }) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
