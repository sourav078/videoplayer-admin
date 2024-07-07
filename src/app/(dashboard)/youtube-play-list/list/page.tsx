
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import React, { useState } from "react";
import { Metadata } from "next";
import YoutubeVideoList from "@/components/Youtube/YoutubeVideoList"


export const metadata: Metadata = {
    title: "Video List",
    description: "Kids App",
};

const VideoList = () => {
    return (
        <main>
            <Breadcrumbs
                title="Video Play List"
                pages={[{ name: "Youtube", href: "/youtube-play-list/list", current: true }]}
            />
            <YoutubeVideoList/>            
        </main>
    );
};

export default VideoList;