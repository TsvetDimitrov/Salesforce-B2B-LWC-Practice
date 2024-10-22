import { LightningElement } from 'lwc';

// Car__c Schema
import NAME_FIELD from '@salesforce/schema/Car__c.Name';
import PICTURE_URL_FIELD from '@salesforce/schema/Car__c.Picture_URL__c';
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c';
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c';
import MSRP_FIELD from '@salesforce/schema/Car__c.MSRP__c';
import FUEL_FIELD from '@salesforce/schema/Car__c.Fuel_Type__c';
import SEAT_FIELD from '@salesforce/schema/Car__c.Number_of_Seats__c';
import CONTROL_FIELD from '@salesforce/schema/Car__c.Control__c';


// This function is used to extract field values.
import { getFieldValue } from 'lightning/uiRecordApi';

export default class CarCard extends LightningElement {
    // exposing fields to make them available in the template
    categoryField = CATEGORY_FIELD;
    makeField = MAKE_FIELD;
    msrpField = MSRP_FIELD;
    fuelField = FUEL_FIELD;
    seatsField = SEAT_FIELD;
    controlField = CONTROL_FIELD;

    recordId = 'a00Qy00000O3cxNIAR'

    // car fields displayed with specific format
    carName
    carPictureUrl
    handleRecordLoaded(e) {
        const { records } = e.detail;
        const recordData = records[this.recordId];
        this.carName = getFieldValue(recordData, NAME_FIELD);
        this.carPictureUrl = getFieldValue(recordData, PICTURE_URL_FIELD);
    }
}