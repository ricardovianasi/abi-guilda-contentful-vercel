import type { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";

export interface TypeAuthorFields {
    name: EntryFieldTypes.Symbol;
    bio?: EntryFieldTypes.Text;
    avatar?: EntryFieldTypes.AssetLink;
}

export type TypeAuthorSkeleton = EntrySkeletonType<TypeAuthorFields, "author">;
export type TypeAuthor = Entry<TypeAuthorSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>;

export function isTypeAuthor(entry: WithContentTypeLink): entry is TypeAuthor {
    return entry?.sys?.contentType?.sys?.id === 'author'
}

export interface TypeBlogPostFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    excerpt?: EntryFieldTypes.Text;
    body?: EntryFieldTypes.RichText;
    featuredImage?: EntryFieldTypes.AssetLink;
    author?: EntryFieldTypes.EntryLink<TypeAuthorSkeleton>;
    tags?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export type TypeBlogPostSkeleton = EntrySkeletonType<TypeBlogPostFields, "blogPost">;
export type TypeBlogPost = Entry<TypeBlogPostSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>;

export function isTypeBlogPost(entry: WithContentTypeLink): entry is TypeBlogPost {
    return entry?.sys?.contentType?.sys?.id === 'blogPost'
}

export type WithContentTypeLink = { sys: { contentType: { sys: { id: string } } } };

