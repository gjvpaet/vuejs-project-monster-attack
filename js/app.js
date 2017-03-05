/**
 * Created by gjvpaet on 3/5/2017.
 */
new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        isGameRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.isGameRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            this.playerAttacks(3, 10);
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        specialAttack: function () {
            this.playerAttacks(10, 20);
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            var message = 'Player heals for ';
            this.turn(false, message, 10);
            this.monsterAttacks();
        },
        giveUp: function () {
            this.isGameRunning = false;
            this.turns = [];
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                this.displayDialog('You won! New Game?');
                return true;
            } else if (this.playerHealth <= 0) {
                this.displayDialog('You lost! New Game?');
                return true;
            }
            return false;
        },
        displayDialog: function (message) {
            if (confirm(message)) {
                this.startGame();
            } else {
                this.isGameRunning = false;
            }
        },
        monsterAttacks: function () {
            var damage = this.calculateDamage(5, 10);
            this.playerHealth -= damage;
            var message = 'Monster hits Player for ';
            this.turn(false, message, damage);
            this.checkWin();
        },
        playerAttacks: function (min, max) {
            var damage = this.calculateDamage(min, max);
            var message = '';
            this.monsterHealth -= damage;
            if (min == 3 && max == 10) {
                message = 'Player hits Monster for ';
                this.turn(true, message, damage);
            } else {
                message = 'Player hits Monster hard for ';
                this.turn(true, message, damage);
            }
        },
        turn: function (isPlayer, message, value) {
            this.turns.unshift({
                isPlayer: isPlayer,
                text: message + value
            })
        }
    }
});