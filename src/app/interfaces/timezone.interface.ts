import { Observable } from "rxjs";

export interface TimezoneInterface {
    timeZone?: string;
    currentUtcOffset?: UtcOffsetInterface;
    standardUtcOffset?: StandartUtcOffsetinterface;
    dstInterval?: DstIntervalInterface;
    hasDayLightSaving: boolean;
    isDayLightSavingActive?: boolean;
    currentLocalTime?: string;
    liveTime?: Observable<Date>;
}

export interface UtcOffsetInterface {
    milliseconds: number;
    nanoseconds: number;
    seconds: number;
    ticks: number;
}

export interface DstIntervalInterface {
    dstDuration: any;
    dstEnd: string;
    dstName: string;
    dstOffsetToStandardTime: any
    dstOffsetToUtc: any;
    dstStart: string;
}

export interface StandartUtcOffsetinterface {
    milliseconds: number;
    nanoseconds: number
    seconds: number;
    ticks: number;
}