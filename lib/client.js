import sanityClient from "@sanity/client";
import  imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId:'leq0y1vg',
    dataset:'production',
    apiVersion:'2022-11-27',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);
export const urlFOr =(source)=> builder.image(source);
