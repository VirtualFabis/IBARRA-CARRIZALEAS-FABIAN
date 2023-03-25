import { useState, useCallback } from "react";

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const onClearValues = useCallback(() => setValues());

  const setPrevValues = useCallback((name, values) =>
    setValues((prevValues) => ({ ...prevValues, [name]: values }))
  );

  const onChange = useCallback(({ target }) => {
    const { name, value } = target;
    setPrevValues(name, value);
  }, []);

  const onChangeSelectMultiple = useCallback((Options, action) => {
    const { name } = action;
    setPrevValues(
      name,
      Options.map((x) => x.value)
    );
  }, []);

  const onChangeFile = useCallback(({ target }) => {
    const { files, name } = target;
    const fileToLoad = files[0];
    const fileReader = new FileReader();
    fileReader.onload = ({ target }) => {
      const pdfBase64 = target.result.split(",")[1];
      setPrevValues(name, { name: fileToLoad.name, pdf: pdfBase64 });
    };
    fileReader.readAsDataURL(fileToLoad);
  }, []);

  return {
    values,
    onChange,
    onChangeFile,
    onClearValues,
    onChangeSelectMultiple,
  };
}

export default useForm;
