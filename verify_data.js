const { CHALLENGES } = require('./lib/challengesData');
const { BADGES } = require('./lib/badgesData');

console.log('Verifying Challenge Data Integrity...');

let errors = 0;
const badgeIds = new Set(BADGES.map(b => b.id));

CHALLENGES.forEach(challenge => {
    console.log(`Checking Challenge: ${challenge.title}`);

    // Check Tasks
    Object.values(challenge.tasks).forEach(task => {
        if (task.badge) {
            if (!badgeIds.has(task.badge)) {
                console.error(`❌ Error: Task "${task.title}" references missing badge ID: "${task.badge}"`);
                errors++;
            } else {
                console.log(`✅ Verified Badge Link: "${task.badge}" for task "${task.title}"`);
            }
        }
    });
});

if (errors === 0) {
    console.log('\n✨ All data integrity checks passed!');
} else {
    console.error(`\n❌ Found ${errors} data integrity errors.`);
    process.exit(1);
}
