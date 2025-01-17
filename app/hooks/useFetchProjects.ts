import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '../api/event';
import { Project } from '../interfaces';

const useFetchProjects = () => {
    return useQuery<Project[], Error>({
        queryKey: ['projects'],
        queryFn: fetchProjects,
    });
};

export default useFetchProjects;