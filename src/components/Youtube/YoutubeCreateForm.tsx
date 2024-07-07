"use client";
import React, { useState, useEffect } from "react";
import { useGetSearchYoutubeQuery } from "@/redux/features/youtube";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import Table from "@/components/Table/Table";
import Image from "next/image";
import axios, { AxiosError } from 'axios';
import config from "@/config";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useAppSelector } from "@/redux/app/hook";
import { videos } from '@/data/home'
import { VideoGridItem } from "@/components/Youtube/Youtube_React";
import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react"
import InputField from "@/components/shared/InputField";
// const loggedInUser = useSelector((state: RootState) => state.auth.user);
interface VideoSnippet {
    title: string;
    description: string;
    thumbnails: {
        default: {
            url: string;
            width: number;
            height: number;
        };
    };
}

interface Video {
    id: {
        videoId: string;
    };
    snippet: VideoSnippet;
}

const YoutubeCreateForm = () => {
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");
    const [selectedVideos, setSelectedVideos] = useState<Video[]>([]);
    const [playlistName, setPlaylistName] = useState("");
    const { data, isLoading, isError, error } :any = useGetSearchYoutubeQuery(query);
    const [saveSuccess, setSaveSuccess] = useState(false);

   // const user = useAppSelector((state) => state.auth.user);
    // Assuming user information is stored under 'user'
   // const userId = user.id; // Assuming 'id' is the field containing the user ID

    // Log the playlist name whenever it changes
    useEffect(() => {
        console.log("Playlist Name:", playlistName);
    }, [playlistName]);

    console.log("data", data);

    const handleSearch = () => {
        console.log("handleSearch called with search term:", search);
        setQuery(search);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            console.log("Enter key pressed");
            handleSearch();
        }
    };

    const handleAdd = (video: Video) => {
        console.log(video)
        if (!selectedVideos.some((selected) => selected?.id?.videoId === video?.id?.videoId)) {
            setSelectedVideos([...selectedVideos, video]);
        }
    };

    const handleDelete = (videoId: string) => {
        setSelectedVideos(selectedVideos.filter((video) => video?.id?.videoId !== videoId));
    };

    const handleSave = async () => {
        try {
            const dataToSend = {
                
                playlistName,
                order: selectedVideos.length,  // Assuming the order here, you might need to adjust this
                playlistType: 'admin', // Adjust this based on your requirements, not dynamic till now
                createdBy: 'a927e45f-7c9e-4c5b-8ed4-5594ca48e1b1', // Set createdBy to the user ID, not dynamic till now
                details: selectedVideos.map((video, index) => ({
                    videoLink: `https://www.youtube.com/watch?v=${video.id.videoId}`,
                    title: video.snippet.title,
                    description: video.snippet.description,
                    thumbnailUrl: video.snippet.thumbnails.default.url,
                    order: index + 1,
                })),
            };
    
            console.log('Data to be sent:', dataToSend); // Log data before sending
    
            const response = await axios.post(`${config.apiBaseUrl}/youtube/save-selected-videos`, dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 200) {
                console.log('Videos saved successfully!');
                setSaveSuccess(true);
            } else {
                console.error('Failed to save videos:', response.statusText);
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // Axios specific error handling
                console.error('Error response:', error.response?.data);
                console.error('Error status:', error.response?.status);
                console.error('Error headers:', error.response?.headers);
            } else if (error instanceof Error) {
                // Generic error handling
                console.error('Error message:', error.message);
            } else {
                // Unexpected error type
                console.error('Unexpected error:', error);
            }
            console.error('Error config:', (error as AxiosError).config);
        }
    };
    

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        const items = Array.from(selectedVideos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setSelectedVideos(items);
    };

    let content;

    if (isLoading) {
        content = <Loading />;
    } else if (data?.data?.length > 0) {
        const columns = [
            {
                title: "Video",
                dataIndex: "thumbnail",
                key: "thumbnail",
                render: (text: any, record: any) => {
                    const { url, width, height } = record.snippet.thumbnails.default;
                    return <Image src={url} alt={record.snippet.title} width={width} height={height} />;
                }
            },
            {
                title: "Video Title",
                dataIndex: "title",
                key: "title",
                render: (text:any, record:any) => record.snippet.title
            },
            {
                title: "Action",
                dataIndex: "action",
                key: "action",
                render: (text:any, record:any) => (
                    selectedVideos.some((video) => video.id.videoId === record.id.videoId) ?
                        <Button variant="secondary" disabled>Selected</Button> :
                        <Button variant="secondary" onClick={() => handleAdd(record)}>Add</Button>
                )
            }
        ];

        content = (
            <Table
                columns={columns}
                dataSource={data.data}
            />
        );
    } else if (query) {
        content = <div>No Data found</div>;
    } else {
        content = null; // No content initially
    }

    const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
    return (
        <>
            <div className="flex flex-wrap md:flex-nowrap">
                {/* <div className="w-full md:w-1/2 p-4 border border-gray-300 rounded mb-4 md:mb-0"> */}
                    {/* <div className="flex items-center mb-4">
                        <input
                            id="search-field"
                            className="w-full p-2 border border-gray-300 rounded mr-2"
                            placeholder="Type..."
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Button onClick={handleSearch} className="bg-gray-500 text-white">
                            Search
                        </Button>
                    </div>
                    
                    {isError && (
                        <div className="error-message text-red-500">
                            {error.message}
                        </div>
                    )} */}

                    {/* <div className="search-results">
                        {content}
                    </div> */}
                </div>

                {/* <div className="w-full md:w-1/2 p-4 border border-gray-300 rounded ml-0 md:ml-4">
                    <div className="mb-4">
                        <label htmlFor="playlist-name" className="block text-sm font-medium text-gray-700">Playlist Name</label>
                        <input
                            type="text"
                            id="playlist-name"
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter playlist name"
                        />
                    </div>

                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="selected-videos">
                            {(provided) => (
                                <table {...provided.droppableProps} ref={provided.innerRef}>
                                    <thead>
                                    <tr>
                                        <th>Drag</th>
                                        <th>Video</th>
                                        <th>Video Title</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {selectedVideos.map((video, index) => (
                                        <Draggable key={video.id.videoId} draggableId={video.id.videoId} index={index}>
                                            {(provided) => (
                                                <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <td><span style={{ cursor: 'grab' }}>⋮⋮</span></td>
                                                    <td><Image src={video.snippet.thumbnails.default.url} alt={video.snippet.title} width={video.snippet.thumbnails.default.width} height={video.snippet.thumbnails.default.height} /></td>
                                                    <td>{video.snippet.title}</td>
                                                    <td><Button variant="destructive" onClick={() => handleDelete(video.id.videoId)}>Delete</Button></td>
                                                </tr>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    </tbody>
                                </table>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <div className="flex justify-end mt-4">
                        <Button onClick={handleSave} className="bg-green-500 text-white">
                            Save
                        </Button>
                    </div>
                </div> */}
            {/* </div> */}
            {/* {saveSuccess && (
            <div className="success-message text-green-500">
                Videos saved successfully!
            </div>
        )} */}
        
          {/* <form className={` gap-4 flex-grow justify-center ${showFullWidthSearch ? "flex" : "hidden md:flex"}`}>
                {showFullWidthSearch && (
                    <Button
                        onClick={() => setShowFullWidthSearch(false)}
                        type="button" size="icon" variant="ghost" className="flex-shrink-0">
                        <ArrowLeft />
                    </Button>
                )}


                <div className="flex flex-grow max-w-[600px]">
                    <input
                        type="search"
                        placeholder="Search"
                        className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
                    />
                    <Button className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0">
                        <search />
                    </Button>
                </div>

            </form> */}

             {/* <div className="max-w-xl w-full"> */}
             <div className="flex items-center mb-6">
          <InputField
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search user..."
            name="search"
            type="text"
          />
        </div>
                 <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'>
                {videos.map(video => (
                  <VideoGridItem key={video.id} {...video} />
                ))}
            </div>
        </>
    );
};

export default YoutubeCreateForm;





