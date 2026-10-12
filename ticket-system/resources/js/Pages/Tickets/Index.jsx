import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ tickets }) {
    const { flash } = usePage().props;

    const getPriorityBadge = (priority) => {
        switch (priority) {
            case 'Urgent':
                return 'bg-red-100 text-red-800';
            case 'High':
                return 'bg-orange-100 text-orange-800';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'Low':
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Resolved':
                return 'bg-green-100 text-green-800';
            case 'In Progress':
                return 'bg-blue-100 text-blue-800';
            case 'Closed':
                return 'bg-gray-100 text-gray-600';
            case 'Open':
            default:
                return 'bg-indigo-100 text-indigo-800';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Support Tickets</h2>
                    <Link
                        href={route('tickets.create')}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                    >
                        Create Ticket
                    </Link>
                </div>
            }
        >
            <Head title="Tickets" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                {flash.message && (
                    <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                        {flash.message}
                    </div>
                )}

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        {tickets.data.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">No support tickets found. Create your first one!</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {tickets.data.map((ticket) => (
                                            <tr key={ticket.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <Link href={route('tickets.show', ticket.id)} className="text-indigo-600 hover:underline">
                                                        {ticket.title}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getPriorityBadge(ticket.priority)}`}>
                                                        {ticket.priority}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusBadge(ticket.status)}`}>
                                                        {ticket.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link href={route('tickets.show', ticket.id)} className="text-indigo-600 hover:text-indigo-900 mr-3">View</Link>
                                                    <Link href={route('tickets.edit', ticket.id)} className="text-yellow-600 hover:text-yellow-900 mr-3">Edit</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}