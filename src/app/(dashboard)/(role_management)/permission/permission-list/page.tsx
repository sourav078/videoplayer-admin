"use client";

import dayjs from "dayjs";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Table from "@/components/Table/Table";
import InputField from "@/components/shared/InputField";
import { Button } from "@/components/ui/button";

import { useDebounced } from "@/helpers/useDebounced";
import ConfirmModal from "@/components/ui/Modal";
import {
  useDeletePermissionMutation,
  useGetPermissionsQuery,
  useUpdatePermissionMutation,
} from "@/redux/features/permission";
import { ReactSelect } from "@/components/ui/ReactSelect";
import { useGetGroupsQuery } from "@/redux/features/groups";

const AllPermissions = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [permissionsId, setPermissionsId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editGroup, setEditGroup] = useState({
    name: "",
    group_id: "",
    group_name: "",
  });

  //   search start
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [searchTerm, setSearchTerm] = useState<string>("");
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
  const { data: permissions, isLoading } = useGetPermissionsQuery({
    ...query,
  });

  const meta = permissions?.meta;

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

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    control,
  } = useForm();

  // query and mutation
  const [updatePermission, { isLoading: isUpdateLoading }] =
    useUpdatePermissionMutation();
  const [deletePermission, { isLoading: isDeleteLoading }] =
    useDeletePermissionMutation();
  const { data: groups } = useGetGroupsQuery({
    limit: 1000,
  });

  // filter permissions by name and title
  const filteredPermissionData = permissions?.data?.data?.filter(
    (permissions: any) => {
      const lowercaseSearchText = searchText.toLowerCase();
      return permissions?.name?.toLowerCase().includes(lowercaseSearchText);
    }
  );

  // Delete permissions
  const deleteHandler = async (id: string) => {
    try {
      const res = await deletePermission(id).unwrap();
      if (res?.success) {
        message.success("permissions Deleted successfully");
      }
    } catch (err: any) {
      message.error(err?.data?.message);
    }
  };

  // permissions Edit function
  const onSubmit = async (data: any) => {
    try {
      const res = await updatePermission({
        id: permissionsId,
        ...data,
      }).unwrap();
      if (res?.success) {
        message.success("Group Updated successfully");
        setIsModalOpen(false);
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
      title: "Name",
      dataIndex: "name",
    },
    // available permissions
    {
      title: "Parent Group",
      dataIndex: "group",
      render: function (data: any) {
        return `${data?.name}`;
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
        const selectedPermission = filteredPermissionData.find(
          (group: any) => group.id === data.id
        );
        return (
          <>
            <Button
              className="mr-[6px]"
              onClick={() => {
                setPermissionsId(selectedPermission.id);
                setEditGroup({
                  name: selectedPermission?.name,
                  group_id: selectedPermission?.group_id,
                  group_name: selectedPermission?.group?.name,
                });
                setIsModalOpen(true);
              }}
              type="button"
            >
              <EditOutlined />
            </Button>

            {/* confirm modal */}

            <ConfirmModal
              isLoading={isDeleteLoading}
              title="Delete the Permission?"
              description="Are you sure to delete this Permission?"
              onConfirm={() => deleteHandler(data?.id)}
              customClass="bg-red-500 text-white hover:bg-red-600"
            >
              <DeleteOutlined />
            </ConfirmModal>
          </>
        );
      },
    },
  ];
  return (
    <div>
      <Breadcrumbs
        pages={[
          { name: "Dashboard", href: "/", current: false },
          {
            name: "Permission",
            href: "/permission/permission-list",
            current: true,
          },
        ]}
        title="Permission List"
      />

      <div className="flex items-center justify-between gap-2">
        <div className="max-w-xl w-full">
          <InputField
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            placeholder="Search Permission..."
            name="search"
            type="text"
          />
        </div>

        <div>
          <Link href="/permission/permission-create">
            <Button type="button">Create</Button>
          </Link>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredPermissionData}
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
        title="Edit Permission"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => {
          setIsModalOpen(false);
          setEditGroup({
            name: "",
            group_id: "",
            group_name: "",
          });
          reset();
        }}
        footer={null}
        centered
      >
        <form className="block w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <div className="my-[10px] mx-0">
              <InputField
                name="name"
                label="Permission Name"
                type="text"
                defaultValue={editGroup?.name}
                register={register}
                errors={errors}
              />
            </div>
            <ReactSelect
              control={control}
              name="group_id"
              data={groups?.data?.data?.map((permission: any) => ({
                value: permission.id,
                label: permission.name,
              }))}
              errors={errors}
              label="Select Group"
              placeholder="Select Group"
              defaultValue={{
                value: editGroup?.group_id,
                label: editGroup?.group_name,
              }}
              required
            />
          </div>
          <Button isLoading={isUpdateLoading} className="mt-2" type="submit">
            Update Permission
          </Button>
        </form>
      </Modal>
    </div>
  );
};
export default AllPermissions;
