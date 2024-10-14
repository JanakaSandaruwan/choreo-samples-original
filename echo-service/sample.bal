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
        map<string|string[]> headers = {
            "my-header": "my-header-value",
            "header-2": ["foo", "bar"]
         };
         string resp = check testClient->get("/data", headers);
         io:println(resp)
        return textMsg;
    }
}
