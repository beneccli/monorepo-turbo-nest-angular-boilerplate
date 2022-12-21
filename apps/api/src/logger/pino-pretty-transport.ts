import pinoPretty from 'pino-pretty';

const pinoPrettyTransport = (opts) => {
  return pinoPretty({
    ...opts,
    messageFormat(log, messageKey) {
      if (log.level == 'error') {
        return `[${log.context}] ${log[messageKey]}\n${JSON.stringify(
          log.err,
        )}`;
      }
      if (log.req && log.res && log.responseTime) {
        // eslint-disable-next-line prettier/prettier
        return `${(log.req as any).method} ${(log.res as any).statusCode} ${(log.req as any).url} - ${log[messageKey]}`;
      }
      return `[${log.context}] ${log[messageKey]}`;
    },
  });
};

export default pinoPrettyTransport;
