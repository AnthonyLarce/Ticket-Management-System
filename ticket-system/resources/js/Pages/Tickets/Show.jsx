import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ ticket }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this ticket?')) {
            destroy(route('tickets.destroy', ticket.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Ticket Details #{ticket.id}</h2>
                    <Link
                        href={route('tickets.index')}
                        className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                    >
                        Back to List
                    </Link>
                </div>
            }
        >
            <Head title={`Ticket #${ticket.id}`} />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 max-w-2xl mx-auto">
                    <div className="mb-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Title</span>
                        <h3 className="text-lg font-bold text-gray-900">{ticket.title}</h3>
                    </div>

                    <div className="mb-4 grid grid-cols-3 gap-4">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 block">Category</span>
                            <span className="text-sm font-medium text-gray-800">{ticket.category}</span>
                        </div>
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 block">Priority</span>
                            <span className="text-sm font-medium text-gray-800">{ticket.priority}</span>
                        </div>
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 block">Status</span>
                            <span className="text-sm font-medium text-gray-800">{ticket.status}</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 block">Description</span>
                        <p className="text-gray-700 mt-1 whitespace-pre-wrap">{ticket.description}</p>
                    </div>

                    <div className="flex items-center justify-between border-t pt-4">
                        <Link
                            href={route('tickets.edit', ticket.id)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                        >
                            Edit Ticket
                        </Link>

                        <button
                            onClick={handleDelete}
                            disabled={processing}
                            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50"
                        >
                            Delete Ticket
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}