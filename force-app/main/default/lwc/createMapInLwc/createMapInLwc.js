import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/mapController.getAccounts';

export default class CreateMapInLwc extends LightningElement {
    mapMarkers = []
    markersTitle = "Accounts Location"
    @wire(getAccounts)
    wireHandler({data, error}) {
        if (data) {
            console.log(data);
            this.formatResponse(data);
        }
        if(error) {
            console.error(error);
        }
    }

    formatResponse(data) {
        this.mapMarkers = data.map(item => {
            return {
                location: {
                    Street: item.BilligCity || '',
                    City: item.BillingCity  || '',
                    PostalCode: item.BilligPostalCode || '',
                    State: item.BillingState || '',
                    Country: item.BillingCountry || ''
                },
                icon: 'utility:salesforce1',
                value: item.Name,
                title: item.Name,
                description: item.description,

            }
        })
        this.selectedMarker = this.mapMarkers.length && this.mapMarkers[0].value
    }

    callMarkerHandler(e) {
        this.selectedMarker= e.detail.selectedMarkerValue
    }
}