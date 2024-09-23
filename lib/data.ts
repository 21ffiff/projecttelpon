import  { prisma }  from "@/lib/prisma";
import { resolve } from "path";

const ITEMS_PER_PAGE = 5;

export const getContact = async (query: string, currentPage: number) => { /* untuk data fetching */
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        // await new Promise((resolve) => setTimeout(resolve, 1000)) //Mengatur lamanya skeleton
        const contacts = await prisma.contact.findMany({
            skip: offset,
            take: ITEMS_PER_PAGE,
            where:{
                OR:[
                    {
                        name:{
                            contains: query,
                            mode: "insensitive"
                        } 
                    },
                    {
                        phone:{
                            contains: query,
                            mode: "insensitive"
                        } 
                    }
                ]
            }
    });
        return contacts
    } catch (error) {
        throw new Error('Failed to fetch contact data')
    }
}

export const getContactById = async (id: string) => { /* untuk data fetching */
    try {
        const contact = await prisma.contact.findUnique({
            where: { id } /*Cari berdasarkan ID*/
        });
        return contact;
    } catch (error) {
        throw new Error('Failed to fetch contact data')
    }
}

export const getContactPages = async (query: string) => { /* untuk data fetching */

    try {
        const contacts = await prisma.contact.count({
            where:{
                OR:[
                    {
                        name:{
                            contains: query,
                            mode: "insensitive"
                        } 
                    },
                    {
                        phone:{
                            contains: query,
                            mode: "insensitive"
                        } 
                    }
                ]
            }
    });
    const totalPages = Math.ceil(Number(contacts) / ITEMS_PER_PAGE)
    return totalPages;
    } catch (error) {
        throw new Error('Failed to fetch contact data')
    }
}