"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@/components/Table/Table";
import config from "@/config";

const YoutubeVideoList = () => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchSavedVideos = async () => {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/youtube/saved-videos`);
                setVideos(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching saved videos:", error);
                setIsError(true);
                setIsLoading(false);
            }
        };

        fetchSavedVideos();
    }, []);

    // const columns = [
    //     {
    //         title: "Thumbnail",
    //         dataIndex: "thumbnail",
    //         key: "thumbnail",
    //         render: (text, record) => (
    //             <img src={record.thumbnailUrl} alt={record.title} width="120" height="90" />
    //         ),
    //     },
    //     {
    //         title: "Title",
    //         dataIndex: "title",
    //         key: "title",
    //     },
    //     {
    //         title: "Description",
    //         dataIndex: "description",
    //         key: "description",
    //     },
    //     {
    //         title: "Order",
    //         dataIndex: "order",
    //         key: "order",
    //     },
    // ];

    let content;

    // if (isLoading) {
    //     content = <div>Loading...</div>;
    // } else if (isError) {
    //     content = <div>Error loading videos. Please try again later.</div>;
    // } else if (videos.length > 0) {
    //     content = <Table columns={columns} dataSource={videos} />;
    // } else {
    //     content = <div>No videos found.</div>;
    // }

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Saved Videos</h1>
                {content}
            </div>
        </>
    );
};

export default YoutubeVideoList;
