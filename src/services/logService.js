import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
    Sentry.init({
        dsn: "https://84159e5247d74fd7b1736f6590307e74@o1007104.ingest.sentry.io/5970462",
        integrations: [new Integrations.BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
}

function withProfiler(interceptor) {
    Sentry.withProfiler(interceptor);
}

function log(error) {
    Sentry.captureException(error);
}

const logger = {
    init,
    withProfiler,
    log,
};

export default logger;
