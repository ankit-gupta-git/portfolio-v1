const cron = require('node-cron');

/**
 * Health Heartbeat Cron Job
 * Schedule: Every 5 minutes ("star/5 * * * *")
 */
const CRON_SCHEDULE = '*/5 * * * *';

const initHealthCron = () => {
    return cron.schedule(CRON_SCHEDULE, async () => {
        const startTime = Date.now();
        const timestamp = new Date().toISOString();

        try {
            const memory = process.memoryUsage();
            const uptime = Math.floor(process.uptime());

            const rssMb = Math.round(memory.rss / 1024 / 1024);
            const heapUsedMb = Math.round(memory.heapUsed / 1024 / 1024);
            const durationMs = Date.now() - startTime;

            console.log(`[cron:health] Heartbeat: ok (uptime=${uptime}s, rss=${rssMb}MB, heap=${heapUsedMb}MB, duration=${durationMs}ms)`);
        } catch (error) {
            console.error(`[cron:health] Heartbeat check failed [${timestamp}]:`, error.message);
        }
    }, {
        scheduled: false
    });
};

module.exports = {
    initHealthCron,
    CRON_SCHEDULE
};
