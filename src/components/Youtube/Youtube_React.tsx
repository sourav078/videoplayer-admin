"use client"
import { useEffect, useRef, useState } from "react"
import { formatDuration } from "@/utils/formatDuration"
import { formatTimeAgo } from "@/utils/formatTimeAgo"
import Image from 'next/image';
import { ArrowLeft, Mic, Search } from "lucide-react"
import { Button } from "@/components/ui/button";


type VideoGridItemProps = {
    id: string
    title: string
    channel: {
        id: string
        name: string
        profileUrl: string
    }
    views: number
    postedAt: Date
    duration: number
    thumbnailUrl: string
    videoUrl: string
}

const VIEW_FORMATTER = Intl.NumberFormat(undefined, { notation: "compact" })

const VideoGridPage = () => {
    const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

    return (
        <div className='flex flex-col p-4'>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Render your VideoGridItems here */}
                {/* Example usage */}
                <VideoGridItem 
                    id="1"
                    title="Sample Video"
                    channel={{ id: "1", name: "Sample Channel", profileUrl: "https://example.com/profile.jpg" }}
                    views={1234}
                    postedAt={new Date()}
                    duration={123}
                    thumbnailUrl="https://example.com/thumbnail.jpg"
                    videoUrl="https://example.com/video.mp4"
                />
                <VideoGridItem 
                    id="2"
                    title="Another Video"
                    channel={{ id: "2", name: "Another Channel", profileUrl: "https://example.com/profile2.jpg" }}
                    views={4567}
                    postedAt={new Date()}
                    duration={456}
                    thumbnailUrl="https://example.com/thumbnail2.jpg"
                    videoUrl="https://example.com/video2.mp4"
                />
            </div>
        </div>
    )
}

export function VideoGridItem({ id, title, channel, views, postedAt, duration, thumbnailUrl, videoUrl }: VideoGridItemProps) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current == null) return

        if (isVideoPlaying) {
            videoRef.current.currentTime = 0
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }, [isVideoPlaying])

    return (
        <div className="flex flex-col gap-2"
            onMouseEnter={() => setIsVideoPlaying(true)}
            onMouseLeave={() => setIsVideoPlaying(false)}
        >
            <a href={`/watch?v=${id}`} className="relative aspect-video block w-full h-full">
                <Image 
                    src={thumbnailUrl} 
                    alt={`Thumbnail for ${title}`} 
                    layout="fill" 
                    objectFit="cover" 
                    className={`transition-[border-radius] duration-200 ${isVideoPlaying ? "rounded-none" : "rounded-xl"}`} 
                />
                <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
                    {formatDuration(duration)}
                </div>
                <video
                    className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"}`}
                    ref={videoRef}
                    muted
                    playsInline
                    src={videoUrl}
                />
            </a>
            <div className="flex gap-2">
                <a href={`/@${channel.id}`} className="flex shrink-0">
                    <Image 
                        className="rounded-full" 
                        src={channel.profileUrl} 
                        alt={`${channel.name} profile picture`} 
                        width={48} 
                        height={48} 
                    />
                </a>
                <div className="flex flex-col">
                    <a href={`/watch?v=${id}`} className="font-bold">
                        {title}
                    </a>
                    <a href={`/@${channel.id}`} className="text-secondary-text text-sm">
                        {channel.name}
                    </a>
                    <div className="text-secondary-text text-sm">
                        {VIEW_FORMATTER.format(views)} Views • {formatTimeAgo(postedAt)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoGridPage
