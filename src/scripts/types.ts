import type {
    Feature,
    FeatureCollection,
    Geometry, GeometryCollection,
    LineString,
    MultiLineString, MultiPoint,
    MultiPolygon,
    Point,
    Polygon
} from "geojson";


export interface GeoFunction {
    name: string;
    inputs: number;
    returnsObj: boolean;
    types: string[];
}

export interface GeometryObj {
    id: string;
    title: string;
    description: string;
    geo_data: Point | LineString | Polygon | MultiPolygon | MultiLineString | MultiPoint;
}

export interface SimpleGeoJSON {
    type: string;
    coordinates: [];
}

export interface ReceivedGeom {
    geo_data: Point | LineString | Polygon | MultiPolygon | MultiLineString | MultiPoint | GeometryCollection;
}