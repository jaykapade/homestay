import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import getReservations from "../actions/getReservations";
import ListingsClient from "../components/TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    userId: currentUser?.id,
  });

  if (!reservations.length) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Trips Found"
          subtitle="Looks like you haven't reserved any trips"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ListingsClient
        listings={reservations}
        currentUser={currentUser}
        title="Trips"
        subtitle="Where you've been and where you're going"
        actionLabel="Cancel reservation"
      />
    </ClientOnly>
  );
};

export default TripsPage;
