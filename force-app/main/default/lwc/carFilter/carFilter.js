import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import CAR_OBJECT from '@salesforce/schema/Car__c';

// car Schema
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c';
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c';

const CATEGORY_ERROR = 'Error loading categories!';
const MAKE_TYPE_ERROR = 'Error loading make type!';


export default class CarFilter extends LightningElement {
    filters = {
        searchKey: '',
        maxPrice: 999999
    }
    categoryError = CATEGORY_ERROR;
    makeTypeError = MAKE_TYPE_ERROR;
    /** Fetching category picklist **/
    @wire(getObjectInfo, { objectApiName: CAR_OBJECT })
    carObjectInfo

    @wire(getPicklistValues, {
        recordTypeId: '$carObjectInfo.data.defaultRecordTypeId',
        fieldApiName: CATEGORY_FIELD
    })categories
    
    /** Fetching make picklist **/
    @wire(getPicklistValues, {
        recordTypeId: '$carObjectInfo.data.defaultRecordTypeId',
        fieldApiName: MAKE_FIELD
    }) makeType


    handleSearchKeyChange(e) {
        this.filters = { ... this.filters, "searchKey": e.target.value }
    }

    handleMaxPricechange(e) {
        this.filters = { ... this.filters, "maxPrice": e.target.value }
    }

    handleCheckbox(e) {
        const { name, value } = e.target.dataset;
    }
}