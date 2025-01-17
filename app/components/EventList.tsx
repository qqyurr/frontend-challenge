'use client'

import React from 'react';
import Pagination from './Pagination';
import useFetchEvents from '../hooks/useFetchEvents';
import { useEventStore } from '../store';
import { formatGoogleTimestamp } from './util/convertTimestamp';
import LoadingSpinner from './LoadingSpinner';
import './EventList.css';

const EventList: React.FC = () => {
    const {
        currentPage,
        customDates,
        pageTokens,
        selectedPeriod,
        selectedProject
    } = useEventStore();
    const pageToken = pageTokens[currentPage - 1] || '';
    const { data, isLoading, error } = useFetchEvents(selectedProject, selectedPeriod, customDates, pageToken);

    const indexOfLastEvent = currentPage * 15;
    const indexOfFirstEvent = indexOfLastEvent - 15;

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error fetching events: {error.message}</div>;

    return (
        <div className="table-container">
            <div className="total-events">{`${data?.totalSize || 0} events`}</div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>CreateTime</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.events.map((event, index) => (
                        <tr key={event.id + index}>
                            <td>{event.id}</td>
                            <td>{event.type}</td>
                            <td>{formatGoogleTimestamp(event.createTime, selectedProject.timeZone.id)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='pagination-container'>
                {`${data?.events.length ? indexOfFirstEvent + 1 : 0} - ${Math.min(indexOfLastEvent, data?.totalSize || 0)} / ${data?.totalSize || 0}`}
                <Pagination
                    totalSize={data?.totalSize || 0}
                />
            </div>
        </div>
    );
};

export default EventList;