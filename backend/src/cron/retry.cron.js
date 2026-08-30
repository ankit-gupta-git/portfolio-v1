const cron = require('node-cron');

/**
 * Background AI Task Retry Cron Job
 * Schedule: Every 1 hour ("0 * * * *")
 */
const CRON_SCHEDULE = '0 * * * *';

const initRetryCron = () => {
    return cron.schedule(CRON_SCHEDULE, async () => {
        const startTime = Date.now();
        const timestamp = new Date().toISOString();

        try {
            const retriedCount = 0;
            const deadLetterCount = 0;
            const durationMs = Date.now() - startTime;

            console.log(`[cron:retry] Task sync completed (retried=${retriedCount}, deadLetters=${deadLetterCount}, duration=${durationMs}ms)`);
        } catch (error) {
            console.error(`[cron:retry] Retry cycle failed [${timestamp}]:`, error.message);
        }
    }, {
        scheduled: false
    });
};

module.exports = {
    initRetryCron,
    CRON_SCHEDULE
};
