<?php

namespace App\Policies;

class TicketPolicy
{
    public function view($user, $ticket): bool
    {
        return $user->id === $ticket->user_id;
    }

    public function update($user, $ticket): bool
    {
        return $user->id === $ticket->user_id;
    }

    public function delete($user, $ticket): bool
    {
        return $user->id === $ticket->user_id;
    }
}