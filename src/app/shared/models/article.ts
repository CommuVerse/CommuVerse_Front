export interface Article {
images: any;
    id?: number;
    type: string;
    title: string;
    content: string;
    author: string;
    publicationDate?: string;
    status?: boolean;
    numReads?: number;
    numComments?: number;
    numLikes?: number;
    imageUrl?:string;
    scheduledDate?: string;
    creatorId: number;
}
