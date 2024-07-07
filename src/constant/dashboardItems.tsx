import { MdGroups, MdOutlineSecurity } from "react-icons/md";
import {FaCriticalRole, FaUsersCog, FaYoutube} from "react-icons/fa";

export type IChildren = {
  name: string;
  href: string;
  current: boolean;
  icon?: any;
  children?: IChildren[];
  validationCheck?: string[];
};

export type INavigation = {
  name: string;
  href?: string;
  icon: any;
  current: boolean;
  children?: IChildren[];
  validationCheck?: string[];
};

const adminDashboardItem: INavigation[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    validationCheck: ["dashboard.view"],
    icon: <FaUsersCog />,
    current: false,
  },

  {
    name: "Roles Management",
    href: "#",
    icon: <FaCriticalRole />,
    validationCheck: [
      "roles.create",
      "roles.view",
      "groups.create",
      "groups.view",
      "permission.create",
      "permission.view",
    ],

    current: false,
    children: [
      {
        name: "Groups",
        href: "#",
        icon: <MdGroups />,
        current: false,
        validationCheck: ["groups.create", "groups.view"],
        children: [
          {
            name: "Group Create",
            href: "/groups/group-create",
            current: false,
            validationCheck: ["groups.create"],
          },
          {
            name: "Group List",
            href: "/groups/group-list",
            current: false,
            validationCheck: ["groups.view"],
          },
        ],
      },

      {
        name: "Permission",
        href: "#",
        icon: <MdOutlineSecurity />,
        validationCheck: ["permission.create", "permission.view"],

        current: false,
        children: [
          {
            name: "Permission Create",
            href: "/permission/permission-create",
            current: false,
            validationCheck: ["permission.create"],
          },
          {
            name: "Permission List",
            href: "/permission/permission-list",
            current: false,
            validationCheck: ["permission.view"],
          },
        ],
      },
      {
        name: "Roles",
        href: "#",
        icon: <FaCriticalRole />,
        current: false,
        validationCheck: ["roles.create", "roles.view"],

        children: [
          {
            name: "Roles Create",
            href: "/roles/roles-create",
            current: false,
            validationCheck: ["roles.create"],
          },
          {
            name: "Roles List",
            href: "/roles/roles-list",
            current: false,
            validationCheck: ["roles.view"],
          },
        ],
      },
    ],
  },
  {
    name: "Users",
    href: "#",
    icon: <FaUsersCog />,
    current: false,
    validationCheck: ["users.create", "users.view"],

    children: [
      {
        name: "User Create",
        href: "/users/user-create",
        current: false,
        validationCheck: ["users.create"],
      },
      {
        name: "User List",
        href: "/users/user-list",
        current: false,
        validationCheck: ["users.view"],
      },
    ],
  },
    //Youtube SideBar
  {
    name: "Youtube",
    href: "#",
    icon: <FaYoutube />,
    current: false,
    validationCheck: ["youtube.create", "youtube.view"],
    children: [
      {
        name: "Create Play List",
        href: "/youtube-play-list/list-create",
        current: false,
        validationCheck: ["youtube.create"],
      },
      {
        name: "Play List",
        href: "/youtube-play-list/list",
        current: false,
        validationCheck: ["youtube.view"],
      },
    ],
  },
];

export const UserNavigation = (
  permissions: {
    name: string;
  }[]
) => {
  const permissionNames = permissions.map((permission) => permission.name);

  const filterItems: any = (items: INavigation[]) => {
    return items
      .filter(
        (item) =>
          !item.validationCheck ||
          item.validationCheck.some((check) => permissionNames.includes(check))
      )
      .map((item) => {
        if (item.children) {
          return {
            ...item,
            children: filterItems(item.children),
          };
        }
        return item;
      });
  };

  return filterItems(adminDashboardItem);
};
