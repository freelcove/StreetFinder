/**
 * Calculates the distance between two geographical points.
 * 
 * The distance is calculated using the Haversine formula.
 * 
 * @param lat1 Latitude of the first point in decimal degrees.
 * @param lon1 Longitude of the first point in decimal degrees.
 * @param lat2 Latitude of the second point in decimal degrees.
 * @param lon2 Longitude of the second point in decimal degrees.
 * 
 * @returns The distance between the two points in kilometers.
 */
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's mean radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}
