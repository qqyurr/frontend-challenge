'use client'

import React from 'react';
import { Project } from '../interfaces';
import { useEventStore } from '../store';
import './ProjectSelector.css';

enum Periods {
    Today = 'Today',
    Yesterday = 'Yesterday',
    ThisWeek = 'This Week',
    Last30Days = 'Last 30 Days',
    Custom = 'Custom',
}

interface ProjectSelectorProps {
    projects: Project[];
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({
    projects,
}) => {
    const [customDates, setCustomDates] = React.useState<{ startDate: string; endDate: string }>({
        startDate: '',
        endDate: '',
    });

    const {
        setCurrentPage,
        setCustomDates: setGlobalCustomDates,
        selectedProject,
        setSelectedProject,
        selectedPeriod,
        setSelectedPeriod
    } = useEventStore();

    const handleDateChange = (type: 'startDate' | 'endDate', value: string) => {
        setCustomDates(prev => ({
            ...prev,
            [type]: value,
        }));
    };

    const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const targetProject = projects.find(({ id }) => id === event.target.value);
        if (targetProject) {
            setSelectedProject(targetProject);
            setCurrentPage(1);
        }
    };

    const handlePeriodChange = (period: string) => {
        setSelectedPeriod(period);
        setCurrentPage(1);
    };

    const handleConfirmDates = () => {
        setSelectedPeriod(Periods.Custom);
        setCurrentPage(1);
        setGlobalCustomDates(customDates);
    };

    return (
        <div>
            <div className='project-selector-container'>
                <select
                    id="project"
                    value={selectedProject.id}
                    onChange={handleProjectChange}
                    className="project-select"
                >
                    {projects.map(project => (
                        <option key={project.id} value={project.id}>
                            {project.displayName}
                        </option>
                    ))}
                </select>

                <div>
                    <div className="period-container">
                        {Object.values(Periods).map(period => (
                            <button
                                key={period}
                                onClick={() => handlePeriodChange(period)}
                                className={`period-button ${selectedPeriod === period ? 'selected' : ''}`}
                            >
                                {period}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {selectedPeriod === Periods.Custom && (
                <div className='custom-date-picker'>
                    <label htmlFor="startDate">Start Date</label>
                    <input
                        className='custom-date-picker-input'
                        type="date"
                        id="startDate"
                        value={customDates.startDate}
                        onChange={(e) => handleDateChange('startDate', e.target.value)}
                    />
                    <label htmlFor="endDate">End Date</label>
                    <input
                        className='custom-date-picker-input'
                        type="date"
                        id="endDate"
                        value={customDates.endDate}
                        onChange={(e) => handleDateChange('endDate', e.target.value)}
                    />
                    <button className='custom-date-picker-button' onClick={handleConfirmDates}>
                        확인
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProjectSelector;