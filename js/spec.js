describe("a player", function(){

	window.player;

	beforeEach(function(){
		player = new sk.Player({name:"Larry",score:42});
	});

	it("has a name observable", function(){
		expect(player.name()).toEqual("Larry");
	});

	it("has an observable score", function(){
		expect(player.score()).toEqual(42);
	});

	it("increases the score", function(){
		player.increaseScore(5);

		expect(player.score()).toEqual(47);
	});

	it("increases the score when it starts null", function(){
		player = new sk.Player();
		player.increaseScore(5);

		expect(player.score()).toEqual(5);
	});

	it("leaves the score when trying to increase by NaN", function(){
		player.increaseScore("hello world");

		expect(player.score()).toEqual(42);
	});

	it("decreases the score", function(){
		player.decreaseScore(5);

		expect(player.score()).toEqual(37);
	});

	it("decreases the score when it starts null", function(){
		player = new sk.Player();
		player.decreaseScore(5);

		expect(player.score()).toEqual(-5);
	});

	it("leaves the score alone when trying to decrease by NaN", function(){
		player.decreaseScore("hello world");

		expect(player.score()).toEqual(42);
	});

	it("doesn't increase the score for all players", function(){
		var player1 = new sk.Player({name:"bob", score:39});
		player1.increaseScore(1);

		expect(player.score()).toEqual(42);
		expect(player1.score()).toEqual(40)
	});
});

describe("a game", function(){
	window.game;

	beforeEach(function(){
		window.game = new sk.Game({name: "Euchre"});
	});

	it("has an observable name", function(){
		expect(game.name()).toEqual("Euchre");
	});

	it("has an observable collection of players", function(){
		expect(game.players()).toEqual([]);
	});

	it("can add a player with addPlayer", function(){
		game.addPlayer(new sk.Player({name:"Bobbie Joe", score: 0}));

		expect(game.players().length).toEqual(1);	
	});

	it("can remove a player with removePlayer", function(){
		game.addPlayer(player);
		expect(game.players().length).toEqual(1);

		game.removePlayer(player);
		expect(game.players().length).toEqual(0);
	});
});

describe("the scorekeeper", function(){
	window.scorekeeper;

	beforeEach(function(){
		scorekeeper = new sk.ScoreKeeper();
	});

	it("has a list of games", function(){
		expect(scorekeeper.games()).toEqual([]);
	});

	it("can add a game with addGame", function(){
		scorekeeper.addGame("Euchre");

		expect(scorekeeper.games().length).toEqual(1);
	});

	it("can store a selected game", function(){
		scorekeeper.addGame("Euchre");

		scorekeeper.selectedGame(scorekeeper.games()[0]);

		expect(scorekeeper.selectedGame()).toEqual(scorekeeper.games()[0]);
	});

	it("tells if a game has been selected with hasSelectedGame", function(){
		scorekeeper.addGame("Euchre");

		scorekeeper.selectedGame(scorekeeper.games()[0]);

		expect(scorekeeper.hasSelectedGame()).toEqual(true);
	});

	it("tells if a game has not been selected with hasSelectedGame", function(){
		expect(scorekeeper.hasSelectedGame()).toEqual(false);
	});

	it("takes the name of a new game with newGameName", function(){
		scorekeeper.newGameName("Tiddly Winks");

		expect(scorekeeper.newGameName()).toEqual("Tiddly Winks");
	});

	it("adds a new game using the newGameName observable with addNewGame", function(){
		scorekeeper.newGameName("Tiddly Winks");
		scorekeeper.addNewGame();

		expect(scorekeeper.games().length).toEqual(1);
	});
});