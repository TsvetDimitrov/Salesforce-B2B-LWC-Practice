import { LightningElement, api, wire } from 'lwc';
import getSimilarCars from '@salesforce/apex/CarController.getSimilarCars'
import { getRecord } from 'lightning/uiRecordApi'
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c'
import { CurrentPageReference } from 'lightning/navigation';

import { NavigationMixin } from 'lightning/navigation'
export default class SimilarCars extends NavigationMixin(LightningElement) {
    similarCars
    recordId
    _recordId

    @api objectApiName

    @wire(CurrentPageReference)

    _recordId;

    @api set recordId(value) {
        this._recordId = value;
        // do your thing right here with this.recordId / value
    }

    get recordId() {
        return this._recordId;
    }

    @wire(getRecord, { recordId: '$_recordId.attributes.recordId', fields: [MAKE_FIELD] })
    car

    fetchSimilarCars() {
        console.log(this._recordId.attributes.recordId);
        console.log(this.car);
        getSimilarCars({
            carId: this._recordId.attributes.recordId,
            makeType: this.car.data.fields.Make__c.value
        }).then(result => {
            this.similarCars = result
            console.log(this.similarCars)
        }).catch(error => {
            console.error(error)
        })
    }
    handleViewDetailsClick(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.dataset.id,
                objectApiName: this.objectApiName,
                actionName: 'view'
            }
        })
    }
}