#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
class CountdownTimer {
    endDate;
    intervalId;
    constructor() {
        this.endDate = new Date();
        this.intervalId = null;
    }
    updateClock() {
        const currentDate = new Date();
        const diff = this.endDate.getTime() - currentDate.getTime(); // Difference in milliseconds
        if (diff <= 0) {
            console.log(chalk.red("Countdown expired!"));
            this.stop(); // Stop the timer when countdown is over
            return;
        }
        const seconds = Math.floor(diff / 1000);
        const days = Math.floor(seconds / (24 * 60 * 60));
        const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((seconds % (60 * 60)) / 60);
        const remainingSeconds = seconds % 60;
        console.log(`Time Remaining: ${chalk.blue(days + 'd')} ${chalk.green(hours + 'h')} ${chalk.yellow(minutes + 'm')} ${chalk.red(remainingSeconds + 's')}`);
    }
    async startCountdown() {
        const endDateResponse = await inquirer.prompt([
            {
                type: 'input',
                name: 'endDate',
                message: 'Enter the end date and time (YYYY-MM-DDTHH:mm:ss):'
            }
        ]);
        const endDateStr = endDateResponse.endDate;
        this.endDate = new Date(endDateStr);
        this.updateClock(); // Display initial countdown
        this.intervalId = setInterval(() => {
            this.updateClock();
        }, 1000); // Update every second
    }
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
// Usage: Create a new CountdownTimer instance and start the countdown based on user input
const countdownTimer = new CountdownTimer();
countdownTimer.startCountdown();
