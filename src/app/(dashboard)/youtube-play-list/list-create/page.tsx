import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import React from "react";
import { Metadata } from "next";
import YoutubeCreateForm from "@/components/Youtube/YoutubeCreateForm";
import { videos } from '@/data/home'
import { VideoGridItem } from "@/components/Youtube/Youtube_React";
import SearchBox from "@/components/SearchBox/SearchBox" // Import the SearchBox component

export const metadata: Metadata = {
    title: "Create Play List",
    description: "Kids App",
};

const CreateYoutubeList = () => {
    return (
        <main>
            <Breadcrumbs
                title="Create Play List"
                pages={[{ name: "Youtube", href: "/youtube-play-list/list", current: true }]}
            />
            <YoutubeCreateForm/>
            {/* <SearchBox />  */}

   
            
        </main>
    );
};

export default CreateYoutubeList;
