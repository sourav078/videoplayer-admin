"use client";

import dayjs from "dayjs";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Table from "@/components/Table/Table";
import InputField from "@/components/shared/InputField";
import { Button } from "@/components/ui/button";

import { useDebounced } from "@/helpers/useDebounced";
import ConfirmModal from "@/components/ui/Modal";

import { ReactSelect } from "@/components/ui/ReactSelect";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/redux/features/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetRolesQuery } from "@/redux/features/roles";
import BasicForm from "@/components/user/BasicForm";
import { Tab } from "@headlessui/react";
import UserPermission from "@/components/user/UserPermission";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const AllUsers = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{
    [key: string]: string[];
  }>({});
  const [editUser, setEditUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    mobile_number: "",
    roles: [],
    permissions: [],
  });

  //   search start
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isShowedPassword, setIsShowedPassword] = useState<boolean>(false);
  const query: Record<string, any> = {};

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 400,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data: users, isLoading } = useGetUsersQuery({
    ...query,
  });

  const meta = users?.meta;

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  //   search start end
  const schema = z
    .object({
      first_name: z.string().nonempty("First Name is required"),
      last_name: z.string().optional(),

      email: z.string().email("Invalid email").nonempty("Email is required"),
      password: z.string().optional(),
      confirmPassword: z.string().optional(),
      mobile_number: z.string({
        invalid_type_error: "Mobile number is required",
        message: "Mobile number is required",
        required_error: "Mobile number is required",
      }),
      roles: z.array(
        z.string({
          message: "Role is required",
          invalid_type_error: "Role is required",
          required_error: "Role is required",
        })
      ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  //extract the inferred type from schema
  type ValidationSchemaType = z.infer<typeof schema>;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    control,
    setValue,
    trigger,
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  // query and mutation
  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation();
  const { data: roles } = useGetRolesQuery({
    limit: 1000,
  });

  // filter user by name and title
  const filteredUserData = users?.data?.data?.filter((user: any) => {
    const lowercaseSearchText = searchText.toLowerCase();
    return (
      user?.name?.toLowerCase().includes(lowercaseSearchText) ||
      user?.group?.name?.toLowerCase().includes(lowercaseSearchText) ||
      user?.createdAt?.toLowerCase().includes(lowercaseSearchText) ||
      //role
      user?.roles
        ?.map((role: any) =>
          role?.name?.toLowerCase().includes(lowercaseSearchText)
        )
        .includes(true)
    );
  });

  // Delete permissions
  const deleteHandler = async (id: string) => {
    try {
      const res = await deleteUser(id).unwrap();
      if (res?.success) {
        message.success("users Deleted successfully");
      }
    } catch (err: any) {
      message.error(err?.data?.message);
    }
  };

  // user Edit function
  const onSubmit = async (data: ValidationSchemaType) => {
    const flattenedCheckedItems = Object.values(checkedItems).flat();

    const { confirmPassword, ...rest } = data;

    const updatedData = {
      id: userId,
      ...rest,
      permissions: flattenedCheckedItems,
    };

    try {
      const res = await updateUser(updatedData).unwrap();
      if (res?.success) {
        message.success("User Updated successfully");
        setIsModalOpen(false);
        trigger("roles");
        setCheckedItems({});
      }
    } catch (err: any) {
      message.error(err?.data?.message);
    }
    reset();
  };

  const columns: any[] = [
    {
      title: "No.",
      render: (value: any, item: any, index: number) => index + 1,
    },

    {
      title: "Full Name",
      render: function (data: any) {
        return `${data?.first_name} ${data?.last_name}`;
      },
    },
    // available permissions
    {
      title: "Email",
      dataIndex: "email",
    },
    // mobile_number
    {
      title: "Mobile Number",
      dataIndex: "mobile_number",
    },
    // roles list
    {
      title: "Roles",
      dataIndex: "roles",
      render: function (data: any) {
        return data?.map((role: any) => role?.name).join(", ");
      },
    },
    // permissions list length
    {
      title: "Permissions",
      dataIndex: "permissions",
      render: function (data: any) {
        return `${data?.length} permissions`;
      },
    },

    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
    },
    {
      title: "Action",
      render: function (data: any) {
        const selectedPermission = filteredUserData.find(
          (group: any) => group.id === data.id
        );
        return (
          <>
            <Button
              className="mr-[6px]"
              onClick={() => {
                setUserId(selectedPermission.id);
                setEditUser({
                  email: selectedPermission.email,
                  first_name: selectedPermission.first_name,
                  last_name: selectedPermission.last_name,
                  mobile_number: selectedPermission.mobile_number,
                  roles: selectedPermission.roles,
                  permissions: selectedPermission.permissions,
                });
                setIsModalOpen(true);
              }}
              type="button"
            >
              <EditOutlined />
            </Button>

            {/* confirm modal */}

            {/* if user.role not include super-admin */}

            {data?.roles
              ?.map((role: any) => role?.name)
              .includes("super_admin") ? null : (
              <ConfirmModal
                isLoading={isDeleteLoading}
                title="Delete the User?"
                description="Are you sure to delete this user?"
                onConfirm={() => deleteHandler(data?.id)}
                customClass="bg-red-500 text-white hover:bg-red-600"
              >
                <DeleteOutlined />
              </ConfirmModal>
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (editUser?.roles?.length > 0) {
      const roles = editUser?.roles?.map((role: any) => role.id);
      setValue("roles", roles);
      trigger("roles");
    }
  }, [editUser?.roles, setValue, trigger]);

  useEffect(() => {
    if (editUser?.permissions?.length > 0) {
      setCheckedItems(
        editUser?.permissions?.reduce((acc: any, { group_id, id }: any) => {
          if (acc[group_id]) {
            acc[group_id].push(id);
          } else {
            acc[group_id] = [id];
          }
          return acc;
        }, {})
      );
    }
  }, [editUser?.permissions]);

  return (
    <div>
      <Breadcrumbs
        pages={[
          { name: "Dashboard", href: "/", current: false },
          {
            name: "Users",
            href: "/users/user-list",
            current: true,
          },
        ]}
        title="Users List"
      />

      <div className="flex items-center justify-between gap-2">
        <div className="max-w-xl w-full">
          <InputField
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            placeholder="Search user..."
            name="search"
            type="text"
          />
        </div>

        <div>
          <Link href="/users/user-create">
            <Button type="button">Create</Button>
          </Link>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredUserData}
        loading={isLoading}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      {/* Edit Modal */}
      <Modal
        title="Edit user"
        width={1000}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => {
          setIsModalOpen(false);
          setEditUser({
            email: "",
            first_name: "",
            last_name: "",
            mobile_number: "",
            roles: [],
            permissions: [],
          });
          setCheckedItems({});

          reset();
        }}
        footer={null}
        centered
      >
        <form className="block w-full" onSubmit={handleSubmit(onSubmit)}>
          <Tab.Group>
            <Tab.List className="flex gap-1 rounded-xl bg-white p-1 border w-full">
              {/* basic information and permission */}

              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full max-w-full rounded-lg border py-2.5 text-sm font-medium leading-5",
                    "ring-white/60 ring-offset-2  focus:outline-none focus:ring-2",
                    selected
                      ? "bg-primary text-white shadow"
                      : "text-base-black hover:bg-base-gray hover:text-white"
                  )
                }
              >
                Basic Information
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full max-w-full rounded-lg border py-2.5 text-sm font-medium leading-5",
                    "ring-white/60 ring-offset-2  focus:outline-none focus:ring-2",
                    selected
                      ? "bg-primary text-white shadow"
                      : "text-base-black hover:bg-base-gray hover:text-white"
                  )
                }
              >
                Permissions
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel className={classNames("rounded-xl bg-white p-3")}>
                <BasicForm
                  errors={errors}
                  register={register}
                  roles={roles}
                  control={control}
                  setValue={setValue}
                  isShowedPassword={isShowedPassword}
                  setIsShowedPassword={setIsShowedPassword}
                  reset={reset}
                  trigger={trigger}
                  editUser={editUser}
                />
              </Tab.Panel>

              <Tab.Panel className={classNames("rounded-xl bg-white p-3")}>
                <UserPermission
                  checkedItems={checkedItems}
                  setCheckedItems={setCheckedItems}
                  permissions={editUser?.permissions}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          {/* <BasicForm
            errors={errors}
            register={register}
            roles={roles}
            control={control}
            setValue={setValue}
            isShowedPassword={isShowedPassword}
            setIsShowedPassword={setIsShowedPassword}
            reset={reset}
            trigger={trigger}
            editUser={editUser}
          /> */}
          <Button isLoading={isUpdateLoading} className="mt-2" type="submit">
            Update User
          </Button>
        </form>
      </Modal>
    </div>
  );
};
export default AllUsers;
