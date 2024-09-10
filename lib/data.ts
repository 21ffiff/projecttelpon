import  { prisma }  from "@/lib/prisma";

export const getContact = async () => { /* untuk data fetching */
    try {
        const contacts = await prisma.contact.findMany();
        return contacts
    } catch (error) {
        throw new Error('Failed to fetch contact data')
    }
}

export const getContactbyId = async (id: string) => { /* untuk data fetching */
    try {
        const contacts = await prisma.contact.findUnique({
            where: { id } /*Cari berdasarkan ID*/
        });
        return contacts;
    } catch (error) {
        throw new Error('Failed to fetch contact data')
    }
}