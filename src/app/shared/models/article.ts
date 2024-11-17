export interface Article {
    id?: number;
    type: string;
    title: string;
    content: string;
    publicationDate?: string;
    status?: boolean;
    numReads?: number;
    numComments?: number;
    numLikes?: number;
    scheduledDate?: string;
    creatorId: number;
}
