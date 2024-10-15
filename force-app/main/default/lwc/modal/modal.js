import { LightningElement } from 'lwc';

export default class Modal extends LightningElement {

    closeModal() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }

    handleSlotFooterChange() {
        const footerElement = this.template.querySelector('.slds-modal_footer');
        if(footerElement) {
            footerElement.classList.remove('slds-hide');
        }
    }

    handleSlotHeaderChange() {
        const headerElement = this.template.querySelector('.slds-modal_header');
        if(headerElement) {
            headerElement.classList.remove('remove_header');
        }
    }
}