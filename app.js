new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {
            var damage = Math.floor(Math.random() * 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster for ' + damage
            })
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack();
        },
        specialAttack: function() {
            var damage = Math.floor(Math.random() * 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster hard for ' + damage
            })
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack()
        },
        heal: function() {
            if (this.playerHealth <= 80) {
                var heal =+ 20;
                this.playerHealth =  (this.playerHealth + heal);
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for ' + 20
            })
                this.monsterAttack()
                if (this.checkWin()) {
                    return;
                } else {
                    this.checkWin();
                }            
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        },
        monsterAttack: function() {
            var damage = Math.floor(Math.random() * 15);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits player for ' + damage
            })
            this.checkWin();
        }
    }
});