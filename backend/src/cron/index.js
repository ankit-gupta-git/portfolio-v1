const { initHealthCron, CRON_SCHEDULE: HEALTH_SCHEDULE } = require('./health.cron');
const { initCacheCron, CRON_SCHEDULE: CACHE_SCHEDULE } = require('./cache.cron');
const { initRetryCron, CRON_SCHEDULE: RETRY_SCHEDULE } = require('./retry.cron');
const { initCleanupCron, CRON_SCHEDULE: CLEANUP_SCHEDULE } = require('./cleanup.cron');
const { initOptimizeCron, CRON_SCHEDULE: OPTIMIZE_SCHEDULE } = require('./optimize.cron');

/**
 * Registry of all registered cron jobs with their schedule and initializer.
 */
const CRON_JOBS = [
    { name: 'health', schedule: HEALTH_SCHEDULE, init: initHealthCron },
    { name: 'cache', schedule: CACHE_SCHEDULE, init: initCacheCron },
    { name: 'retry', schedule: RETRY_SCHEDULE, init: initRetryCron },
    { name: 'cleanup', schedule: CLEANUP_SCHEDULE, init: initCleanupCron },
    { name: 'optimize', schedule: OPTIMIZE_SCHEDULE, init: initOptimizeCron },
];

/**
 * Starts all production cron jobs for the AI Assistant backend.
 * 
 * @returns {Array<object>} Array of active task handles
 */
const startCronJobs = () => {
    const activeJobs = [];

    for (const job of CRON_JOBS) {
        try {
            const task = job.init();
            task.start();
            activeJobs.push({ name: job.name, schedule: job.schedule, task });
        } catch (err) {
            console.error(`[cron] Failed to initialize job "${job.name}":`, err.message);
        }
    }

    console.log(`[cron] Initialized ${activeJobs.length}/${CRON_JOBS.length} scheduled jobs`);
    return activeJobs;
};

module.exports = {
    startCronJobs,
    CRON_JOBS
};
