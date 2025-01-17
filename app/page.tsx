'use client'

import React, { useEffect } from 'react';
import EventList from './components/EventList';
import ProjectSelector from './components/ProjectSelector';
import useFetchProjects from './hooks/useFetchProjects';
import LoadingSpinner from './components/LoadingSpinner';
import { useEventStore } from './store';
import './globals.css';

const Page: React.FC = () => {
    const { setSelectedProject, selectedProject } = useEventStore();
    const { data: projects = [], isLoading, error } = useFetchProjects();

    useEffect(() => {
        if (projects.length > 0) {
            setSelectedProject(projects[0]);
        }
    }, [projects, setSelectedProject]);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error fetching projects: {error.message}</div>;

    return (
        <div>
            <ProjectSelector
                projects={projects}
            />
            {selectedProject && (
                <EventList />
            )}
        </div>
    );
};

export default Page;