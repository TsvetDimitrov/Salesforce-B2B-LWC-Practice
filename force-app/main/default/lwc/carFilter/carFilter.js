import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import CAR_OBJECT from '@salesforce/schema/Car__c';

// car Schema
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c';
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c';

const CATEGORY_ERROR = 'Error loading categories!';
const MAKE_TYPE_ERROR = 'Error loading make type!';

import { publish, MessageContext } from 'lightning/messageService'
import CARS_FILTERED_MESSAGE from '@salesforce/messageChannel/CarsFiltered__c';


export default class CarFilter extends LightningElement {
    filters = {
        searchKey: '',
        maxPrice: 999999
    }
    categoryError = CATEGORY_ERROR;
    makeTypeError = MAKE_TYPE_ERROR;
    timer

    @wire(MessageContext)
    messageContext
    /** Fetching category picklist **/
    @wire(getObjectInfo, { objectApiName: CAR_OBJECT })
    carObjectInfo

    @wire(getPicklistValues, {
        recordTypeId: '$carObjectInfo.data.defaultRecordTypeId',
        fieldApiName: CATEGORY_FIELD
    }) categories

    /** Fetching make picklist **/
    @wire(getPicklistValues, {
        recordTypeId: '$carObjectInfo.data.defaultRecordTypeId',
        fieldApiName: MAKE_FIELD
    }) makeType


    handleSearchKeyChange(e) {
        this.filters = { ... this.filters, "searchKey": e.target.value }
        this.sendDataToCarList();
    }

    handleMaxPriceChange(e) {
        this.filters = { ... this.filters, "maxPrice": e.target.value }
        this.sendDataToCarList();

    }

    handleCheckbox(e) {
        if (!this.filters.categories) {
            const categories = this.categories.data.values.map(item => item.value);
            const makeType = this.makeType.data.values.map(item => item.value);

            this.filters = { ...this.filters, categories, makeType };
        }
        const { name, value } = e.target.dataset;
        if (e.target.checked) {
            if (!this.filters[name].includes(value)) {
                this.filters[name] = [...this.filters[name], value];
            }
        } else {
            this.filters[name] = this.filters[name].filter(item => item !== value)
        }
        this.sendDataToCarList();
    }

    sendDataToCarList() {
        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {
            publish(this.messageContext, CARS_FILTERED_MESSAGE, {
                filters: this.filters
            })
        }, 400);
    }
}