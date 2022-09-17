export interface pedido {
    _id?:string
    name: string
    email: String
    transactionId: string
    message: string
    isQrDownload: boolean
    images: string[];
    createdAt: string;
    updatedAt: string;

}