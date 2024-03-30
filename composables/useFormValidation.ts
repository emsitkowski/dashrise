export const useFormValidation = (schema: any, formData: any) => {
  const { error, value } = schema.validate(formData);

  return { error, value };
};
