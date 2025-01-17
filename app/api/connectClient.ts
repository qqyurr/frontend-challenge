import { createConnectTransport } from "@connectrpc/connect-web";
import { createClient } from "@connectrpc/connect";
import { EventService } from "@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb";

const apiUrl = "https://frontend-challenge-datetz-backend-725853975024.asia-northeast3.run.app";

const transport = createConnectTransport({
    baseUrl: apiUrl,
});

const client = createClient(EventService, transport);

export { apiUrl, transport, client }; 