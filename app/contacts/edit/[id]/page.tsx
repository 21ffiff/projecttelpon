import UpdateForm from "@/components/edit-form"
import { getContactbyId } from "@/lib/data";
import { notFound } from "next/navigation";

const UpdateContactPage = async({ params }: { params: { id: string } }) => { //halaman untuk server-component
    const id = params.id;
    const contact = await getContactbyId(id); /* fungsi untuk data fetching */

    //setelah itu lakukan validasi
    if(!contact){ /*jika tidak ada data dalam contact*/
        notFound();
    }

    return (
        <div className="max-w-md mx-auto mt-5">
            <h1 className="text-2xl text-center mb-2">Update contact</h1>
            <UpdateForm contact={contact}/>
        </div>
    );
};

export default UpdateContactPage;