import CreateForm from "@/components/create-form"

const CreateContactPage = () => { //halaman untuk server-component
    return (
        <div className="max-w-md mx-auto mt-5">
            <h1 className="text-2xl text-center mb-2">Add new contact</h1>
            <CreateForm/>
        </div>
    );
};

export default CreateContactPage;