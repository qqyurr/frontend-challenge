import { client } from './connectClient';
import { Event, Project } from "../interfaces";
import {
  ListProjectsRequest,
  ListProjectsResponse,
  GetProjectRequest,
  GetProjectResponse,
  ListEventsRequest,
  ListEventsResponse,
} from "@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb";

/**
 * @returns Promise<Project[]>
 */
export async function fetchProjects(): Promise<Project[]> {
  try {
    const request: ListProjectsRequest = {
      $typeName: "event.v1.ListProjectsRequest",
    };
    const response: ListProjectsResponse = await client.listProjects(request);

    return response.projects.map(project => ({
      id: project.id,
      displayName: project.displayName,
      timeZone: project.timeZone || { id: 'Asia/Seoul', version: '2025a', $typeName: 'google.type.TimeZone' },
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

/**
 * @param projectId 
 * @returns Promise<GetProjectResponse>
 */
export async function fetchProject(projectId: string): Promise<GetProjectResponse> {
  try {
    const request: GetProjectRequest = {
      $typeName: "event.v1.GetProjectRequest",
      id: projectId,
    };
    const response = await client.getProject(request);
    return response; // Return the response directly
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
}

/**
 * @param projectId 
 * @param filter 
 * @param pageSize 
 * @param pageToken 
 * @returns Promise<{ events: Event[], nextPageToken: string, totalSize: number }>
 */
export const fetchEvents = async (
  projectId: string,
  filter: string,
  pageSize = 15,
  pageToken = ''
): Promise<{ events: Event[], nextPageToken: string, totalSize: number }> => {
  try {
    const request: ListEventsRequest = {
      $typeName: "event.v1.ListEventsRequest",
      projectId,
      pageSize,
      pageToken,
      filter,
    };

    const response: ListEventsResponse = await client.listEvents(request);

    const events = response.events.map(event => ({
      id: event.id,
      type: event.type,
      createTime: event.createTime ? {
        seconds: event.createTime.seconds || 0,
        nanos: event.createTime.nanos || 0
      } : { seconds: 0, nanos: 0 },
    }));

    return { events, nextPageToken: response.nextPageToken, totalSize: response.totalSize };
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
