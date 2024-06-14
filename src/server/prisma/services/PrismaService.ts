import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


export type PrismaServiceResponse<T> = {
    status: number,
    data: T
};

export function handleError(err: any): PrismaServiceResponse<null> {
    if (err instanceof PrismaClientKnownRequestError) {
        console.log(err.message)
    } else {
        console.log(err);
    }
    return {status: 400, data: null}
}

const prisma = new PrismaClient();

export default prisma;