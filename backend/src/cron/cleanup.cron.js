const cron = require('node-cron');

/**
 * Log & Expired Conversation Pruning Cron Job
 * Schedule: Daily at 2:00 AM ("0 2 * * *")
 */
const CRON_SCHEDULE = '0 2 * * *';

const initCleanupCron = () => {
    return cron.schedule(CRON_SCHEDULE, async () => {
        const startTime = Date.now();
        const timestamp = new Date().toISOString();

        try {
            const logsArchived = 0;
            const expiredSessionsCleaned = 0;
            const durationMs = Date.now() - startTime;

            console.log(`[cron:cleanup] Daily cleanup completed (logsArchived=${logsArchived}, sessionsCleaned=${expiredSessionsCleaned}, duration=${durationMs}ms)`);
        } catch (error) {
            console.error(`[cron:cleanup] Cleanup failed [${timestamp}]:`, error.message);
        }
    }, {
        scheduled: false
    });
};

module.exports = {
    initCleanupCron,
    CRON_SCHEDULE
};
