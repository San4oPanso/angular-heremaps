module.exports = function(DefaultMarker, DOMMarker) {
    var MARKER_TYPES = {
        DEFAULT: 0,
        DOM: 1,
        SVG: 2
    };

    return {
        addMarkerToMap: addMarkerToMap
    }
    
    function addMarkerToMap(heremaps, places) {
        console.log(heremaps);
        var map = heremaps.map;
        console.log(places)

        if (!places)
            return false;

        if (!(map instanceof H.Map))
            throw new Error('Unsupported map instance');

        console.log(places)
        places.forEach(function(place, i) {
            var creator = _getMarkerCreator(place);
            var marker = place.draggable ? _draggableMarkerMixin(creator.create()) : creator.create();
            
            map.addObject(marker);
        });

    }

    function _getMarkerCreator(place) {
        var ConcreteMarker = angular.noop;
        
        switch(place.type) {
            case MARKER_TYPES.DOM:
                ConcreteMarker = DOMMarker;
                break;
            case MARKER_TYPES.SVG:
                ConcreteMarker = SVGMarker;
                break;
            default: 
                ConcreteMarker = DefaultMarker;
        }
        
        return new ConcreteMarker(place);
    }

    function _draggableMarkerMixin(marker) {
        // Ensure that the marker can receive drag events
        marker.draggable = true;
        
        return marker;
    }

};