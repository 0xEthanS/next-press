import querystring from 'query-string'
import { config } from "../../../wp.config.mjs"
import { Event, Venue, Organizer } from './types'





function getUrl(
	path: string, 
	query?: Record<string, any>
) {
	const params = query ? querystring.stringify(query) : null
	return `${config.baseUrl}${path}${params ? `?${params}` : ""}`
}




// Helper function to handle API responses
async function fetchAPI<T>(url: string): Promise<T> {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            console.warn(`API call returned ${response.status}: ${response.statusText}`);
            return { events: [] } as T; // Return empty events array for build time
        }
        
        const clonedResponse = response.clone();
        
        try {
            const jsonResponse = await response.json();    
            return jsonResponse;
        } catch (error) {
            return await clonedResponse.json();
        }
    } catch (error) {
        console.warn('API call failed:', error);
        return { events: [] } as T; // Return empty events array for network errors
    }
}





// Event Functions
export async function getAllEventsV0(
    filterParams?: {
        start_date?: string;
        end_date?: string;
        venue?: number;
        organizer?: number;
        category?: string;
    }
): Promise<Event[]> {
    const url = getUrl(
        "/wp-json/tribe/events/v1/events",
        filterParams
    );
    const events = await fetchAPI<{ events: Event[] }>(url);
    return events.events;
}








// https://oldhamkyhistory.com/wp-json/tribe/events/v1/events?page=1&per_page=10&start_date=2024-05-08

export async function getAllEvents(
	{
		per_page, 
		start_date, 
        starts_before 
	}: {
		per_page: number; 
		start_date: string; 
        starts_before: string 
	}
): Promise<Event[]> {
    const url = getUrl(
        `/wp-json/tribe/events/v1/events?page=1&per_page=${per_page}&start_date=${start_date}&starts_before=${starts_before}`,
    );
    const events = await fetchAPI<{ events: Event[] }>(url);
    return events.events;
}













export async function getThreeEvents(
    filterParams?: {
        start_date?: string;
        end_date?: string;
        venue?: number;
        organizer?: number;
        category?: string;
    }
): Promise<Event[]> {
    const url = getUrl(
        "/wp-json/tribe/events/v1/events",
        { ...filterParams, per_page: 3 }
    );
    const events = await fetchAPI<{ events: Event[] }>(url);
    return events.events;
}


export async function getEventById(
    id: number
): Promise<Event> {
    const url = getUrl(
        `/wp-json/tribe/events/v1/events/${id}`
    );
    const event = await fetchAPI<Event>(url);
    return event;
}





export async function getEventBySlug(slug: string): Promise<Event> {
    const url = getUrl(`wp-json/tribe/events/v1/events/by-slug/${slug}`);

    const response = await fetchAPI<Event>(url);
    
    if (!response) {
        throw new Error(`Event with slug '${slug}' not found`);
    }
    
    return response;
}








export async function getEventsByVenue(
    venueId: number
): Promise<Event[]> {
    const url = getUrl(
        "/wp-json/tribe/events/v1/events",
        { venue: venueId }
    );
    const events = await fetchAPI<{ events: Event[] }>(url);
    return events.events;
}


export async function getEventsByOrganizer(
    organizerId: number
): Promise<Event[]> {
    const url = getUrl(
        "/wp-json/tribe/events/v1/events",
        { organizer: organizerId }
    );
    const events = await fetchAPI<{ events: Event[] }>(url);
    return events.events;
}


export async function getEventsByDateRange(
    startDate: string,
    endDate: string
): Promise<Event[]> {
    const url = getUrl(
        "/wp-json/tribe/events/v1/events",
        { 
            start_date: startDate,
            end_date: endDate
        }
    );
    const events = await fetchAPI<{ events: Event[] }>(url);
    return events.events;
}


// Venue Functions
export async function getAllVenues(): Promise<Venue[]> {
    const url = getUrl(
        "/wp-json/tribe/events/v1/venues"
    );
    const venues = await fetchAPI<{ venues: Venue[] }>(url);
    return venues.venues;
}


export async function getVenueById(
    id: number
): Promise<Venue> {
    const url = getUrl(
        `/wp-json/tribe/events/v1/venues/${id}`
    );
    const venue = await fetchAPI<Venue>(url);
    return venue;
}


// Organizer Functions
export async function getAllOrganizers(): Promise<Organizer[]> {
    const url = getUrl(
        "/wp-json/tribe/events/v1/organizers"
    );
    const organizers = await fetchAPI<{ organizers: Organizer[] }>(url);
    return organizers.organizers;
}


export async function getOrganizerById(
    id: number
): Promise<Organizer> {
    const url = getUrl(
        `/wp-json/tribe/events/v1/organizers/${id}`
    );
    const organizer = await fetchAPI<Organizer>(url);
    return organizer;
}