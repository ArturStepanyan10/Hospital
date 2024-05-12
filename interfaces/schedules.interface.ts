

export interface Schedule {
    id: number;
    doctorId: number;
    startTime: TimeRanges;
    endTime: TimeRanges;
    scheduleDate: Date;
    additionalInfo: string;
}