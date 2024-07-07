"use client";

import dayjs from "dayjs";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Input, Modal, Popconfirm, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Table from "@/components/Table/Table";
import InputField from "@/components/shared/InputField";
import { Button } from "@/components/ui/button";
import {
  useDeleteGroupMutation,
  useGetGroupsQuery,
  useUpdateGroupMutation,
} from "@/redux/features/groups";
import { useDebounced } from "@/helpers/useDebounced";
import ConfirmModal from "@/components/ui/Modal";

const GroupsList = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [groupId, setGroupId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editGroup, setEditGroup] = useState({ name: "" });

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
  const { data: groups, isLoading } = useGetGroupsQuery({
    ...query,
  });

  const meta = groups?.meta;

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
  } = useForm();

  // query and mutation
  const [updateGroup, { isLoading: isUpdateLoading }] =
    useUpdateGroupMutation();
  const [deleteGroup, { isLoading: isDeleteLoading }] =
    useDeleteGroupMutation();

  // filter group by name and title
  const filteredGroupsData = groups?.data?.data?.filter((groups: any) => {
    const lowercaseSearchText = searchText.toLowerCase();
    return groups?.name?.toLowerCase().includes(lowercaseSearchText);
  });

  // Delete group
  const deleteHandler = async (id: string) => {
    try {
      const res = await deleteGroup(id).unwrap();
      if (res?.success) {
        message.success("group Deleted successfully");
      }
    } catch (err: any) {
      message.error(err?.data?.message);
    }
  };

  // Blog Edit function
  const onSubmit = async (data: any) => {
    try {
      const res = await updateGroup({ id: groupId, ...data }).unwrap();
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
      title: "Available Permissions",
      dataIndex: "_count",
      render: function (data: any) {
        return `${data?.permission}`;
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
        const selectedGroup = filteredGroupsData.find(
          (group: any) => group.id === data.id
        );
        return (
          <>
            <Button
              className="mr-[6px]"
              onClick={() => {
                setGroupId(selectedGroup.id);
                setEditGroup({
                  name: selectedGroup?.name,
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
              title="Delete the Group?"
              description="Are you sure to delete this Group?"
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
          { name: "Dashboard", href: "/admin", current: false },
          { name: "Group", href: "/groups/group-list", current: true },
        ]}
        title="Groups List"
      />

      <div className="flex items-center justify-between gap-2">
        <div className="max-w-xl w-full">
          <InputField
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            placeholder="Search group..."
            name="search"
            type="text"
          />
        </div>

        <div>
          <Link href="/groups/group-create">
            <Button type="button">Create</Button>
          </Link>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredGroupsData}
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
        title="Edit Group"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => {
          setIsModalOpen(false);
          setEditGroup({ name: "" });
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
                label="Group Name"
                type="text"
                defaultValue={editGroup?.name}
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <Button isLoading={isUpdateLoading} className="mt-2" type="submit">
            Update Group
          </Button>
        </form>
      </Modal>
    </div>
  );
};
export default GroupsList;
