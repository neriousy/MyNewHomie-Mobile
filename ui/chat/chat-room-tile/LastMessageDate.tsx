import { Text } from 'react-native-paper';
import { convertToDate } from '../../../lib/utilts';

export default function LastMessageDate({
  date,
}: {
  date: [number, number, number, number, number, number, number] | Date;
}) {
  let convertedDate;

  if (Array.isArray(date)) {
    convertedDate = convertToDate(...date);
  } else {
    convertedDate = new Date(date);
  }

  const currentDate = new Date();

  const isToday = convertedDate.toDateString() === currentDate.toDateString();
  let formattedDate;

  if (isToday) {
    // Display hour and minute if the date is from today
    formattedDate = convertedDate.toLocaleTimeString(['pl-PL'], {
      hour: '2-digit',
      minute: '2-digit',
    });
  } else {
    // Display day and month if the date is not from today
    formattedDate = convertedDate.toLocaleDateString(['pl-PL'], {
      day: 'numeric',
      month: 'numeric',
    });
  }

  return <Text variant="bodySmall">{formattedDate}</Text>;
}
