<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TicketController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $tickets = auth()->user()->tickets()->latest()->paginate(10);
        return Inertia::render('Tickets/Index', ['tickets' => $tickets]);
    }

    public function create()
    {
        return Inertia::render('Tickets/Create');
    }

    public function store(StoreTicketRequest $request)
    {
        auth()->user()->tickets()->create($request->validated());
        return redirect()->route('tickets.index')->with('message', 'Ticket created.');
    }

    public function show(Ticket $ticket)
    {
        $this->authorize('view', $ticket);
        return Inertia::render('Tickets/Show', ['ticket' => $ticket]);
    }

    public function edit(Ticket $ticket)
    {
        $this->authorize('update', $ticket);
        return Inertia::render('Tickets/Edit', ['ticket' => $ticket]);
    }

    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        $this->authorize('update', $ticket);
        $ticket->update($request->validated());
        return redirect()->route('tickets.index')->with('message', 'Ticket updated.');
    }

    public function destroy(Ticket $ticket)
    {
        $this->authorize('delete', $ticket);
        $ticket->delete();
        return redirect()->route('tickets.index')->with('message', 'Ticket deleted.');
    }
}