import classNames from "classnames";

export const createRegister = (register, readOnly: string[], errors) => {
  const _register = (
    prop: string,
    values: { [key: string]: any },
    type = "control"
  ) => {
    if (readOnly.includes(prop)) {
      values.readOnly = true;
      values.disabled = true;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const data = register(prop, values);

    const _classNames = [`form-${type}`];

    if (errors[prop]) {
      _classNames.push("is-invalid");
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data.className = classNames(..._classNames);
    return data;
  };

  return _register;
};
