import {
  FETCH_CAL
} from "./calendarConstants";
import { createReducer } from "../../app/common/util/reducerUtil";
const eventos = [];

export const fetchEvents = (state, payload) => {
  return payload.calendar;
};

export default createReducer(eventos, {
  [FETCH_CAL]: fetchEvents
});
