import {EventDto, EventRow} from '../model/event';

export function mapEventToRow(e: EventDto): EventRow {
  return {
    id: e.id,
    name: e.title,
    date: e.date,
    location: e.location,
    description: e.description,
    participantsCount: e.participantsCount,
    maxCountParticipants: e.maxCountParticipants
  };
}
