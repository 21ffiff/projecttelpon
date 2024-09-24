import { formatDate } from "@/lib/utils";
import { EditButton, DeleteButton } from "@/components/buttons";
import Link from "next/link";

interface Contact {
    id: string;
    name: string;
    phone: string;
    createAt: Date;
}

const ContactTable = ({ contacts }: { contacts: Contact[] }) => {
    return (
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th className="py-3 px-6">#</th>
                    <th className="py-3 px-6">Name</th>
                    <th className="py-3 px-6">Phone Number</th>
                    <th className="py-3 px-6">Create At</th>
                    <th className="py-3 px-6">Link</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact: Contact, index: number) => (
                    <tr key={contact.id} className="bg-white border-b">
                        <td className="py-3 px-6">{index + 1}</td>
                        <td className="py-3 px-6">{contact.name}</td>
                        <td className="py-3 px-6">{contact.phone}</td>
                        <td className="py-3 px-6">{formatDate(contact.createAt.toString())}</td>
                        <td className="py-3 px-6">
                            <Link href={`/contacts/${contact.id}`}>
                                <h2 className="text-blue-500 hover:underline">View Record</h2>
                            </Link>
                        </td>
                        <td className="flex justify-center gap-1 py-3">
                            <EditButton id={contact.id} />
                            <DeleteButton id={contact.id} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ContactTable;