import { LightningElement } from 'lwc';

export default class ModalWrapper extends LightningElement {
    isOpened = false;
    openHandler() {
        console.log('openingg modal');
        this.isOpened=true;
    }

    closeHandler() {
        this.isOpened=false;
    }
}