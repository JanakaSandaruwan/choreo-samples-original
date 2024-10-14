import ballerina/http;
import ballerina/io;

type RetryConfig record {|
    *http:RetryConfig;
|};

configurable RetryConfig testRetryConfig = ?;

http:Client testClient = check new ("testUrl", {
    retryConfig: {
        ...testRetryConfig
    }
});

service / on new http:Listener(8090) {
    resource function post .(@http:Payload string textMsg) returns string {
        io:println("GET request:" + testClient.toJsonString());
        return textMsg;
    }
}
