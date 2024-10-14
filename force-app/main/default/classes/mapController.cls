public with sharing class mapController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [SELECT Id, Name, Description, BillingStreet, BillingCountry, BillingCity, BillingState, BillingPostalCode
        FROM Account ORDER BY Name LIMIT 10];
    }
}