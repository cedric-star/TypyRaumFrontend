import {getGeometries, getGeometriesById} from "@/scripts/endpoints.ts";
import {useAuthStore} from "@/stores/userAuth.ts";
import {useGeoStore} from "@/stores/geometries.ts";
import {useStateStore} from "@/stores/internalstates.ts";


export async function loadGeoms(getAll = false) {

    const authStore = useAuthStore();
    const geoStore = useGeoStore();
    const stateStore = useStateStore();

    const resultJson = getAll ? await getGeometries(authStore.jwt) : await getGeometriesById(authStore.jwt, authStore.userid);
    if(resultJson && Array.isArray(resultJson)) {
        for (const geometry of geoStore.geometries) {
            const id = "" + geometry.id;
            if (geoStore.map!.getLayer(id)) geoStore.map!.removeLayer(id);
            if (geoStore.map!.getLayer(id + "-fill")) geoStore.map!.removeLayer(id + "-fill");
            if (geoStore.map!.getSource(id)) geoStore.map!.removeSource(id);
        }

        geoStore.geometries.splice(0, geoStore.geometries.length);
        for(const geometry of resultJson) {
            geoStore.geometries.push(geometry);
            console.log(geometry);
        }
        for(const [index, geometry] of geoStore.geometries.entries()) {
            const id = "" + geometry.id;

            geoStore.map!.addSource(id, {
                type: 'geojson',
                data: geometry.geo_data,
            });

            const geoType = geometry.geo_data.type

            if(geoType === "Point" || geoType === "MultiPoint") {
                geoStore.map!.addLayer({
                    id: id,
                    type: 'symbol',
                    source: id,
                    layout: {
                        'icon-image': 'pin',
                        'text-field': geometry.title,
                        'text-font': [ 'Noto Sans Regular' ],
                        'text-offset': [0, 1.25],
                        'text-anchor': 'top',
                        'icon-overlap': 'always'
                    },
                    paint: {
                        'text-color': '#26a269',
                        'text-halo-color': '#ffffff',
                        'text-halo-width': 2,
                        'text-halo-blur': 2,
                    }
                });
            } else if (geoType === "LineString" || geoType === "MultiLineString") {
                geoStore.map!.addLayer({
                    id: id,
                    type: 'line',
                    source: id,
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#2e98d5',
                        'line-width': 5
                    }
                });
            } else if (geoType === "Polygon" || geoType === "MultiPolygon") {

                geoStore.map!.addLayer({
                    id: id,
                    type: 'line',
                    source: id,
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#ec8b2c',
                        'line-width': 5
                    }
                });
                geoStore.map!.addLayer({
                    id: id + "-fill",
                    type: 'fill',
                    source: id,
                    paint: {
                        'fill-color': '#edaa69',
                        'fill-opacity': 0.2
                    }
                });
            }
        }
    } else {
        console.error("Invalid response from server. No geometries detected.");
        return;
    }
}