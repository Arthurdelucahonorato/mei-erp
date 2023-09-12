type UserAuth = {
  login: string;
  senha: string;
};

type Response = {
  statusCode: 200;
};

export const userAuth = async ({
  login,
  senha,
}: UserAuth): Promise<Response> => {
  return {
    statusCode: 200,
  };
};
