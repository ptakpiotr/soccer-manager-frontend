import { useEffect, useState } from "react";
import { ObjectSchema } from "yup";

function useYupObjectValidation<T extends object, U extends ObjectSchema<T>>(
  param: T,
  validate: U
) {
  const [valid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const isValid = validate.isValidSync(param);

    setIsValid(isValid);
  }, [param]);

  return valid;
}

export default useYupObjectValidation;
