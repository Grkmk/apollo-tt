import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { BOOK_TRIPS, GET_LAUNCH } from '../queries';
import * as GetCartItemsTypes from '../pages/__generated__/GetCartItems';
import * as BookTripsTypes from './__generated__/BookTrips';
import Button from '../components/button';

interface BookTripsProps extends GetCartItemsTypes.GetCartItems {}

const BookTrips: React.FC<BookTripsProps> = ({ cartItems }) => {
  const [bookTrips, { data }] = useMutation<
    BookTripsTypes.BookTrips,
    BookTripsTypes.BookTripsVariables
  >(BOOK_TRIPS, {
    variables: { launchIds: cartItems },
    refetchQueries: cartItems.map(launchId => ({
      query: GET_LAUNCH,
      variables: { launchId }
    })),
    update(cache) {
      cache.writeData({ data: { cartItems: [] } });
    }
  });

  if (data && data.bookTrips && !data.bookTrips.success) {
    return <p data-testid='message'>{data.bookTrips.message}</p>;
  }

  return (
    <Button onClick={() => bookTrips()} data-testid='book-button'>
      Book All
    </Button>
  );
};

export default BookTrips;
