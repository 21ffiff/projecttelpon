"use server";  /* bekerja disisi server */

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache"; //untuk revalidasi data yang masuk ke database
import { redirect } from "next/navigation";


const ContactSchema = z.object({
    name: z.string().min(6), //minimal huruf untuk nama yang di masukkan
    phone: z.string().min(11) //minimal angka untuk nomor telpon yang dimasukkan
})

/* Action Save Contact */
export const saveContact = async (prevState: any,Datalengkap /* Parameter di isi dengan bebas */: FormData /*sehabis parameter, isi tipe data conoth (FormData) */) => {
    /*const data =Object.fromEntries(Datalengkap.entries());*/
    // console.log(data); /*kalau mau coba, masukkan data dengan consol log */
    /* Setelah itu lakukan validasi denggan menggunakan zod,
    agar data yang masuk adalah data yang valid */
    const validateFields = ContactSchema.safeParse(Object.fromEntries(Datalengkap.entries()));
    
    if(!validateFields.success){
        return{
            Error: validateFields.error.flatten().fieldErrors
        }
    }

    /*setelah itu simpan ke database menggunakan prisma client*/
    try {
        await prisma.contact.create({
            data:{
                name: validateFields.data.name,
                phone: validateFields.data.phone
            }
        })
    } catch (error) {
        return {messege: "Failed to create contact"}
    }
    
    //lakukan revalidasi dan redirect catch
    revalidatePath("/contacts");
    redirect("/contacts")
};


export const updateContact = async (id: string, prevState: any, Datalengkap : FormData ) => {

    const validateFields = ContactSchema.safeParse(Object.fromEntries(Datalengkap.entries()));
    
    if(!validateFields.success){
        return{
            Error: validateFields.error.flatten().fieldErrors
        }
    }

    /*setelah itu update ke database menggunakan prisma client*/
    try {
        await prisma.contact.update({
            data:{
                name: validateFields.data.name,
                phone: validateFields.data.phone
            },
            where:{id}
        })
    } catch (error) {
        return {messege: "Failed to update contact"}
    }
    
    //lakukan revalidasi dan redirect catch
    revalidatePath("/contacts");
    redirect("/contacts")
};


/* Delete Contact */
export const deleteContact = async (id: string ) => {


    /*setelah itu update ke database menggunakan prisma client*/
    try {
        await prisma.contact.delete({
            where:{id}
        })
    } catch (error) {
        return {messege: "Failed to delete contact"}
    }
    
    //lakukan revalidasi
    revalidatePath("/contacts");
};