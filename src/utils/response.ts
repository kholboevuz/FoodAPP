export const response = (status: boolean, message: string, data: any) => {
  return {
    success: status,
    message: message,
    data: data,
  };
};
