export const minLengthErrors = (
  field: string,
  value: string,
  minLength: number
) => {
  if (value.length < minLength) {
    return [
      {
        path: field,
        message: `${field[0].toUpperCase()}${field.slice(
          1
        )} must be ${minLength} or more characters long`,
      },
    ];
  } else {
    return [];
  }
};

export const uniqueErrors = (err: any) => {
  if (err.code === '23505') {
    if (err.detail.includes('username')) {
      console.log(err.detail);
      return [{ path: 'username', message: 'Username already taken' }];
    }
    return [{ path: 'email', message: 'Email already registered' }];
  }
  return [];
};
