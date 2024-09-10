import { getContact } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { EditButton, DeleteButton } from "@/components/buttons";

const ContactTable = async () => { //jika sudah mengimport { getContact }, jadikan asycn dan loop data
    const contacts = await getContact();

    return (
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th className="py-3 px-6">#</th>
                    <th className="py-3 px-6">Names</th>
                    <th className="py-3 px-6">Phone Number</th>
                    <th className="py-3 px-6">Create At</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact, index) => (
                    <tr key={contact.id} className="bg-white border-b">
                        <td className="py-3 px-6">{index + 1}</td>
                        <td className="py-3 px-6">{contact.name}</td>
                        <td className="py-3 px-6">{contact.phone}</td>
                        <td className="py-3 px-6">{formatDate(contact.createAt.toString())}</td>
                        <td className="flex justify-center gap-1 py-3">
                            <EditButton id="{contact.id}"/>
                            <DeleteButton/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ContactTable;