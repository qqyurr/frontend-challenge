import { startOfToday, startOfYesterday, startOfWeek, subDays } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { Project } from '../../interfaces';

export const constructFilter = (period: string, selectedProject: Project, customDates?: { startDate: string; endDate: string }) => {
    let startDate: Date;
    let endDate: Date;

    switch (period) {
        case 'Today':
            startDate = startOfToday();
            endDate = new Date();
            break;
        case 'Yesterday':
            startDate = startOfYesterday();
            endDate = startOfToday();
            break;
        case 'This Week':
            startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
            endDate = new Date();
            break;
        case 'Last 30 Days':
            startDate = subDays(new Date(), 29);
            startDate.setHours(0, 0, 0, 0);
            endDate = new Date();
            break;

        case 'Custom':
            if (!customDates?.startDate || !customDates?.endDate) return '';
            startDate = new Date(customDates.startDate);
            endDate = new Date(customDates.endDate);
            endDate.setHours(23, 59, 59, 999);
            break;
        default:
            return '';
    }

    const startDateInTimeZone = toZonedTime(startDate, selectedProject.timeZone.id);
    const endDateInTimeZone = toZonedTime(endDate, selectedProject.timeZone.id);

    const startDateString = startDateInTimeZone.toISOString();
    const endDateString = endDateInTimeZone.toISOString();

    return `create_time >= "${startDateString}" AND create_time < "${endDateString}"`;
}; 