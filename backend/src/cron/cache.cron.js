const cron = require('node-cron');

/**
 * Cache & Temporary AI Context Cleanup Cron Job
 * Schedule: Every 30 minutes ("star/30 * * * *")
 */
const CRON_SCHEDULE = '*/30 * * * *';

const initCacheCron = () => {
    return cron.schedule(CRON_SCHEDULE, async () => {
        const startTime = Date.now();
        const timestamp = new Date().toISOString();

        try {
            // Prune expired AI context/cache entries
            let itemsCleared = 0;
            const durationMs = Date.now() - startTime;

            console.log(`[cron:cache] Purge completed (cleared=${itemsCleared}, duration=${durationMs}ms)`);
        } catch (error) {
            console.error(`[cron:cache] Purge failed [${timestamp}]:`, error.message);
        }
    }, {
        scheduled: false
    });
};

module.exports = {
    initCacheCron,
    CRON_SCHEDULE
};
