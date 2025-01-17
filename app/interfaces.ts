import type { TimeZone as GoogleTimeZone } from "@buf/googleapis_googleapis.bufbuild_es/google/type/datetime_pb.js";

export interface Project {
    id: string;
    displayName: string;
    timeZone: GoogleTimeZone;
}

export interface Event {
    id: string;
    type: string;
    createTime: { seconds: number | BigInt; nanos: number | BigInt };
}

export interface ApiEventData {
    events: Event[];
    nextPageToken: string;
    totalSize: number;
}

export interface CustomDates {
    startDate: string;
    endDate: string;
} 