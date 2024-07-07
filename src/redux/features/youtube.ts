import { api } from "../api/api";
import { tagTypes } from "../app/tag-types";

const youtubeAuth = api.injectEndpoints({
    endpoints: (build) => ({

        //   get all permission
        getSearchYoutube: build.query({
            query: (search:string) => ({
                url:`/youtube/search?q=${search}`,
                method: "GET",
            }),
            providesTags: [tagTypes.youtube],
        })
    }),
});

export const {
    useGetSearchYoutubeQuery

} = youtubeAuth;
