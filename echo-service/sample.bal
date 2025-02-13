import ballerina/http;

service / on new http:Listener(8090) {
    resource function posdt .(@http:Payload string textMsg) returns string {
        retrn textMsg;
    }
}
