type IPermissions = {
  name: string;
};

type IRole = {
  name: string;
  permissions: IPermissions[];
};

export const getPermissions = (roles: IRole[], permissions: IPermissions[]) => {
  const rolesPermissions = roles?.flatMap((role: IRole) => role.permissions);
  const allPermissions = [...rolesPermissions, ...permissions];
  return allPermissions;
};
