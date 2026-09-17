import type {GeoJSONFeature} from "maplibre-gl";
import type {GeoJSON} from "geojson";

//const base_url: String = "https://raum-api.micedric.dpdns.org"
const base_url: String = "http://127.0.0.1:8080/api"
const api = {
    base: `${base_url}`,
    login: `${base_url}/users/login`,
    locations: `${base_url}/locations`,
    metadata: `${base_url}/gis/metadata`,
    gis: `${base_url}/gis`,

} as const;

export async function loginRequest(name: string, password: string): Promise<object> {
    const response = await fetch(api.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            password: password
        })
    })

    if (!(response.ok) ) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(`Err (${response.status}): ` + response.statusText);
    }

    return await response.json();
}

export async function sendGeometry(jwtToken: string, title: string, desc: string, geoType: string, coords: number[] | number[][] | number[][][] | number[][][][]) {
    const response = await fetch(api.locations, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
            title: title,
            description: desc,
            geo_data: {
                type: geoType,
                coordinates: coords,
            }
        })
    })

    if (!(response.ok) ) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(`Err (${response.status}): ` + response.statusText);
    }
}

export async function sendDeleteGeometry(jwtToken: string, id: string) {
    const response = await fetch(api.locations + "/" + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
        }
    })

    if (!(response.ok) ) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(`Err (${response.status}): ` + response.statusText);
    }
}

export async function getMetadata(jwtToken: string): Promise<object> {
    const response = await fetch(api.metadata, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
        },
    })

    if (!(response.ok) ) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(`Err (${response.status}): ` + response.statusText);
    }

    return await response.json();
}

export async function getGeometries(jwtToken: string): Promise<object> {
    const response = await fetch(api.locations, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
        },
    })

    if (!(response.ok) ) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(`Err (${response.status}): ` + response.statusText);
    }

    return await response.json();
}

export async function executeGISFunc(jwtToken: string, name: string, inputs: number[]): Promise<object> {
    const response = await fetch(api.gis, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
            name: name,
            inputs: inputs
        })
    })

    if (!(response.ok) ) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(`Err (${response.status}): ` + response.statusText);
    }

    return await response.json();
}