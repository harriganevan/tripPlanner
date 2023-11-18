import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { useMap } from 'react-leaflet'
import { useEffect } from 'react';
import L from "leaflet";

function LeafletControlGeocoder({ points, setPoints }) {

    function containsObject(obj, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].lat == obj.lat && list[i].lng == obj.lng) {
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        var parent = document.getElementsByClassName('leaflet-control-geocoder leaflet-bar leaflet-control');
        while (parent[1]) {
            parent[1].parentNode.removeChild(parent[0]);
        }
    }, [points])

    const map = useMap();

    const handleUpdate = async (latlng) => {
        if (!containsObject(latlng, points)) {
            // L.marker(latlng, { icon }).addTo(map)
            try {
                const response = await fetch(`http://localhost:5000/api/getCityName/${latlng.lat}/${latlng.lng}`);
                if(response.ok){
                    const name = await response.json();
                    latlng.name = name;
                    setPoints([...points, latlng]);
                } else {
                    throw new Error(response.status);
                }
            } catch(error) {
                console.error(error);
            }
        }
    }

    var geocoder = L.Control.Geocoder.nominatim();
    if (typeof URLSearchParams !== "undefined" && location.search) {
        // parse /?geocoder=nominatim from URL
        var params = new URLSearchParams(location.search);
        var geocoderString = params.get("geocoder");
        if (geocoderString && L.Control.Geocoder[geocoderString]) {
            geocoder = L.Control.Geocoder[geocoderString]();

        } else if (geocoderString) {
            console.warn("Unsupported geocoder", geocoderString);
        }
    }

    L.Control.geocoder({
        query: "",
        placeholder: "Enter city / address",
        defaultMarkGeocode: false,
        geocoder
    })
        .on("markgeocode", function (e) {
            var latlng = e.geocode.center;
            handleUpdate(latlng);
            map.fitBounds(e.geocode.bbox);
        })
        .addTo(map);

    return null;
}

export default LeafletControlGeocoder;