import { getContactById } from "@/lib/data";
import { notFound } from "next/navigation";

const ContactRecordPage = async({ params }: { params: { id: string } }) => {
    const id = params.id;
    const contact = await getContactById(id);

    if (!contact) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white">
            <h1 className="text-3xl font-bold text-center mb-5">Medical Record</h1>
            <div className="mb-5">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <p><strong>Name:</strong> {contact.name}</p>
                <p><strong>Phone Number:</strong> {contact.phone}</p>
            </div>
            <div className="mb-5">
                <h2 className="text-xl font-semibold">Medical History</h2>
                <p>No medical history available.</p>
            </div>
            <div className="mb-5">
                <h2 className="text-xl font-semibold">Allergies</h2>
                <p>No known allergies.</p>
            </div>
            <div className="mb-5">
                <h2 className="text-xl font-semibold">Medications</h2>
                <p>No current medications.</p>
            </div>
        </div>
    );
};

export default ContactRecordPage;