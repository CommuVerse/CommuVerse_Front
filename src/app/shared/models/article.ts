export interface Article {
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
    scheduledDate?: string;
    creatorId: number;
}
