(function($, window, ko){

	var sk = window.sk = window.sk || {};
	
	//player view model
	sk.Player = function(rawPlayer){
		var that = this;
		rawPlayer = rawPlayer||{};

		// the name of the player we're keeping score for
		that.name = ko.observable(rawPlayer.name);

		// the score for this player
		that.score = ko.observable(rawPlayer.score);
	};
		// increase the score by the increaseBy amount
	sk.Player.prototype.increaseScore = function(increaseBy){
		if(isNaN(increaseBy)) { return; }
		this.score((this.score() || 0) + increaseBy);
	};

		// decrease the score by the decreaseBy amount
	sk.Player.prototype.decreaseScore = function(decreaseBy){
		if(isNaN(decreaseBy)) { return; }
		this.score((this.score() || 0) - decreaseBy);
	};
	

	//game view model
	sk.Game = function(rawGame){
		var that = this;
		rawGame=rawGame||{};

		// the name of the game!
		that.name = ko.observable(rawGame.name);

		// the players in this game
		that.players = ko.observableArray(rawGame.players || []);
	};

	// adds a player to the game
	sk.Game.prototype.addPlayer = function(newPlayer){
		this.players.push(newPlayer);
	};

	// removes a player from the game
	sk.Game.prototype.removePlayer = function(leavingPlayer){
		this.players.remove(leavingPlayer);
	};

	// ScoreKeeper the state of the application
	sk.ScoreKeeper = function(rawScoreKeeper){
		var that = this;
		rawScoreKeeper = rawScoreKeeper || {};

		that.games = ko.observableArray(rawScoreKeeper.games || []);
		that.selectedGame = ko.observable();

		that.hasSelectedGame = ko.computed(function(){
			return !!that.selectedGame();
		}, that);

		that.newGameName = ko.observable();
	};

	sk.ScoreKeeper.prototype.addGame = function(newGameName){
		var newGame;

		if(typeof(newGameName) !== "string"){ return; }

		newGame = new sk.Game({name:newGameName});
		this.games.push(newGame);
	};

	sk.ScoreKeeper.prototype.addNewGame = function(){
		this.addGame(this.newGameName());
	};

})(jQuery, window, ko);