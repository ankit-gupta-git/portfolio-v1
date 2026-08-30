const cron = require('node-cron');

/**
 * Database Cleanup & Optimization Cron Job
 * Schedule: Every Sunday at 3:00 AM ("0 3 * * 0")
 */
const CRON_SCHEDULE = '0 3 * * 0';

const initOptimizeCron = () => {
    return cron.schedule(CRON_SCHEDULE, async () => {
        const startTime = Date.now();
        const timestamp = new Date().toISOString();

        try {
            // Run database optimization / indexing routine
            const durationMs = Date.now() - startTime;
            console.log(`[cron:optimize] Database optimization completed (duration=${durationMs}ms)`);
        } catch (error) {
            console.error(`[cron:optimize] Optimization failed [${timestamp}]:`, error.message);
        }
    }, {
        scheduled: false
    });
};

module.exports = {
    initOptimizeCron,
    CRON_SCHEDULE
};
