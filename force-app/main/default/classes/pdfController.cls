public with sharing class pdfController {
    @AuraEnabled
    public static Attachment generatePDF(Id recordId, String htmlData){
        Pagereference page = Page.renderAsPDF;
        Page.getParameters().put('pdfText', htmlData);

        Contact contact = new Contact(Id = recordId);
        Attachment objAttachment = new Attachment();
        objAttachment.Name='invoice.pdf';
        objAttachment.ParentId= contact.Id;
        objAttachment.Body = page.getContentaspdf();
        objAttachment.isPrivate = false;
        insert objAttachment; 
        return objAttachment;
    }
}