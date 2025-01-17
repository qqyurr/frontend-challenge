import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../api/event';
import { Project, ApiEventData } from '../interfaces';
import { useEventStore } from '../store';
import { constructFilter } from '../components/util/filterUtils';

const useFetchEvents = (
    selectedProject: Project,
    selectedPeriod: string,
    customDates: any,
    pageToken: string
) => {
    const {
        setPageTokenForCurrentPage,
        currentPage,
    } = useEventStore();

    const filter = useMemo(
        () => constructFilter(selectedPeriod, selectedProject, customDates),
        [selectedPeriod, selectedProject, customDates]
    );

    const { data, error, isLoading } = useQuery<ApiEventData, Error>({
        queryKey: ['events', selectedProject.id, filter, currentPage],
        queryFn: async () => {
            const response = await fetchEvents(selectedProject.id, filter, 15, pageToken);
            return {
                ...response,
                events: response.events.map((event) => ({
                    ...event,
                    createTime: event.createTime || { seconds: 0, nanos: 0 },
                })),
            };
        },
        enabled: !!selectedProject.id && !!filter
    });

    useEffect(() => {
        if (data) {
            setPageTokenForCurrentPage(currentPage, data.nextPageToken);
        }
    }, [data, setPageTokenForCurrentPage, currentPage]);

    return { data, error, isLoading };
};

export default useFetchEvents;
